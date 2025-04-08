#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod cdemo {
    use super::*;

  pub fn close(_ctx: Context<CloseCdemo>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.cdemo.count = ctx.accounts.cdemo.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.cdemo.count = ctx.accounts.cdemo.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeCdemo>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.cdemo.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeCdemo<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Cdemo::INIT_SPACE,
  payer = payer
  )]
  pub cdemo: Account<'info, Cdemo>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseCdemo<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub cdemo: Account<'info, Cdemo>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub cdemo: Account<'info, Cdemo>,
}

#[account]
#[derive(InitSpace)]
pub struct Cdemo {
  count: u8,
}
