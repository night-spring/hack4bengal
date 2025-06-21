module {{address}}::co2_credit {

    use std::string;
    use std::signer;
    use std::address;
    use std::vector;
    use aptos_framework::coin;
    use aptos_framework::coin::{Coin, CoinInfo, CoinStore, register};
    use aptos_framework::managed_coin;

    /// The struct that defines your custom CO₂ credit coin
    struct CO2Credit has store, drop {}

    const NAME: &str = "CO2 Credit";
    const SYMBOL: &str = "CO2C";
    const DECIMALS: u8 = 0; // whole-number units like kilograms saved

    /// Initialize the CO2Credit coin — must be called once by the module owner
    public entry fun init_module(admin: &signer) {
        managed_coin::initialize<CO2Credit>(
            admin,
            string::utf8(NAME),
            string::utf8(SYMBOL),
            DECIMALS,
            true
        );
        register<CO2Credit>(signer::address_of(admin));
    }

    /// Mint CO2Credits to any recipient with optional metadata (ignored here)
    public entry fun mint_token(
        admin: &signer,
        recipient: address,
        kg_saved: u64,
        _action_desc: string::String,
        _timestamp: u64,
    ) {
        assert!(signer::address_of(admin) == @{{address}}, 1); // Only creator can mint

        if (!coin::is_account_registered<CO2Credit>(&recipient)) {
            coin::register<CO2Credit>(&recipient);
        }

        managed_coin::mint<CO2Credit>(admin, kg_saved, &recipient);
    }
}
