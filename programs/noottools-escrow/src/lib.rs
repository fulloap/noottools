use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Mint};

declare_id!("EscrowProgram1111111111111111111111111111");

#[program]
pub mod noottools_escrow {
    use super::*;

    /// Initialize a new LP token escrow
    pub fn initialize_escrow(
        ctx: Context<InitializeEscrow>,
        pool_address: Pubkey,
        lp_mint: Pubkey,
        min_holders: u64,
        min_volume_usd: u64,
    ) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        escrow.pool_address = pool_address;
        escrow.lp_mint = lp_mint;
        escrow.min_holders = min_holders;
        escrow.min_volume_usd = min_volume_usd;
        escrow.is_unlocked = false;
        escrow.bump = ctx.bumps.escrow;
        
        msg!("Escrow initialized for pool: {}", pool_address);
        msg!("Requirements - Min holders: {}, Min volume: {} USD", min_holders, min_volume_usd);
        
        Ok(())
    }

    /// Deposit LP tokens into escrow (60% automatically locked)
    pub fn deposit_lp_tokens(
        ctx: Context<DepositLPTokens>,
        amount: u64,
    ) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        
        // Calculate 60% to lock in escrow
        let lock_amount = amount * 60 / 100;
        let immediate_amount = amount - lock_amount;
        
        // Transfer LP tokens to escrow vault
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.user_lp_account.to_account_info(),
                    to: ctx.accounts.escrow_vault.to_account_info(),
                    authority: ctx.accounts.user.to_account_info(),
                },
            ),
            lock_amount,
        )?;
        
        escrow.locked_amount += lock_amount;
        
        msg!("Deposited {} LP tokens, {} locked in escrow", amount, lock_amount);
        
        Ok(())
    }

    /// Check and unlock escrow if conditions are met
    pub fn check_and_unlock(
        ctx: Context<CheckAndUnlock>,
        holders_count: u64,
        volume_usd: u64,
    ) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        
        require!(!escrow.is_unlocked, ErrorCode::EscrowAlreadyUnlocked);
        
        // Verify oracle data (in real implementation, this would verify signatures)
        require!(holders_count >= escrow.min_holders, ErrorCode::InsufficientHolders);
        require!(volume_usd >= escrow.min_volume_usd, ErrorCode::InsufficientVolume);
        
        escrow.is_unlocked = true;
        
        msg!("Escrow unlocked! Holders: {}, Volume: {} USD", holders_count, volume_usd);
        
        Ok(())
    }

    /// Withdraw LP tokens from escrow (only if unlocked)
    pub fn withdraw_lp_tokens(
        ctx: Context<WithdrawLPTokens>,
        amount: u64,
    ) -> Result<()> {
        let escrow = &ctx.accounts.escrow;
        
        require!(escrow.is_unlocked, ErrorCode::EscrowStillLocked);
        require!(amount <= escrow.locked_amount, ErrorCode::InsufficientBalance);
        
        // Transfer LP tokens from escrow vault to user
        let seeds = &[
            b"escrow".as_ref(),
            escrow.pool_address.as_ref(),
            &[escrow.bump],
        ];
        let signer = &[&seeds[..]];
        
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.escrow_vault.to_account_info(),
                    to: ctx.accounts.user_lp_account.to_account_info(),
                    authority: ctx.accounts.escrow.to_account_info(),
                },
                signer,
            ),
            amount,
        )?;
        
        msg!("Withdrawn {} LP tokens from escrow", amount);
        
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(pool_address: Pubkey)]
pub struct InitializeEscrow<'info> {
    #[account(
        init,
        payer = payer,
        space = EscrowAccount::LEN,
        seeds = [b"escrow", pool_address.as_ref()],
        bump
    )]
    pub escrow: Account<'info, EscrowAccount>,
    
    #[account(mut)]
    pub payer: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DepositLPTokens<'info> {
    #[account(mut)]
    pub escrow: Account<'info, EscrowAccount>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(mut)]
    pub user_lp_account: Account<'info, TokenAccount>,
    
    #[account(
        init_if_needed,
        payer = user,
        token::mint = lp_mint,
        token::authority = escrow,
        seeds = [b"vault", escrow.key().as_ref()],
        bump
    )]
    pub escrow_vault: Account<'info, TokenAccount>,
    
    pub lp_mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CheckAndUnlock<'info> {
    #[account(mut)]
    pub escrow: Account<'info, EscrowAccount>,
    
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct WithdrawLPTokens<'info> {
    #[account(mut)]
    pub escrow: Account<'info, EscrowAccount>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(mut)]
    pub user_lp_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        seeds = [b"vault", escrow.key().as_ref()],
        bump
    )]
    pub escrow_vault: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct EscrowAccount {
    pub pool_address: Pubkey,
    pub lp_mint: Pubkey,
    pub min_holders: u64,
    pub min_volume_usd: u64,
    pub locked_amount: u64,
    pub is_unlocked: bool,
    pub bump: u8,
}

impl EscrowAccount {
    pub const LEN: usize = 32 + 32 + 8 + 8 + 8 + 1 + 1 + 8; // discriminator + data
}

#[error_code]
pub enum ErrorCode {
    #[msg("Escrow is already unlocked")]
    EscrowAlreadyUnlocked,
    
    #[msg("Insufficient holders to unlock escrow")]
    InsufficientHolders,
    
    #[msg("Insufficient trading volume to unlock escrow")]
    InsufficientVolume,
    
    #[msg("Escrow is still locked")]
    EscrowStillLocked,
    
    #[msg("Insufficient balance in escrow")]
    InsufficientBalance,
}