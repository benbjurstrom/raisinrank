import React from 'react'

import { Hodle } from '../db'
import tokens from '../utils/petsMeta.json'
import { ChartBar } from './charts'

type HodlePetTypesProps = {
  hodles: Hodle[]
}

export default function HodlePetTypes({ hodles }: HodlePetTypesProps) {
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
      }

      return acc
    },
    [
      {
        x: 'Raccoon',
        y: 0
      },
      {
        x: 'Hamster',
        y: 0
      },
      {
        x: 'Penguin',
        y: 0
      }
    ]
  )

  return <ChartBar data={chart} title="Type of pets" hoverText="Pet count" />
}
