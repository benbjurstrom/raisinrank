import { db, Sale } from '../db'
// @ts-ignore
import { idlFactory } from '../dids/ape.did.js'

import { callCanister, getActor, getDateFromNano, decodeTokenId } from './helpers'

export const updateSales = async (canisterId: string): Promise<void> => {
  const actor = getActor(idlFactory, canisterId)
  const response = await callCanister(actor, 'transactions')

  const dbSales = await db.sales.where('canisterId').equals(canisterId).toArray()
  const canisterSales = transformSaleResponse(response, canisterId)

  // Add any new sales
  const newSales = canisterSales.filter((canisterSales) => {
    return !dbSales.some((dbSale) => dbSale.tokenId === canisterSales.tokenId)
  })

  await db.sales.bulkAdd(newSales)
  return
}

export const deleteSales = async (canisterId: string): Promise<void> => {
  const sales = db.sales.where('canisterId').equals(canisterId)
  await sales.delete()
}

function transformSaleResponse(response: any, canisterId: string): Sale[] {
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
//     const sale: Sale = {
//       canisterId,
//       tokenId: tokenIdentifier(canisterId, record[0]),
//       tokenIndex: record[0],
//       sellerId: record[1].seller.toString(),
//       price: record[1].price.toString(),
//       historicPrice: null,
//       timestamp: new Date().toISOString()
//     }
//
//     const count = await db.sales.where('tokenId').equals(sale.tokenId).count()
//     if (!count) {
//       await db.sales.add(sale)
//       continue
//     }
//   }
