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

export interface Hodle {
  id?: number
  canisterId: string
  tokenId: string
  tokenIndex: number
  ownerId: string
  timestamp: string
}

export interface Transaction {
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

  hodles!: Table<Hodle>

  transactions!: Table<Transaction>

  constructor() {
    super('myDatabase')
    this.version(1).stores({
      listings: '++id, canisterId, tokenId, tokenIndex, sellerId, price, timestamp', // Primary key and indexed props
      hodles: '++id, canisterId, tokenId, tokenIndex, ownerId, timestamp', // Primary key and indexed props
      transactions: '++id, canisterId, tokenId, tokenIndex, buyerId, sellerId, soldAt, timestamp' // Primary key and indexed props
    })
  }
}

export const db = new MySubClassedDexie()

export const deleteDB = async (): Promise<void> => {
  db.delete()
    .then(() => {
      console.log('Database successfully deleted')
    })
    .catch((err) => {
      console.error('Could not delete database')
    })
    .finally(() => {
      window.location.reload()
    })
}
