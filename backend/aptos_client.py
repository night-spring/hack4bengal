from aptos_sdk.account import Account
from aptos_sdk.client import FaucetClient, RestClient
from aptos_sdk.transactions import EntryFunction, TransactionPayload
from aptos_sdk.type_tag import TypeTag
from aptos_sdk.bcs import Serializer
import os
from dotenv import load_dotenv

load_dotenv()

NODE_URL = "https://fullnode.mainnet.aptoslabs.com"
rest_client = RestClient(NODE_URL)

account = Account.generate()

def mint_co2_token(farmer_address, kg_saved, action_desc):
    payload = EntryFunction.natural(
        f"{os.getenv('APTOS_ACCOUNT_ADDRESS')}::co2_credit",
        "mint_token",
        [],
        [
            Serializer.struct(account.address()),  # signer
            Serializer.struct(farmer_address),
            Serializer.u64(kg_saved),
            Serializer.str(action_desc),
            Serializer.u64(Serializer.u64_from_int(time.time()))
        ],
    )

    txn_hash = rest_client.submit_transaction(account, payload)
    rest_client.wait_for_transaction(txn_hash)
    print(f"✅ Token minted: {txn_hash}")
