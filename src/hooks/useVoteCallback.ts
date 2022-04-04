import { calculateGasMargin } from 'utils'
import { TransactionResponse } from '@ethersproject/providers'
import { useCallback } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useActiveWeb3React } from '.'
import { useVotingContract, useCrossVotingContract } from './useContract'
import { CrossSigType } from './useCreateCommunityProposalCallback'

export function useVoteCallback(votingAddress: string | undefined) {
  const addTransaction = useTransactionAdder()
  const votingContract = useVotingContract(votingAddress)
  const { account } = useActiveWeb3React()

  return useCallback(
    (id: string, index: number) => {
      if (!account) throw new Error('none account')
      if (!votingContract) throw new Error('none votingContract')

      return votingContract.estimateGas.vote(id, index, { from: account }).then(estimatedGasLimit => {
        return votingContract
          .vote(id, index, {
            gasLimit: calculateGasMargin(estimatedGasLimit),
            // gasLimit: '3500000',
            from: account
          })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: 'Vote'
            })
            return response.hash
          })
      })
    },
    [account, addTransaction, votingContract]
  )
}

export function useCrossVoteCallback(votingAddress: string | undefined) {
  const addTransaction = useTransactionAdder()
  const votingContract = useCrossVotingContract(votingAddress)
  const { account } = useActiveWeb3React()

  return useCallback(
    (
      voteInfo: { id: string; index: number },
      user: string,
      weight: string,
      chainId: number,
      voting: string,
      nonce: number,
      signature: string
    ) => {
      if (!account) throw new Error('none account')
      if (!votingContract) throw new Error('none votingContract')

      const args = [...Object.values(voteInfo), [user, weight, chainId, voting, nonce, CrossSigType.Vote], signature]
      console.log('🚀 ~ file: useVoteCallback.ts ~ line 57 ~ useCrossVoteCallback ~ args', args, JSON.stringify(args))

      return votingContract.estimateGas.vote(...args, { from: account }).then(estimatedGasLimit => {
        return votingContract
          .vote(...args, {
            gasLimit: calculateGasMargin(estimatedGasLimit),
            // gasLimit: '3500000',
            from: account
          })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: 'Vote'
            })
            return response.hash
          })
      })
    },
    [account, addTransaction, votingContract]
  )
}
