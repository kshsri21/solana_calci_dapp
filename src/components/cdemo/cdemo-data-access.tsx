'use client'

import { getCdemoProgram, getCdemoProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'
import BN from "bn.js"

export function useCdemoProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getCdemoProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getCdemoProgram(provider, programId), [provider, programId])

  //console.log("programId:", programId);
  console.log("programId:", programId.toBase58());
  console.log("program:", program);

  const accounts = useQuery({
    queryKey: ['cdemo', 'all', { cluster }],
    queryFn: () => program.account.resultValue.all(),
  })

  //console.log("accounts:", accounts);
  console.log("Fetched accounts data:", accounts.data);

  if (accounts?.data) {
    accounts.data.forEach((item, index) => {
      console.log(`Public Key ${index}:`, item.publicKey.toBase58());
    });
  }
  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  console.log("getProgramAccount:", getProgramAccount);

  const initialize = useMutation({
    mutationKey: ['cdemo', 'initialize_result', { cluster }],
    mutationFn: (keypair: Keypair) => {
      console.log("Keypair:", keypair.publicKey.toBase58());
      return program.methods
        .initializeResult()
        .accounts({ calci: keypair.publicKey })
        .signers([keypair])
        .rpc(); // this returns a Promise<string> (the tx signature)
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch(); // optionally wait for refetch to complete
    },
    onError: () => toast.error('Failed to initialize account'),
  });


  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useCdemoProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useCdemoProgram()

  const accountQuery = useQuery({
    queryKey: ['cdemo', 'fetch', { cluster, account }],
    queryFn: () => program.account.resultValue.fetch(account),
  })
  console.log("accountQuery:", accountQuery);

  const addValues = useMutation({
    mutationKey: ['cdemo', 'add', { cluster }],
    mutationFn: async ({ a, b }: { a: number; b: number }) => {
      return await program.methods
        .add(new BN(a), new BN(b))
        .accounts({ calci: account })
        .rpc();
    },
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const subValues = useMutation({
    mutationKey: ['cdemo', 'sub', { cluster }],
    mutationFn: async ({ a, b }: { a: number; b: number }) => {
      return await program.methods
        .sub(new BN(a), new BN(b))
        .accounts({ calci: account })
        .rpc();
    },
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  return {
    accountQuery,
    addValues,
    subValues
  }
}
