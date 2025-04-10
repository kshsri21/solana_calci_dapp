#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("BFE9WxmarY7Mw1xPHa4Q2jt963eNzcqXd7v8teG6hv7h");

#[program]
pub mod cdemo {
    use super::*;

    pub fn initialize_result(ctx: Context<InitializeResult>) -> Result<()> {
        ctx.accounts.calci.result = 0;
        Ok(())
    }
    pub fn add(ctx: Context<Add>, a: i64, b: i64) -> Result<()> {
        ctx.accounts.calci.result = a + b;
        Ok(())
    }
    pub fn sub(ctx: Context<Sub>, a: i64, b: i64) -> Result<()> {
        if a > b {
            ctx.accounts.calci.result = a - b;
        } else {
            ctx.accounts.calci.result = b - a;
        }

        Ok(())
    }
    pub fn div(ctx: Context<Div>, a: i64, b: i64) -> Result<()> {
        require!(b != 0, ErrorCode::DivisionByZero);
        ctx.accounts.calci.result = a / b;
        Ok(())
    }
    pub fn mul(ctx: Context<Mul>, a: i64, b: i64) -> Result<()> {
        ctx.accounts.calci.result = a * b;
        Ok(())
    }
}

#[error_code]
pub enum ErrorCode {
    DivisionByZero,
}
#[account]
#[derive(InitSpace)]
pub struct ResultValue {
    result: i64,
}
#[derive(Accounts)]
pub struct InitializeResult<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(init,space=8+ResultValue::INIT_SPACE,payer=payer)]
    pub calci: Account<'info, ResultValue>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Add<'info> {
    #[account(mut)]
    pub calci: Account<'info, ResultValue>,
}
#[derive(Accounts)]
pub struct Sub<'info> {
    #[account(mut)]
    pub calci: Account<'info, ResultValue>,
}
#[derive(Accounts)]
pub struct Div<'info> {
    #[account(mut)]
    pub calci: Account<'info, ResultValue>,
}
#[derive(Accounts)]
pub struct Mul<'info> {
    #[account(mut)]
    pub calci: Account<'info, ResultValue>,
}
