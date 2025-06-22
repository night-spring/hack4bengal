from aptos_sdk.account import Account
from aptos_sdk.async_client import RestClient
from aptos_sdk.transactions import EntryFunction, TransactionPayload

# 1. Setup Rest Client to connect to Aptos testnet or mainnet
rest_client = RestClient("https://fullnode.testnet.aptoslabs.com/v1")

# 2. Load your account from private key hex string (replace with your key)
private_key_hex = "0xea0c84cd0adcea45b27e1e5c9e038b35931219e6e769aa51c1faf07fc01f06f0"
account = Account.load_key(private_key_hex)

# 3. Define the Move function you want to call
# Assume your module is at address '0xYourAddress' and module name is 'YourModule'
# and function is 'your_function', which takes some arguments (adjust types accordingly)

module_address = "0x2c0ecb595b32eddf16ea1733154969f212d1f1cd8aa3d2d0fb65ae90d09ffad4"
module_name = "YourModule"
function_name = "your_function"

# Example function arguments - adjust as per your function signature
function_args = ["arg1", 123]

# Create an entry function payload
entry_function = EntryFunction.natural(
    module_address=module_address,
    module_name=module_name,
    function_name=function_name,
    type_args=[],  # If your function has type parameters, add here
    args=function_args
)

payload = TransactionPayload(entry_function)

# 4. Submit transaction
txn_hash = rest_client.submit_transaction(account, payload)
rest_client.wait_for_transaction(txn_hash)

print(f"Transaction executed with hash: {txn_hash}")
