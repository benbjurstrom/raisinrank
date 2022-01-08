// material
import { Box, Card, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Sale } from '../db'
import ColorPreview from './ColorPreview'
import DateTime1 from './elements/DateTime1'
import Price1 from './elements/Price1'
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

type SaleCardProps = {
  sale: Sale
}

export default function SaleCard({ sale }: SaleCardProps) {
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
          {sale.tokenIndex}
        </Label>
        <ProductImgStyle
          alt={sale.tokenId}
          src={`https://${sale.canisterId}.raw.ic0.app/?cc=0&type=thumbnail&tokenid=${sale.tokenId}`}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          <DateTime1 dateString={sale.soldAt} />
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={['#00AB55', '#000000']} />
          <Typography variant="subtitle1">
            <Price1 price={sale.price} />
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}
