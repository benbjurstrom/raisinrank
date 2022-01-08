import { Box, Card } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { NavLink as RouterLink } from 'react-router-dom'

import { Canister } from '../utils/canisterResolver'
import Label from './Label'

type ShopProductCardProps = {
  canister: Canister
}

export default function CanisterCard({ canister }: ShopProductCardProps) {
  const theme = useTheme()

  const ProductImgStyle = styled('img')(() => ({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: theme.shape.borderRadiusMd
  }))

  return (
    <Card component={RouterLink} to={`/${canister.slug}`}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          color={'primary'}
          sx={{
            bottom: 16,
            left: 16,
            zIndex: 9,
            position: 'absolute'
          }}
        >
          {canister.slug}
        </Label>
        <ProductImgStyle src={canister.thumbnail} />
      </Box>
    </Card>
  )
}
