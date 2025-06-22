module {{address}}::co2_credit {
    use std::string;
    use std::option;
    use aptos_std::event;

    struct CO2Token has key {
        owner: address,
        kg: u64,
        description: string::String,
        timestamp: u64
    }

    public entry fun mint_token(recipient: address, kg_saved: u64, action_desc: string::String, timestamp: u64) {
        let token = CO2Token {
            owner: recipient,
            kg: kg_saved,
            description: action_desc,
            timestamp
        };
        // For now just store it under the module address (no real logic, just proof of concept)
        move_to(&recipient, token);
    }
}
