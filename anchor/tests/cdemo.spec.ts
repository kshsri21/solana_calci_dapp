import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Cdemo } from '../target/types/cdemo'

describe('cdemo', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Cdemo as Program<Cdemo>

  const cdemoKeypair = Keypair.generate()

  it('Initialize Cdemo', async () => {
    await program.methods
      .initialize()
      .accounts({
        cdemo: cdemoKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([cdemoKeypair])
      .rpc()

    const currentCount = await program.account.cdemo.fetch(cdemoKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Cdemo', async () => {
    await program.methods.increment().accounts({ cdemo: cdemoKeypair.publicKey }).rpc()

    const currentCount = await program.account.cdemo.fetch(cdemoKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Cdemo Again', async () => {
    await program.methods.increment().accounts({ cdemo: cdemoKeypair.publicKey }).rpc()

    const currentCount = await program.account.cdemo.fetch(cdemoKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Cdemo', async () => {
    await program.methods.decrement().accounts({ cdemo: cdemoKeypair.publicKey }).rpc()

    const currentCount = await program.account.cdemo.fetch(cdemoKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set cdemo value', async () => {
    await program.methods.set(42).accounts({ cdemo: cdemoKeypair.publicKey }).rpc()

    const currentCount = await program.account.cdemo.fetch(cdemoKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the cdemo account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        cdemo: cdemoKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.cdemo.fetchNullable(cdemoKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
