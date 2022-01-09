import { db, Transaction } from '../db'
// @ts-ignore
import { idlFactory } from '../dids/ape.did.js'
import { callCanister, decodeTokenId, getActor, getDateFromNano } from './helpers'

export const updateTransactions = async (canisterId: string): Promise<void> => {
  const actor = getActor(idlFactory, canisterId)
  const response = await callCanister(actor, 'transactions')

  const dbTransactions = await db.transactions.where('canisterId').equals(canisterId).toArray()
  const canisterTransactions = transformTransactionResponse(response, canisterId)

  // Add any new transactions
  const newTransactions = canisterTransactions.filter((canisterTransactions) => {
    return !dbTransactions.some(
      (dbTransaction) => dbTransaction.tokenId === canisterTransactions.tokenId
    )
  })

  await db.transactions.bulkAdd(newTransactions)
  return
}

export const deleteTransactions = async (canisterId: string): Promise<void> => {
  const transactions = db.transactions.where('canisterId').equals(canisterId)
  await transactions.delete()
}

function transformTransactionResponse(response: any, canisterId: string): Transaction[] {
  return response.map((record: any) => {
    return {
      canisterId,
      tokenId: record.token,
      tokenIndex: decodeTokenId(record.token).index,
      price: record.price.toString(),
      buyerId: record.buyer.toString(),
      sellerId: record.seller.toString(),
      soldAt: getDateFromNano(record.time).toISOString(),
      timestamp: new Date().toISOString()
    }
  })
}

//   for await (const record of result) {
//     const transaction: Transaction = {
//       canisterId,
//       tokenId: tokenIdentifier(canisterId, record[0]),
//       tokenIndex: record[0],
//       sellerId: record[1].seller.toString(),
//       price: record[1].price.toString(),
//       historicPrice: null,
//       timestamp: new Date().toISOString()
//     }
//
//     const count = await db.transactions.where('tokenId').equals(transaction.tokenId).count()
//     if (!count) {
//       await db.transactions.add(transaction)
//       continue
//     }
//   }