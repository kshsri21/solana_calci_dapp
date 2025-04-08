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

export function useCdemoProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getCdemoProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getCdemoProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['cdemo', 'all', { cluster }],
    queryFn: () => program.account.cdemo.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['cdemo', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ cdemo: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

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
    queryFn: () => program.account.cdemo.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['cdemo', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ cdemo: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['cdemo', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ cdemo: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['cdemo', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ cdemo: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['cdemo', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ cdemo: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
