export interface Canister {
  id: string
  name: string
  slug: string
  thumbnail: string
  featured: boolean
  dgdg?: string
}

export const Canisters: Canister[] = [
  {
    id: 'oeee4-qaaaa-aaaak-qaaeq-cai',
    name: 'Motoko Day Drop',
    slug: 'motoko',
    thumbnail: 'https://i.imgur.com/nXliJJb.png',
    featured: true,
    dgdg: 'motokos'
  },
  {
    id: 'zvycl-fyaaa-aaaah-qckmq-cai',
    name: 'ICApes',
    slug: 'icapes',
    thumbnail:
      'https://zvycl-fyaaa-aaaah-qckmq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=wnoum-dakor-uwiaa-aaaaa-b4ast-eaqca-aaeig-q',
    featured: true,
    dgdg: 'apes'
  },
  {
    id: '3mttv-dqaaa-aaaah-qcn6q-cai',
    name: 'Dfinity Space Apes',
    slug: 'spaceapes',
    thumbnail: 'https://i.imgur.com/OCGxNkS.png',
    featured: true,
    dgdg: 'dsa'
  },
  {
    id: 'unssi-hiaaa-aaaah-qcmya-cai',
    name: 'ICPets',
    slug: 'icpets',
    thumbnail: 'https://imgur.com/jqYNvsk.png',
    featured: true,
    dgdg: 'pets'
  },
  {
    id: 'z7mqv-liaaa-aaaah-qcnqa-cai',
    name: 'ICircle',
    slug: 'icircle',
    thumbnail:
      'https://z7mqv-liaaa-aaaah-qcnqa-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=y4zxu-aikor-uwiaa-aaaaa-b4atm-aaqca-aaa6w-a',
    featured: true,
    dgdg: 'icircle'
  },
  {
    id: 'pk6rk-6aaaa-aaaae-qaazq-cai',
    name: 'BTC Flower',
    slug: 'btcflower',
    thumbnail: 'https://i.imgur.com/Q14lZ1h.png',
    featured: true,
    dgdg: 'flowers'
  },
  {
    id: 'jeghr-iaaaa-aaaah-qco7q-cai', // wrapped
    name: 'ICTurtles (Wrapped)',
    slug: 'icturtles',
    thumbnail: 'https://i.imgur.com/3ig1Rx3.png',
    featured: false,
    dgdg: 'turtles'
  },
  {
    id: 'erpx2-pyaaa-aaaah-qcqsq-cai',
    name: 'Voxel Assassins!!!',
    slug: 'frogvoxel',
    thumbnail:
      'https://erpx2-pyaaa-aaaah-qcqsq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=373wy-5qkor-uwiaa-aaaaa-b4aue-uaqca-aaaep-q',
    featured: false,
    dgdg: 'voxels'
  },
  {
    id: 'bkvll-jiaaa-aaaah-qcqnq-cai',
    name: '2D Assassins!!!',
    slug: 'frog2d',
    thumbnail:
      'https://bkvll-jiaaa-aaaah-qcqnq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=xorlj-uakor-uwiaa-aaaaa-b4aud-maqca-aaahn-q',
    featured: false,
    dgdg: 'fn2ds'
  },
  {
    id: 'jmuqr-yqaaa-aaaaj-qaicq-cai',
    name: 'ICP Squad',
    slug: 'icpsquad',
    thumbnail:
      'https://jmuqr-yqaaa-aaaaj-qaicq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=qmwri-sikor-uwiaa-aaaaa-cmaca-uaqca-aaauf-q',
    featured: false
    // dgdg: false,
  },
  {
    id: 'njgly-uaaaa-aaaah-qb6pa-cai',
    name: 'ICPuppies',
    slug: 'icpuppies',
    thumbnail:
      'https://njgly-uaaaa-aaaah-qb6pa-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=me6mq-dakor-uwiaa-aaaaa-b4apt-yaqca-aaemf-q',
    featured: false,
    dgdg: 'puppies'
  },
  {
    id: 'v3zkd-syaaa-aaaah-qcm5a-cai',
    name: 'IC Kitties',
    slug: 'ickitties',
    thumbnail:
      'https://v3zkd-syaaa-aaaah-qcm5a-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=sppfz-fqkor-uwiaa-aaaaa-b4ath-iaqca-aaabu-a',
    featured: false,
    dgdg: 'kitties'
  },
  {
    id: 'bzsui-sqaaa-aaaah-qce2a-cai',
    name: 'Poked bots',
    slug: 'poked',
    thumbnail:
      'https://bzsui-sqaaa-aaaah-qce2a-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=5xgg5-uykor-uwiaa-aaaaa-b4arg-qaqca-aabah-a',
    featured: false,
    dgdg: 'bots'
  },
  {
    id: 'e3izy-jiaaa-aaaah-qacbq-cai',
    name: 'Cronic Critters',
    slug: 'cronics',
    thumbnail: 'https://i.imgur.com/bkJSAbx.png',
    featured: false
    // dgdg: null
  },
  {
    id: 'nbg4r-saaaa-aaaah-qap7a-cai',
    name: 'Starverse',
    slug: 'starverse',
    thumbnail:
      'https://nbg4r-saaaa-aaaah-qap7a-cai.raw.ic0.app/?tokenid=er6r4-hakor-uwiaa-aaaaa-b4ad7-yaqca-aaciz-a',
    featured: false
    // dgdg: null
  },
  {
    id: 'txr2a-fqaaa-aaaah-qcmkq-cai',
    name: 'Meme Cake',
    slug: 'memecake',
    thumbnail:
      'https://txr2a-fqaaa-aaaah-qcmkq-cai.raw.ic0.app/?tokenid=2mm2g-jqkor-uwiaa-aaaaa-b4atc-uaqca-aaajg-q',
    featured: false,
    dgdg: 'memes'
  },
  {
    id: 'gyuaf-kqaaa-aaaah-qceka-cai',
    name: 'Infernal Vampire Colony',
    slug: 'ivc',
    thumbnail:
      'https://gyuaf-kqaaa-aaaah-qceka-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=r3bxl-bykor-uwiaa-aaaaa-b4arc-qaqca-aaaal-q',
    featured: false,
    dgdg: 'vampires'
  }
  // {
  //   id: 'f2yud-3iaaa-aaaaf-qaehq-cai',
  //   name: 'ICPBunny',
  //   slug: 'icpbunny',
  //   thumbnail: 'https://efqhu-yqaaa-aaaaf-qaeda-cai.raw.ic0.app/Token/0',
  //   featured: false
  //   // dgdg: false,
  // },
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
