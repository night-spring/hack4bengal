WASTE_CO2_FACTORS = {
    "paddy_straw": 1.5,
    "sugarcane_trash": 1.2,
    "cotton_stalk": 1.3,
}

def calculate_co2_saved(waste_type, weight_kg):
    factor = WASTE_CO2_FACTORS.get(waste_type, 1.0)
    return round(factor * weight_kg, 2)
