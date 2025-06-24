module carbon::test {
    use carbon::co2token;
    use aptos_framework::signer;

    #[test(admin = @admin, recipient = @recipient)]
    public fun test_mint_token(admin: &signer, recipient: &signer) {
        // Initialize registry under the recipient account
        co2token::init_registry(recipient);

        let kg_saved = 50;
        let desc = b"Test CO2 reward";
        let timestamp = 1721747600;

        // Mint token to recipient
        co2token::mint_token(admin, signer::address_of(recipient), kg_saved, desc, timestamp);
    }
}
