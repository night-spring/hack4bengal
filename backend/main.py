import requests
from co2_logic import calculate_co2_saved
from aptos_client import mint_co2_token

'''
def verify_farmer_identity(farmer_id):
    res = requests.get(f"https://api.coreconnect.global/farmers/{farmer_id}")
    if res.status_code == 200:
        data = res.json()
        return data['verified'], data['wallet']
    return False, None
'''

def log_action():
    farmer_id = input("Enter Farmer ID: ")
    waste_type = input("Waste Type (paddy_straw/sugarcane_trash): ")
    kg = float(input("Quantity in kg: "))

    #verified, wallet = verify_farmer_identity(farmer_id)
    verified, wallet = True, xyxy
    if not verified:
        print("Farmer identity not verified.")
        return

    co2_saved = calculate_co2_saved(waste_type, kg)
    action_desc = f"Sold {kg}kg of {waste_type} waste"

    print(f"🌱 {co2_saved}kg CO₂ saved. Minting token...")
    mint_co2_token(wallet, co2_saved, action_desc)

if __name__ == "__main__":
    log_action()
