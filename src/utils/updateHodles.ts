import { db, Hodle } from '../db'
// @ts-ignore
import { idlFactory } from '../dids/ape.did.js'
import { callCanister, getActor, tokenIdentifier } from './helpers'

export const updateHodles = async (canisterId: string): Promise<void> => {
  const actor = getActor(idlFactory, canisterId)
  const response = await callCanister(actor, 'getRegistry')

  await deleteHodles(canisterId)
  const hodles = transformHodleResponse(response, canisterId)
  await db.hodles.bulkAdd(hodles)

  return
}

export const deleteHodles = async (canisterId: string): Promise<void> => {
  await db.hodles.where('canisterId').equals(canisterId).delete()
}

function transformHodleResponse(response: any, canisterId: string): Hodle[] {
  return response.map((record: any) => {
    // console.log(record)
    return {
      canisterId,
      tokenId: tokenIdentifier(canisterId, record[0]),
      tokenIndex: record[0],
      ownerId: record[1],
      timestamp: new Date().toISOString()
    }
  })
}
