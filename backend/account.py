from aptos_sdk.account_address import AccountAddress
from aptos_sdk.account import Account
from aptos_sdk.async_client import RestClient, FaucetClient
from aptos_sdk.transactions import EntryFunction, TransactionPayload, TransactionArgument
from aptos_sdk.bcs import Serializer
from aptos_sdk.type_tag import StructTag, TypeTag
from aptos_sdk import ed25519 
from dotenv import load_dotenv
import time
import os
import asyncio
import json

os.environ.pop("SSL_CERT_FILE", None)
load_dotenv()
NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1"
FAUCET_URL = "https://faucet.devnet.aptoslabs.com"

rest_client = RestClient(NODE_URL)
faucet_client = FaucetClient(FAUCET_URL, rest_client)

PETRA_PRIVATE_KEY = os.getenv("PETRA_PRIVATE_KEY")
print(PETRA_PRIVATE_KEY)

admin = Account.load_key(PETRA_PRIVATE_KEY)
print(f"Admin address: {admin.address()}")

farmer_private_key = os.getenv("FARMER_PRIVATE_KEY")
farmer = Account.load_key(farmer_private_key)
print(f"Farmer address: {farmer.address()}")

address_serializer = getattr(Serializer, 'account_address', Serializer.struct)
vector_u8_serializer = Serializer.sequence_serializer(Serializer.u8)

async def reward(kg_saved, description, timestamp):
    payload = EntryFunction.natural(
        f"{admin.address()}::co2token",
        "mint_token",
        [
        TypeTag(
            StructTag(
                address=PETRA_PRIVATE_KEY,
                module="co2token",
                name="CO2Token",
                type_args=[]
                )
            )
        ],
        [
            TransactionArgument(farmer.address(), address_serializer),
            TransactionArgument(kg_saved, Serializer.u64),
            TransactionArgument(description.encode(), vector_u8_serializer),  
            TransactionArgument(timestamp, Serializer.u64),
        ]
    )

    signed_txn = await rest_client.create_bcs_signed_transaction(admin, TransactionPayload(payload))
    txn_hash = await rest_client.submit_bcs_transaction(signed_txn)
    txn_result = await rest_client.wait_for_transaction(txn_hash)
    print(txn_result["vm_status"])


async def main():
    admin_balance = await rest_client.account_balance(admin.address())
    print(f"Admin balance: {admin_balance}")

    farmer_balance = await rest_client.account_balance(farmer.address())
    print(f"Farmer balance: {farmer_balance}")

    await reward(100, "biogas from cow dung", int(time.time()))
    farmer_balance = await rest_client.account_balance(farmer.address())
    print(f"Farmer balance: {farmer_balance}")
    

if __name__ == "__main__":
    asyncio.run(main())


