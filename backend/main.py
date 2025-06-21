import asyncio
from co2_logic import calculate_co2_saved
from aptos_client import mint_co2_token

async def log_action():
    farmer_id = input("Enter Farmer ID: ")
    waste_type = input("Waste Type (paddy_straw/sugarcane_trash): ")
    kg = float(input("Quantity in kg: "))

    # Dummy for now
    verified, wallet = True, "0x123...FARMER_WALLET"

    if not verified:
        print("❌ Farmer identity not verified.")
        return

    co2_saved = calculate_co2_saved(waste_type, kg)
    action_desc = f"Sold {kg}kg of {waste_type} waste"

    print(f"🌱 {co2_saved}kg CO₂ saved. Minting token...")
    await mint_co2_token(wallet, co2_saved, action_desc)

if __name__ == "__main__":
    asyncio.run(log_action())
