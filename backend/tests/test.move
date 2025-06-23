module carbon::test {
    use carbon::co2token;
    use aptos_framework::signer;

    #[test(admin = @admin, recipient = @recipient)]
    public fun test_mint_token(admin: &signer, recipient: &signer) {
        co2token::init_registry(admin);

        let kg_saved = 50;
        let desc = b"Test CO2 reward";
        let timestamp = 1721747600;

        co2token::mint_token(admin, signer::address_of(recipient), kg_saved, desc, timestamp);
    }
}
