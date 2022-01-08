import { db, Listing } from '../db'
// @ts-ignore
import { idlFactory } from '../dids/ape.did.js'
import { callCanister, getActor, tokenIdentifier } from './helpers'

export const updateListings = async (canisterId: string): Promise<void> => {
  const actor = getActor(idlFactory, canisterId)
  const response = await callCanister(actor, 'listings')

  const collection = await db.listings.where('canisterId').equals(canisterId)
  const dbListings = await collection.clone().toArray()
  const canisterListings = transformListingResponse(response, canisterId)

  // Add any new listings
  const newListings = await canisterListings.filter((canisterListinga) => {
    return !dbListings.some((dbListing) => dbListing.tokenId === canisterListinga.tokenId)
  })
  await db.listings.bulkAdd(newListings)

  // Update any modified listings
  await collection.modify(async (dbListing, ref: any) => {
    // Delete the dbListing if it's no longer present in the canisterListings
    const canisterListing = canisterListings.find(
      (canisterListing) => canisterListing.tokenId === dbListing.tokenId
    )
    if (!canisterListing) {
      delete ref.value
      return
    }

    // Return early if the price hasn't changed
    if (dbListing.price === canisterListing.price) {
      return
    }

    // If it has changed then update the dbListing
    ref.value = {
      canisterId,
      tokenId: canisterListing.tokenId,
      tokenIndex: canisterListing.tokenIndex,
      sellerId: canisterListing.sellerId,
      price: canisterListing.price,
      historicPrice: dbListing.price,
      timestamp: new Date().toISOString()
    }
  })

  return
}

export const deleteListings = async (canisterId: string): Promise<void> => {
  const listings = db.listings.where('canisterId').equals(canisterId)
  await listings.delete()
}

function transformListingResponse(response: any, canisterId: string): Listing[] {
  return response.map((record: any) => {
    return {
      canisterId,
      tokenId: tokenIdentifier(canisterId, record[0]),
      tokenIndex: record[0],
      sellerId: record[1].seller.toString(),
      price: record[1].price.toString(),
      historicPrice: null,
      timestamp: new Date().toISOString()
    }
  })
}

//   for await (const record of result) {
//     const listing: Listing = {
//       canisterId,
//       tokenId: tokenIdentifier(canisterId, record[0]),
//       tokenIndex: record[0],
//       sellerId: record[1].seller.toString(),
//       price: record[1].price.toString(),
//       historicPrice: null,
//       timestamp: new Date().toISOString()
//     }
//
//     const count = await db.listings.where('tokenId').equals(listing.tokenId).count()
//     if (!count) {
//       await db.listings.add(listing)
//       continue
//     }
//   }
