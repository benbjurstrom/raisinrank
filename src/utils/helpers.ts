import { Actor, HttpAgent } from '@dfinity/agent'
import { ActorSubclass } from '@dfinity/agent/lib/cjs/actor'
import { IDL } from '@dfinity/candid'
import { Principal } from '@dfinity/principal'
import { Buffer } from 'buffer'
import fetch from 'cross-fetch'

const agent = new HttpAgent({
  host: 'https://boundary.ic0.app',
  fetch: fetch
})

export const getActor = (idlFactory: IDL.InterfaceFactory, canisterId: string) => {
  return Actor.createActor(idlFactory, {
    agent,
    canisterId
  })
}

export const getIcpTwoDecimals = (value: string) => {
  return Math.floor((Number(value) / 100000000) * 100) / 100
}

export const getDateFromNano = (nanoseconds: bigint) => {
  return new Date(Math.floor(Number(BigInt(nanoseconds)) / 1000000))
}

export const callCanister = async (actor: ActorSubclass<any>, method: string): Promise<any> => {
  try {
    const result = await actor[method]()
    return result
  } catch (e) {
    console.log(e)
  }
}

export const tokenIdentifier = (principal: string, index: number) => {
  const padding = Buffer.from('\x0Atid')
  const array = new Uint8Array([
    ...padding,
    ...Principal.fromText(principal).toUint8Array(),
    ...to32bits(index)
  ])
  return Principal.fromUint8Array(array).toText()
}

export const decodeTokenId = (tid: string) => {
  const p: any = [...Principal.fromText(tid).toUint8Array()]
  const padding = p.splice(0, 4)
  if (toHexString(padding) !== toHexString(Buffer.from('\x0Atid'))) {
    return {
      index: 0,
      canister: tid,
      token: tokenIdentifier(tid, 0)
    }
  } else {
    return {
      index: from32bits(p.splice(-4)),
      canister: Principal.fromUint8Array(p).toText(),
      token: tid
    }
  }
}

const from32bits = (ba: number[]): number => {
  let value = 0
  for (let i = 0; i < 4; i++) {
    value = (value << 8) | ba[i]
  }
  return value
}

export const to32bits = (num: number) => {
  const b = new ArrayBuffer(4)
  new DataView(b).setUint32(0, num)
  return Array.from(new Uint8Array(b))
}

const toHexString = (byteArray: Uint8Array | number[]) => {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2)
  }).join('')
}
