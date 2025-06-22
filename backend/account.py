import requests

BASE_URL = "https://fullnode.testnet.aptoslabs.com/v1"

def get_account_info(address):
    url = f"{BASE_URL}/accounts/{address}"
    resp = requests.get(url)
    if resp.status_code == 404:
        print(f"Address {address} not found on-chain (no activity).")
        return None
    resp.raise_for_status()
    return resp.json()

def get_account_resources(address):
    url = f"{BASE_URL}/accounts/{address}/resources"
    resp = requests.get(url)
    if resp.status_code == 404:
        print(f"No resources found for {address} (might be inactive).")
        return None
    resp.raise_for_status()
    return resp.json()

# Replace with your address
wallet_address = "0x2c0ecb595b32eddf16ea1733154969f212d1f1cd8aa3d2d0fb65ae90d09ffad4"

info = get_account_info(wallet_address)
if info:
    print("✅ Account Info:", info)
    resources = get_account_resources(wallet_address)
    print("✅ Resources:", resources)
else:
    print("Please verify the address or check using the Aptos Explorer.")
