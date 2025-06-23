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

# Load .env variables
load_dotenv()
os.environ.pop("SSL_CERT_FILE", None)

NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1"
PRIVATE_KEY_HEX = os.getenv("PETRA_PRIVATE_KEY_HEX")
MODULE_ADDRESS = os.getenv("APTOS_ACCOUNT_ADDRESS")

MIN_REQUIRED_BALANCE = 100_000  # 0.001 APT in Octas

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
    except Exception:
        return None

async def wait_for_funding(address: str, min_balance: int, timeout: int = 60):
    """Wait for the account to have minimum balance."""
    print(f"🔄 Waiting for funding. Required balance: {min_balance} Octas")
    start = time.time()
    while time.time() - start < timeout:
        balance = await get_account_balance(address)
        if balance is not None and balance >= min_balance:
            return True
        await asyncio.sleep(2)
    return False

async def main():
    if not PRIVATE_KEY_HEX or not MODULE_ADDRESS:
        raise EnvironmentError("Missing PETRA_PRIVATE_KEY_HEX or APTOS_ACCOUNT_ADDRESS in .env")

    rest_client = RestClient(NODE_URL)
    sender = Account.load_key(PRIVATE_KEY_HEX)
    sender_address = str(sender.address())

    balance = await get_account_balance(sender_address)
    if balance is None or balance < MIN_REQUIRED_BALANCE:
        print("🪙 Account not found or balance too low.")
        print("👉 Please fund the account manually using the testnet faucet:")
        print(f"🔗 https://faucet.aptoslabs.com")
        print(f"📬 Wallet Address: {sender_address}")
        if not await wait_for_funding(sender_address, MIN_REQUIRED_BALANCE):
            print("❌ Funding not detected. Exiting.")
            return

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

    sequence_number = int((await rest_client.account(sender.address()))["sequence_number"])
    txn = await rest_client.create_bcs_signed_transaction(
        sender,
        TransactionPayload(entry_function),
        sequence_number=sequence_number,
    )

    tx_hash = await rest_client.submit_bcs_transaction(txn)
    await rest_client.wait_for_transaction(tx_hash)

if __name__ == "__main__":
    asyncio.run(main())
