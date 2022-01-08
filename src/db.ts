// db.ts
import Dexie, { Table } from 'dexie'

export interface Listing {
  id?: number
  canisterId: string
  tokenId: string
  tokenIndex: number
  sellerId: string
  price: string
  historicPrice: string | null
  timestamp: string
}

export interface Title {
  id?: number
  canisterId: string
  tokenId: string
  tokenIndex: number
  ownerId: string
  timestamp: string
}

export interface Sale {
  id?: number
  canisterId: string
  tokenId: string
  tokenIndex: number
  price: string
  buyerId: string
  sellerId: string
  soldAt: string
  timestamp: string
}

export class MySubClassedDexie extends Dexie {
  listings!: Table<Listing>

  titles!: Table<Title>

  sales!: Table<Sale>

  constructor() {
    super('myDatabase')
    this.version(1).stores({
      listings: '++id, canisterId, tokenId, tokenIndex, sellerId, price, timestamp', // Primary key and indexed props
      titles: '++id, canisterId, tokenId, tokenIndex, ownerId, timestamp', // Primary key and indexed props
      sales: '++id, canisterId, tokenId, tokenIndex, buyerId, sellerId, soldAt, timestamp' // Primary key and indexed props
    })
  }
}

export const db = new MySubClassedDexie()
