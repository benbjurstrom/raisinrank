import { db, Hodle } from '../db'
// @ts-ignore
import { idlFactory } from '../dids/ape.did.js'
import { callCanister, getActor, getOffsetIndex, tokenIdentifier } from './helpers'

export interface HodleCollection {
  ownerId: string
  count: number
}

export const updateHodles = async (canisterId: string): Promise<void> => {
  const actor = getActor(idlFactory, canisterId)
  const response = await callCanister(actor, 'getRegistry')

  const collection = await db.hodles.where('canisterId').equals(canisterId)
  const canisterHodles = transformHodleResponse(response, canisterId)

  // Bulk add if this is the first load
  if ((await collection.count()) === 0) {
    await db.hodles.bulkAdd(canisterHodles)
    return
  }

  // Otherwise update any changes
  await collection.modify(async (dbHodle, ref: any) => {
    // Delete the dbListing if it's no longer present in the canisterListings
    const canisterHodle = canisterHodles.find(
      (canisterHodle) => canisterHodle.tokenId === dbHodle.tokenId
    )
    if (!canisterHodle) {
      delete ref.value
      return
    }

    // Return early if the owner hasn't changed
    if (dbHodle.ownerId === canisterHodle.ownerId) {
      return
    }

    // If it has changed then update the dbListing
    ref.value = {
      canisterId,
      tokenId: canisterHodle.tokenId,
      tokenIndex: canisterHodle.tokenIndex,
      ownerId: canisterHodle.ownerId,
      timestamp: new Date().toISOString()
    }
  })

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
      tokenIndex: getOffsetIndex(record[0], canisterId),
      ownerId: record[1],
      timestamp: new Date().toISOString()
    }
  })
}
