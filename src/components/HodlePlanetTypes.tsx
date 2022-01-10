import React from 'react'

import { Hodle } from '../db'
import tokens from '../utils/spaceapesMeta.json'
import { ChartBar } from './charts'

type HodlesPlanetTypesProps = {
  hodles: Hodle[]
}

export default function HodlePlanetTypes({ hodles }: HodlesPlanetTypesProps) {
  const chart = hodles.reduce(
    function (acc, hodle) {
      const token = tokens.find((token) => token.id === hodle.tokenIndex)
      if (!token) {
        console.log(hodle.tokenIndex)
        return acc
      }
      switch (token['0']) {
        case 0:
          acc[0].y += 1
          break
        case 1:
          acc[1].y += 1
          break
        case 2:
          acc[2].y += 1
          break
        case 3:
          acc[3].y += 1
          break
        case 4:
          acc[4].y += 1
          break
        case 5:
          acc[5].y += 1
          break
        case 6:
          acc[6].y += 1
          break
        case 7:
          acc[7].y += 1
          break
        case 8:
          acc[8].y += 1
          break
        case 9:
          acc[9].y += 1
          break
        case 10:
          acc[10].y += 1
          break
      }

      return acc
    },
    [
      {
        x: 'Legendary',
        y: 0
      },
      {
        x: 'Galaxy',
        y: 0
      },
      {
        x: 'Desertal',
        y: 0
      },
      {
        x: 'Firewall',
        y: 0
      },
      {
        x: 'Forestpump',
        y: 0
      },
      {
        x: 'Techno',
        y: 0
      },
      {
        x: 'Seasharp',
        y: 0
      },
      {
        x: 'Iceshot',
        y: 0
      },
      {
        x: 'Pixel',
        y: 0
      },
      {
        x: 'Gaswar',
        y: 0
      },
      {
        x: 'Canister',
        y: 0
      }
    ]
  )

  return <ChartBar data={chart} title="Planet Stats" />
}
