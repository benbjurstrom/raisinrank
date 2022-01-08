import { db, Title } from '../db'
// @ts-ignore
import { idlFactory } from '../dids/ape.did.js'
import { callCanister, getActor, tokenIdentifier } from './helpers'

export const updateTitles = async (canisterId: string): Promise<void> => {
  const actor = getActor(idlFactory, canisterId)
  const response = await callCanister(actor, 'getRegistry')

  await deleteTitles(canisterId)
  const titles = transformTitleResponse(response, canisterId)
  await db.titles.bulkAdd(titles)

  return
}

export const deleteTitles = async (canisterId: string): Promise<void> => {
  await db.titles.where('canisterId').equals(canisterId).delete()
}

function transformTitleResponse(response: any, canisterId: string): Title[] {
  return response.map((record: any) => {
    console.log(record)
    return {
      canisterId,
      tokenId: tokenIdentifier(canisterId, record[0]),
      tokenIndex: record[0],
      ownerId: record[1],
      timestamp: new Date().toISOString()
    }
  })
}
