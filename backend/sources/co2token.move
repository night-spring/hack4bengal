module carbon::co2token {
    use std::vector;
    use aptos_std::table;
    use aptos_framework::signer;


    public struct CO2Token has copy, drop, store {
        kg: u64,
        description: vector<u8>,
        timestamp: u64,
    }

    public struct TokenRegistry has key {
        tokens: table::Table<address, vector<CO2Token>>,
    }

    public entry fun init_registry(account: &signer) {
        let addr = signer::address_of(account);
        assert!(!exists<TokenRegistry>(addr), 0);
        move_to(account, TokenRegistry {
            tokens: table::new<address, vector<CO2Token>>(),
        });
    }

    public entry fun mint_token(
        admin: &signer,
        recipient: address,
        kg_saved: u64,
        description: vector<u8>,
        timestamp: u64
    ) acquires TokenRegistry {
        let token = CO2Token { kg: kg_saved, description, timestamp };
        let registry = borrow_global_mut<TokenRegistry>(signer::address_of(admin));

        if (!table::contains(&registry.tokens, recipient)) {
            table::add(&mut registry.tokens, recipient, vector::empty<CO2Token>());
        };

        let tokens = table::borrow_mut(&mut registry.tokens, recipient); 
        vector::push_back(tokens, token);

    }
}
