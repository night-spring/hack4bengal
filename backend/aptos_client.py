import time
import os
from dotenv import load_dotenv
import httpx
from aptos_sdk.account import Account
from aptos_sdk.async_client import FaucetClient, RestClient
from aptos_sdk.transactions import EntryFunction, TransactionPayload, TransactionArgument
from aptos_sdk.bcs import Serializer

load_dotenv()

NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1"  # use devnet for now
FAUCET_URL = "https://faucet.devnet.aptoslabs.com"
rest_client = RestClient(NODE_URL)
faucet_client = FaucetClient(FAUCET_URL, rest_client)
# Load your Aptos private key from .env
'''PRIVATE_KEY_HEX = os.getenv("APTOS_PRIVATE_KEY")
if not PRIVATE_KEY_HEX:
    raise Exception("❌ Missing APTOS_PRIVATE_KEY in .env")'''

#account = Account.load_key(PRIVATE_KEY_HEX)
account = Account.generate()

async def mint_co2_token(farmer_address, kg_saved, action_desc):
    module_address = account.address()
    if not module_address:
        raise Exception("❌ Missing APTOS_ACCOUNT_ADDRESS in .env")

    payload = EntryFunction.natural(
        f"{module_address}::co2_credit",  # e.g., 0xYourAccount::co2_credit
        "mint_token",
        [],
        [
            TransactionArgument(account.address(), Serializer.address),  # signer
            TransactionArgument(farmer_address, Serializer.address),
            TransactionArgument(int(kg_saved), Serializer.u64),
            TransactionArgument(action_desc, Serializer.str),
            TransactionArgument(int(time.time()), Serializer.u64),
        ],
    )

    txn_hash = await rest_client.submit_transaction(account, payload)
    await rest_client.wait_for_transaction(txn_hash)
    print(f"✅ Token minted. Tx hash: {txn_hash}")
