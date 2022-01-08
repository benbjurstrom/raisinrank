export interface Canister {
  id: string
  name: string
  slug: string
  thumbnail: string
}

export const Canisters: Canister[] = [
  {
    id: 'oeee4-qaaaa-aaaak-qaaeq-cai',
    name: 'Motoko Day Drop',
    slug: 'motoko',
    thumbnail: 'https://i.imgur.com/49Cw6XE.png'
  },
  {
    id: 'zvycl-fyaaa-aaaah-qckmq-cai',
    name: 'ICApes',
    slug: 'icapes',
    thumbnail:
      'https://zvycl-fyaaa-aaaah-qckmq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=wnoum-dakor-uwiaa-aaaaa-b4ast-eaqca-aaeig-q'
  },
  {
    id: 'bzsui-sqaaa-aaaah-qce2a-cai',
    name: 'Poked bots',
    slug: 'poked',
    thumbnail:
      'https://bzsui-sqaaa-aaaah-qce2a-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=5xgg5-uykor-uwiaa-aaaaa-b4arg-qaqca-aabah-a'
  },
  {
    id: 'unssi-hiaaa-aaaah-qcmya-cai',
    name: 'ICPets',
    slug: 'icpets',
    thumbnail:
      'https://unssi-hiaaa-aaaah-qcmya-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=izj66-qikor-uwiaa-aaaaa-b4atg-aaqca-aaefz-a'
  },
  {
    id: '3mttv-dqaaa-aaaah-qcn6q-cai',
    name: 'Dfinity Space Apes',
    slug: 'spaceapes',
    thumbnail: 'https://i.imgur.com/OCGxNkS.png'
  },
  {
    id: 'z7mqv-liaaa-aaaah-qcnqa-cai',
    name: 'ICircle',
    slug: 'icircle',
    thumbnail:
      'https://z7mqv-liaaa-aaaah-qcnqa-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=fgrx7-oakor-uwiaa-aaaaa-b4atm-aaqca-aaaag-q'
  }
]

export const getCanisterFromSlug = (slug?: string): Canister => {
  const canister = Canisters.find((c) => c.slug === slug)
  if (canister) {
    return canister
  }

  throw Error('Canister not found')
}

export const getCanisterFromId = (id?: string) => {
  const canister = Canisters.find((c) => c.id === id)
  if (canister) {
    return canister
  }

  throw Error('Canister not found')
}
