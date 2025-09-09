use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    program_error::ProgramError,
    entrypoint::ProgramResult,
};

declare_id!("TransferHook1111111111111111111111111111");

#[program]
pub mod anti_sniper_hook {
    use super::*;

    /// Initialize anti-sniper protection for a token
    pub fn initialize_anti_sniper(
        ctx: Context<InitializeAntiSniper>,
        launch_timestamp: i64,
        protection_duration: i64, // 30 seconds = 30
    ) -> Result<()> {
        let anti_sniper = &mut ctx.accounts.anti_sniper;
        
        anti_sniper.token_mint = ctx.accounts.token_mint.key();
        anti_sniper.launch_timestamp = launch_timestamp;
        anti_sniper.protection_duration = protection_duration;
        anti_sniper.is_active = true;
        anti_sniper.bump = ctx.bumps.anti_sniper;
        
        msg!("Anti-sniper protection initialized for token: {}", ctx.accounts.token_mint.key());
        msg!("Protection active until: {}", launch_timestamp + protection_duration);
        
        Ok(())
    }

    /// Transfer hook that enforces anti-sniper rules
    pub fn transfer_hook(
        ctx: Context<TransferHook>,
        amount: u64,
    ) -> Result<()> {
        let anti_sniper = &ctx.accounts.anti_sniper;
        let current_timestamp = Clock::get()?.unix_timestamp;
        
        // Check if protection period is still active
        let protection_end = anti_sniper.launch_timestamp + anti_sniper.protection_duration;
        
        if current_timestamp < protection_end && anti_sniper.is_active {
            // During protection period, block transfers to/from AMM pools
            let destination = &ctx.accounts.destination_account;
            
            // Check if destination is a known AMM program
            if is_amm_account(&destination.owner) {
                msg!("Anti-sniper: Blocking transfer to AMM during protection period");
                msg!("Current time: {}, Protection ends: {}", current_timestamp, protection_end);
                return Err(ErrorCode::TransferBlockedByAntiSniper.into());
            }
            
            // Check if source is a known AMM program  
            let source = &ctx.accounts.source_account;
            if is_amm_account(&source.owner) {
                msg!("Anti-sniper: Blocking transfer from AMM during protection period");
                return Err(ErrorCode::TransferBlockedByAntiSniper.into());
            }
            
            msg!("Anti-sniper: Regular transfer allowed during protection period");
        } else {
            msg!("Anti-sniper: Protection period ended, all transfers allowed");
        }
        
        Ok(())
    }

    /// Disable anti-sniper protection (emergency)
    pub fn disable_protection(
        ctx: Context<DisableProtection>,
    ) -> Result<()> {
        let anti_sniper = &mut ctx.accounts.anti_sniper;
        
        anti_sniper.is_active = false;
        
        msg!("Anti-sniper protection disabled for token: {}", anti_sniper.token_mint);
        
        Ok(())
    }
}

/// Check if an account belongs to a known AMM program
fn is_amm_account(owner: &Pubkey) -> bool {
    // Known AMM program IDs
    let raydium_amm = Pubkey::try_from("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8").unwrap();
    let orca_whirlpool = Pubkey::try_from("whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc").unwrap();
    let orca_legacy = Pubkey::try_from("9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP").unwrap();
    
    *owner == raydium_amm || *owner == orca_whirlpool || *owner == orca_legacy
}

#[derive(Accounts)]
pub struct InitializeAntiSniper<'info> {
    #[account(
        init,
        payer = payer,
        space = AntiSniperAccount::LEN,
        seeds = [b"anti_sniper", token_mint.key().as_ref()],
        bump
    )]
    pub anti_sniper: Account<'info, AntiSniperAccount>,
    
    pub token_mint: AccountInfo<'info>,
    
    #[account(mut)]
    pub payer: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct TransferHook<'info> {
    #[account(
        seeds = [b"anti_sniper", anti_sniper.token_mint.as_ref()],
        bump = anti_sniper.bump
    )]
    pub anti_sniper: Account<'info, AntiSniperAccount>,
    
    /// Source token account
    pub source_account: AccountInfo<'info>,
    
    /// Destination token account  
    pub destination_account: AccountInfo<'info>,
    
    /// Token program
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DisableProtection<'info> {
    #[account(
        mut,
        seeds = [b"anti_sniper", anti_sniper.token_mint.as_ref()],
        bump = anti_sniper.bump
    )]
    pub anti_sniper: Account<'info, AntiSniperAccount>,
    
    pub authority: Signer<'info>,
}

#[account]
pub struct AntiSniperAccount {
    pub token_mint: Pubkey,
    pub launch_timestamp: i64,
    pub protection_duration: i64,
    pub is_active: bool,
    pub bump: u8,
}

impl AntiSniperAccount {
    pub const LEN: usize = 32 + 8 + 8 + 1 + 1 + 8; // discriminator + data
}

#[error_code]
pub enum ErrorCode {
    #[msg("Transfer blocked by anti-sniper protection")]
    TransferBlockedByAntiSniper,
    
    #[msg("Anti-sniper protection not active")]
    ProtectionNotActive,
}