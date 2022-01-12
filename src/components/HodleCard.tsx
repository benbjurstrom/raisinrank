// material
import { Box, Card } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Hodle, Listing, Transaction } from '../db'
import { getIcpTwoDecimals } from '../utils/helpers'
import Label from './Label'

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')(() => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}))

// ----------------------------------------------------------------------

interface HodleDetails extends Hodle {
  transaction?: Transaction
  listing?: Listing
}

type HodleCardProps = {
  hodle: HodleDetails
}

export default function HodleCard({ hodle }: HodleCardProps) {
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {hodle.transaction ? (
          <Label
            variant="filled"
            color={'info'}
            sx={{
              bottom: 16,
              left: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {getIcpTwoDecimals(hodle.transaction.price)}
          </Label>
        ) : (
          ''
        )}
        {hodle.listing ? (
          <Label
            variant="filled"
            color={'info'}
            sx={{
              bottom: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {getIcpTwoDecimals(hodle.listing.price)}
          </Label>
        ) : (
          ''
        )}
        <Label
          variant="filled"
          color={'info'}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            position: 'absolute',
            textTransform: 'uppercase'
          }}
        >
          {hodle.tokenIndex}
        </Label>
        <ProductImgStyle
          alt={hodle.tokenId}
          src={`https://${hodle.canisterId}.raw.ic0.app/?cc=0&type=thumbnail&tokenid=${hodle.tokenId}`}
        />
      </Box>
    </Card>
  )
}
