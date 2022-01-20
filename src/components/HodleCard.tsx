// material
import { Box, Card } from '@mui/material'

import { Hodle, Listing, Transaction } from '../db'
import { getIcpTwoDecimals } from '../utils/helpers'
import Image1 from './elements/Image1'
import Label from './Label'

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
        <Image1 tokenIndex={hodle.tokenIndex} tokenId={hodle.tokenId} />
      </Box>
    </Card>
  )
}
