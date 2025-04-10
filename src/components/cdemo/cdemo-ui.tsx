'use client'

import { Keypair, PublicKey } from '@solana/web3.js'
import { ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useState } from "react";
import { useCdemoProgram, useCdemoProgramAccount } from './cdemo-data-access'
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react"

export function CdemoCreate() {
  const { initialize } = useCdemoProgram()
  // const { publicKey } = useWallet();
  return (
    <button
      className="btn btn-xs lg:btn-md btn-primary"
      onClick={() => initialize.mutateAsync(Keypair.generate())}
      disabled={initialize.isPending}
    >
      Create {initialize.isPending && '...'}
    </button>
  )

  // const handleSubmit = () => {
  //   if (publicKey) {
  //     initialize.mutateAsync(publicKey)
  //   }
  // }
  // if (!publicKey) {
  //   return <p>Connect Your Wallet</p>
  // }
  // return (
  //   <button
  //     className="btn btn-xs lg:btn-md btn-primary"
  //     onClick={handleSubmit}
  //     disabled={initialize.isPending}
  //   >
  //     Create {initialize.isPending && '...'}
  //   </button>
  // )
}

export function CdemoList() {
  const { accounts, getProgramAccount } = useCdemoProgram()

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account) => (
            <CdemoCard key={account.publicKey.toString()} account={account.publicKey} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  )
}

function CdemoCard({ account }: { account: PublicKey }) {
  const { accountQuery, addValues, subValues } = useCdemoProgramAccount({ account })

  const result = useMemo(() => accountQuery.data?.result ?? 0, [accountQuery.data?.result])

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2 className="card-title justify-center text-3xl cursor-pointer" onClick={() => accountQuery.refetch()}>
            {result.toString()}
          </h2>
          <div className="card-actions justify-around">

            <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => {
                const a = window.prompt('Value of a:', result.toString() ?? '0')
                const b = window.prompt('Value of b:', result.toString() ?? '0')
                if (!a || parseInt(a) === result || isNaN(parseInt(a))) {
                  return
                }
                if (!b || parseInt(b) === result || isNaN(parseInt(b))) {
                  return
                }
                return addValues.mutateAsync({ a: parseInt(a), b: parseInt(b) })
              }}
              disabled={addValues.isPending}
            >
              Add Values
            </button>

            <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => {
                const a = window.prompt('Value of a:', result.toString() ?? '0')
                const b = window.prompt('Value of b:', result.toString() ?? '0')
                if (!a || parseInt(a) === result || isNaN(parseInt(a))) {
                  return
                }
                if (!b || parseInt(b) === result || isNaN(parseInt(b))) {
                  return
                }
                return subValues.mutateAsync({ a: parseInt(a), b: parseInt(b) })
              }}
              disabled={subValues.isPending}
            >
              Sub Values
            </button>
          </div>
          <div className="text-center space-y-4">
            <p>
              <ExplorerLink path={`account/${account}`} label={ellipsify(account.toString())} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
