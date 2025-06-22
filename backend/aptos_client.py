import asyncio
import os
import time
from dotenv import load_dotenv
from typing import Optional

import aiohttp
from aptos_sdk.account import Account
from aptos_sdk.async_client import RestClient
from aptos_sdk.transactions import EntryFunction, TransactionPayload, TransactionArgument
from aptos_sdk.bcs import Serializer

# Load environment variables
load_dotenv()
os.environ.pop("SSL_CERT_FILE", None)

NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1"
FAUCET_URL = "https://faucet.testnet.aptoslabs.com"
PRIVATE_KEY_HEX = os.getenv("PETRA_PRIVATE_KEY_HEX")
MODULE_ADDRESS = os.getenv("APTOS_ACCOUNT_ADDRESS")

MIN_REQUIRED_BALANCE = 100_000  # 0.001 APT
FUNDING_AMOUNT = 100_000_000  # 1 APT in Octas

async def fund_account_from_faucet(address: str) -> bool:
    """Informs user to manually fund account since faucet now requires JWT."""
    print("❌ Faucet funding from backend is no longer supported.")
    print("🔗 Please fund the account manually using: https://faucet.aptoslabs.com")
    print(f"➡️ Address: 0x{address}")
    return False



async def get_account_balance(address: str) -> Optional[int]:
    """Check account balance."""
    url = f"{NODE_URL}/accounts/{address}/resource/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as resp:
                if resp.status == 404:
                    return None
                data = await resp.json()
                return int(data["data"]["coin"]["value"])
    except Exception as e:
        print(f"❌ Error checking balance: {e}")
        return None




async def wait_for_account_created(address: str, timeout: int = 30) -> bool:
    """Wait until account appears on-chain."""
    start = time.time()
    while time.time() - start < timeout:
        if await get_account_balance(address) is not None:
            return True
        await asyncio.sleep(1)
    return False


async def main():
    if not PRIVATE_KEY_HEX or not MODULE_ADDRESS:
        raise EnvironmentError("❌ Missing PETRA_PRIVATE_KEY_HEX or APTOS_ACCOUNT_ADDRESS in .env")

    rest_client = RestClient(NODE_URL)
    farmer = Account.load_key(PRIVATE_KEY_HEX)
    address = str(farmer.address())
    print(f"👛 Petra wallet address: {address}")

    balance = await get_account_balance(address)

    if balance is None:
        print("🆕 Account not found. Funding from faucet...")
        if not await fund_account_from_faucet(address):
            return
        print("⏳ Waiting for account to appear on-chain...")
        if not await wait_for_account_created(address):
            print("❌ Account not created after 30 seconds.")
            return
        balance = await get_account_balance(address)

    print(f"💰 Current balance: {balance} Octas")
    if balance < MIN_REQUIRED_BALANCE:
        print(f"⚠️ Insufficient balance. Needed: {MIN_REQUIRED_BALANCE}, Found: {balance}")
        return

    # Token mint data
    kg_saved = 100
    description = "biogas from cow dung"
    timestamp = int(time.time())

    entry_function = EntryFunction.natural(
        f"{MODULE_ADDRESS}::co2_credit",
        "mint_token",
        [],
        [
            TransactionArgument(kg_saved, Serializer.u64),
            TransactionArgument(description, Serializer.str),
            TransactionArgument(timestamp, Serializer.u64),
        ]
    )

    try:
        sequence_number = int((await rest_client.account(farmer.address()))["sequence_number"])
        signed_txn = await rest_client.create_bcs_signed_transaction(
            farmer,
            TransactionPayload(entry_function),
            sequence_number=sequence_number,
        )

        tx_hash = await rest_client.submit_bcs_transaction(signed_txn)
        print(f"📤 Transaction submitted: {tx_hash}")
        await rest_client.wait_for_transaction(tx_hash)
        txn = await rest_client.transaction_by_hash(tx_hash)

        if txn["success"]:
            print("✅ Transaction successful!")
        else:
            print(f"❌ Transaction failed:\nVM Status: {txn['vm_status']}\nFull txn: {txn}")
    except Exception as e:
        print(f"❌ Error during transaction: {e}")


if __name__ == "__main__":
    asyncio.run(main())
