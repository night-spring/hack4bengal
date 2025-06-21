from aptc import Account, new_client, entry_function_natural, Serializer
import os
import time
from dotenv import load_dotenv

load_dotenv()

# Create a client with faucet support (for testnet usage only)
client = new_client(faucet=True)
account = Account.generate()

# Optionally fund the account (for testnet)
client.deposit(account.address())

def mint_co2_token(farmer_address: str, kg_saved: int, action_desc: str):
    payload = entry_function_natural(
        f"{account.address()}::co2_credit",
        "mint_token",
        [],
        [
            Serializer.struct(account.address()),
            Serializer.struct(farmer_address),
            Serializer.u64(kg_saved),
            Serializer.str(action_desc),
            Serializer.u64(int(time.time())),
        ],
    )

    txn_hash = client.submit_transaction(account, payload)
    client.wait_for_transaction(txn_hash)
    print(f"✅ Token minted: {txn_hash}")

# Example usage
# Replace with a real testnet address if needed
# mint_co2_token("0x...", 100, "Planted trees")
