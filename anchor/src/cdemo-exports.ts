// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import CdemoIDL from '../target/idl/cdemo.json'
import type { Cdemo } from '../target/types/cdemo'

// Re-export the generated IDL and type
export { Cdemo, CdemoIDL }

// The programId is imported from the program IDL.
export const CDEMO_PROGRAM_ID = new PublicKey(CdemoIDL.address)

// This is a helper function to get the Cdemo Anchor program.
export function getCdemoProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...CdemoIDL, address: address ? address.toBase58() : CdemoIDL.address } as Cdemo, provider)
}

// This is a helper function to get the program ID for the Cdemo program depending on the cluster.
export function getCdemoProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Cdemo program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return CDEMO_PROGRAM_ID
  }
}
