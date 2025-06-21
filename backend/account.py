'''from aptc import Account

# Generate a new account
account = Account.generate()

print("Address:", account.address())
print("Private Key:", account.private_key)
print("Public Key: ", account.public_key)

'''
from aptos_sdk.account import Account
from aptos_sdk.client import FaucetClient, RestClient

rest_client = RestClient("https://fullnode.testnet.aptoslabs.com")
faucet_client = FaucetClient("https://faucet.testnet.aptoslabs.com", rest_client)

account = Account.generate()
faucet_client.fund_account(account.address(), 100_000_000)

print("✅ Account created:", account.address())

