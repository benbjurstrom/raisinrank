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
    thumbnail: 'https://i.imgur.com/7lNaRq6.png'
  },
  {
    id: 'zvycl-fyaaa-aaaah-qckmq-cai',
    name: 'ICApes',
    slug: 'icapes',
    thumbnail:
      'https://zvycl-fyaaa-aaaah-qckmq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=wnoum-dakor-uwiaa-aaaaa-b4ast-eaqca-aaeig-q'
  },
  {
    id: 'unssi-hiaaa-aaaah-qcmya-cai',
    name: 'ICPets',
    slug: 'icpets',
    thumbnail: 'https://imgur.com/jqYNvsk.png'
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
  },
  {
    id: 'njgly-uaaaa-aaaah-qb6pa-cai',
    name: 'ICPuppies',
    slug: 'icpuppies',
    thumbnail:
      'https://njgly-uaaaa-aaaah-qb6pa-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=me6mq-dakor-uwiaa-aaaaa-b4apt-yaqca-aaemf-q'
  },
  {
    id: 'v3zkd-syaaa-aaaah-qcm5a-cai',
    name: 'IC Kitties',
    slug: 'ickitties',
    thumbnail:
      'https://v3zkd-syaaa-aaaah-qcm5a-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=sppfz-fqkor-uwiaa-aaaaa-b4ath-iaqca-aaabu-a'
  },
  {
    id: 'bzsui-sqaaa-aaaah-qce2a-cai',
    name: 'Poked bots',
    slug: 'poked',
    thumbnail:
      'https://bzsui-sqaaa-aaaah-qce2a-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=5xgg5-uykor-uwiaa-aaaaa-b4arg-qaqca-aabah-a'
  },
  {
    id: 'e3izy-jiaaa-aaaah-qacbq-cai',
    name: 'Cronic Critters',
    slug: 'cronics',
    thumbnail: 'https://i.imgur.com/bkJSAbx.png'
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
