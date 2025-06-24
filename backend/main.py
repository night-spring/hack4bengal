import os
import time
import asyncio
import json
from dotenv import load_dotenv
from aptos_sdk.account import Account
from aptos_sdk.account_address import AccountAddress
from aptos_sdk.transactions import EntryFunction, TransactionPayload, TransactionArgument
from aptos_sdk.async_client import RestClient, FaucetClient
from aptos_sdk.bcs import Serializer
from aptos_sdk.type_tag import StructTag, TypeTag

# === ENV SETUP ===
os.environ.pop("SSL_CERT_FILE", None)
load_dotenv()
NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1"
FAUCET_URL = "https://faucet.testnet.aptoslabs.com"

rest_client = RestClient(NODE_URL)
faucet_client = FaucetClient(FAUCET_URL, rest_client)

# === LOAD KEYS ===
PETRA_PRIVATE_KEY = os.getenv("PETRA_PRIVATE_KEY")
FARMER_PRIVATE_KEY = os.getenv("FARMER_PRIVATE_KEY")

admin = Account.load_key(PETRA_PRIVATE_KEY)
farmer = Account.load_key(FARMER_PRIVATE_KEY)

print(f"Admin address: {admin.address()}")
print(f"Farmer address: {farmer.address()}")

address_serializer = getattr(Serializer, 'account_address', Serializer.struct)
vector_u8_serializer = Serializer.sequence_serializer(Serializer.u8)

# === MINT TOKEN FUNCTION ===
async def reward(kg_saved: int, description: str, timestamp: int):
    print("[Reward] Minting token...")
    payload = EntryFunction.natural(
        f"{admin.address()}::co2token",
        "mint_token",
        [],
        [
            TransactionArgument(farmer.address(), address_serializer),
            TransactionArgument(kg_saved, Serializer.u64),
            TransactionArgument(description.encode(), vector_u8_serializer),
            TransactionArgument(timestamp, Serializer.u64),
        ],
    )
    signed_txn = await rest_client.create_bcs_signed_transaction(
        admin, TransactionPayload(payload)
    )
    txn_hash = await rest_client.submit_bcs_transaction(signed_txn)
    print(f"[Reward] Transaction hash: {txn_hash}")
    await rest_client.wait_for_transaction(txn_hash)
    print("[Reward] Token minted.")

# === VIEW TOKENS FOR FARMER ===
async def view_tokens():
    try:
        resource = await rest_client.account_resource(
            farmer.address(),
            f"{admin.address()}::co2token::TokenRegistry"
        )
        print("\n[Farmer Tokens]")
        tokens = resource["data"]["tokens"]
        print(json.dumps(tokens, indent=2))
    except Exception as e:
        print(f"[View Tokens] Error: {e}")

# === MAIN ===
async def main():
    print(f"Admin balance: {await rest_client.account_balance(admin.address())}")
    print(f"Farmer balance: {await rest_client.account_balance(farmer.address())}")
    print(f"Farmer balance before funding: {await rest_client.account_balance(farmer.address())}")

    await reward(
        kg_saved=100,
        description="Biogas from cow dung",
        timestamp=int(time.time())
    )

    print(f"Farmer balance (post-reward): {await rest_client.account_balance(farmer.address())}")
    await view_tokens()

if __name__ == "__main__":
    asyncio.run(main())
