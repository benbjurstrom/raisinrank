import { Link, Theme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import React from 'react'
import { useParams } from 'react-router-dom'

import { getCanisterFromSlug } from '../../utils/canisterResolver'

type Props = {
  tokenIndex: number
  tokenId: string
  sx?: SxProps<Theme>
}

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')(() => ({
  top: 0,
  width: '100%',
  height: '100%',
  position: 'absolute'
}))

const TurtleEmbedStyle = styled('embed')(() => ({
  top: '-16px',
  width: '100%',
  height: '100%',
  objectFit: 'fill',
  position: 'absolute'
}))

// ----------------------------------------------------------------------

const Image1 = ({ tokenIndex, tokenId, sx }: Props): JSX.Element => {
  const { collection } = useParams()
  const canister = getCanisterFromSlug(collection)

  if (canister.slug === 'icturtles') {
    return (
      <TurtleEmbedStyle src={'https://fl5nr-xiaaa-aaaai-qbjmq-cai.raw.ic0.app/nft/' + tokenIndex} />
    )
  }

  if (canister.slug === 'btcflower') {
    return (
      <Link
        component={'a'}
        target="_blank"
        rel="noreferrer"
        href={`https://entrepot.app/marketplace/asset/${tokenId}`}
      >
        <ProductImgStyle
          alt={tokenId}
          src={`https://7budn-wqaaa-aaaah-qcsba-cai.raw.ic0.app/?tokenid=${tokenId}`}
        />
      </Link>
    )
  }

  return (
    <Link
      component={'a'}
      target="_blank"
      rel="noreferrer"
      href={`https://entrepot.app/marketplace/asset/${tokenId}`}
    >
      <ProductImgStyle
        alt={tokenId}
        src={`https://${canister.id}.raw.ic0.app/?cc=0&type=thumbnail&tokenid=${tokenId}`}
      />
    </Link>
  )
}

export default Image1
