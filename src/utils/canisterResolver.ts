export interface Canister {
  id: string
  name: string
  slug: string
  thumbnail: string
  featured: boolean
}

export const Canisters: Canister[] = [
  {
    id: 'oeee4-qaaaa-aaaak-qaaeq-cai',
    name: 'Motoko Day Drop',
    slug: 'motoko',
    thumbnail: 'https://i.imgur.com/nXliJJb.png',
    featured: true
  },
  {
    id: 'zvycl-fyaaa-aaaah-qckmq-cai',
    name: 'ICApes',
    slug: 'icapes',
    thumbnail:
      'https://zvycl-fyaaa-aaaah-qckmq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=wnoum-dakor-uwiaa-aaaaa-b4ast-eaqca-aaeig-q',
    featured: true
  },
  {
    id: '3mttv-dqaaa-aaaah-qcn6q-cai',
    name: 'Dfinity Space Apes',
    slug: 'spaceapes',
    thumbnail: 'https://i.imgur.com/OCGxNkS.png',
    featured: true
  },
  {
    id: 'unssi-hiaaa-aaaah-qcmya-cai',
    name: 'ICPets',
    slug: 'icpets',
    thumbnail: 'https://imgur.com/jqYNvsk.png',
    featured: true
  },
  {
    id: 'z7mqv-liaaa-aaaah-qcnqa-cai',
    name: 'ICircle',
    slug: 'icircle',
    thumbnail:
      'https://z7mqv-liaaa-aaaah-qcnqa-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=y4zxu-aikor-uwiaa-aaaaa-b4atm-aaqca-aaa6w-a',
    featured: true
  },
  {
    id: 'jeghr-iaaaa-aaaah-qco7q-cai', // wrapped
    name: 'ICTurtles (Wrapped)',
    slug: 'icturtles',
    thumbnail: 'https://i.imgur.com/3ig1Rx3.png',
    featured: true
  },
  {
    id: 'njgly-uaaaa-aaaah-qb6pa-cai',
    name: 'ICPuppies',
    slug: 'icpuppies',
    thumbnail:
      'https://njgly-uaaaa-aaaah-qb6pa-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=me6mq-dakor-uwiaa-aaaaa-b4apt-yaqca-aaemf-q',
    featured: false
  },
  {
    id: 'v3zkd-syaaa-aaaah-qcm5a-cai',
    name: 'IC Kitties',
    slug: 'ickitties',
    thumbnail:
      'https://v3zkd-syaaa-aaaah-qcm5a-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=sppfz-fqkor-uwiaa-aaaaa-b4ath-iaqca-aaabu-a',
    featured: false
  },
  {
    id: 'bzsui-sqaaa-aaaah-qce2a-cai',
    name: 'Poked bots',
    slug: 'poked',
    thumbnail:
      'https://bzsui-sqaaa-aaaah-qce2a-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=5xgg5-uykor-uwiaa-aaaaa-b4arg-qaqca-aabah-a',
    featured: false
  },
  {
    id: 'e3izy-jiaaa-aaaah-qacbq-cai',
    name: 'Cronic Critters',
    slug: 'cronics',
    thumbnail: 'https://i.imgur.com/bkJSAbx.png',
    featured: false
  },
  {
    id: 'nbg4r-saaaa-aaaah-qap7a-cai',
    name: 'Starverse',
    slug: 'starverse',
    thumbnail:
      'https://nbg4r-saaaa-aaaah-qap7a-cai.raw.ic0.app/?tokenid=er6r4-hakor-uwiaa-aaaaa-b4ad7-yaqca-aaciz-a',
    featured: false
  },
  {
    id: 'txr2a-fqaaa-aaaah-qcmkq-cai',
    name: 'Meme Cake',
    slug: 'memecake',
    thumbnail:
      'https://txr2a-fqaaa-aaaah-qcmkq-cai.raw.ic0.app/?tokenid=2mm2g-jqkor-uwiaa-aaaaa-b4atc-uaqca-aaajg-q',
    featured: false
  },
  {
    id: 'pk6rk-6aaaa-aaaae-qaazq-cai',
    name: 'BTC Flower',
    slug: 'btcflower',
    thumbnail: 'https://i.imgur.com/Q14lZ1h.png',
    featured: false
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
