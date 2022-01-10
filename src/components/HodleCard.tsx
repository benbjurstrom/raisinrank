// material
import { Box, Card } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Hodle } from '../db'
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

type HodleCardProps = {
  hodle: Hodle
}

export default function HodleCard({ hodle }: HodleCardProps) {
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
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
