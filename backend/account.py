import os
import certifi
import asyncio
from aptos_sdk.account import Account
from aptos_sdk.async_client import FaucetClient, RestClient
from aptos_sdk.transactions import EntryFunction, TransactionPayload, TransactionArgument, RawTransaction
from aptos_sdk.bcs import Serializer
import time

os.environ["SSL_CERT_FILE"] = certifi.where()
NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1"
FAUCET_URL = "https://faucet.devnet.aptoslabs.com"


async def main():
    rest_client = RestClient(NODE_URL)
    faucet_client = FaucetClient(FAUCET_URL, rest_client)
    account = Account.generate()
    await faucet_client.fund_account(account.address(), 100_000_000)
    print(f"Using Aptos account address: {account.address()}")
    alice_balance = await rest_client.account_balance(account.address())
    print(f"Alice's balance: {alice_balance}")

if __name__ == "__main__":
    asyncio.run(main())

