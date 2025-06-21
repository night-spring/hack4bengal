import time
import os
import certifi
import asyncio
from aptos_sdk.account import Account
from aptos_sdk.account_address import AccountAddress
from aptos_sdk.async_client import FaucetClient, RestClient
from aptos_sdk.transactions import EntryFunction, TransactionPayload, TransactionArgument
from aptos_sdk.bcs import Serializer

# Fix SSL_CERT_FILE for httpx
os.environ["SSL_CERT_FILE"] = certifi.where()

# --- CONFIGURATION ---
NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1"
FAUCET_URL = "https://faucet.devnet.aptoslabs.com"

# Create a fresh account
account = Account.generate()
MODULE_ADDRESS = account.address()
PRIVATE_KEY_HEX = account.private_key.hex()

# --- CLIENT SETUP ---
rest_client = RestClient(NODE_URL)
faucet_client = FaucetClient(FAUCET_URL, rest_client)

print(f"✅ Using Aptos account: {account.address()}")

# --- MINT CO₂ TOKEN (no balance check) ---
async def mint_co2_token(farmer_address, kg_saved, action_desc):
    payload = EntryFunction.natural(
        f"{MODULE_ADDRESS}::co2_credit",
        "mint_token",
        [],
        [
            TransactionArgument(AccountAddress.from_str(farmer_address), Serializer.struct),
            TransactionArgument(int(kg_saved), Serializer.u64),
            TransactionArgument(action_desc, Serializer.str),
            TransactionArgument(int(time.time()), Serializer.u64),
        ]
    )
    try:
        txn_payload = TransactionPayload(payload)
        signed_txn = await rest_client.create_bcs_signed_transaction(account, txn_payload)
        txn_hash = await rest_client.submit_bcs_transaction(signed_txn)
        await rest_client.wait_for_transaction(txn_hash)
        print(f"✅ Token minted! Tx hash: {txn_hash}")
        return txn_hash
    except Exception as e:
        print(f"❌ Error minting token: {e}")
        return None

# --- MAIN ---
async def main():
    # Fund only once for devnet
    await faucet_client.fund_account(account.address(), 100_000_000)
    farmer = Account.generate()
    farmer_address= farmer.address()
    print(f"Using farmer address: {farmer_address}")
    await mint_co2_token(
        farmer_address= farmer_address,
        kg_saved=100,
        action_desc="Planted 100 trees"
    )

asyncio.run(main())
