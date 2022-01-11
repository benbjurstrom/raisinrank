// material
import StarsIcon from '@mui/icons-material/Stars'
import { Box, Card, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Listing } from '../db'
import { Canister } from '../utils/canisterResolver'
import Blockie from './elements/Blockie'
import DateTime2 from './elements/DateTime2'
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

type ListingCardProps = {
  listing: Listing
  featured?: Boolean
  canister: Canister
}

export default function ListingCard({ listing, featured, canister }: ListingCardProps) {
  let featuredStyle = {}
  if (featured) {
    featuredStyle = {
      borderColor: 'primary.main',
      border: 1
    }
  }

  return (
    <Card sx={{ height: '100%', ...featuredStyle }}>
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
          {listing.tokenIndex}
        </Label>
        <ProductImgStyle
          alt={listing.tokenId}
          src={`https://${listing.canisterId}.raw.ic0.app/?cc=0&type=thumbnail&tokenid=${listing.tokenId}`}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }} justifyContent="space-between">
        <Typography variant="subtitle2" noWrap component="div">
          {featured ? <span>Featured listing</span> : <DateTime2 dateString={listing.timestamp} />}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {featured ? (
            <StarsIcon />
          ) : (
            <Blockie
              canister={canister}
              sx={{ width: 24, height: 24 }}
              address={listing.sellerId}
            />
          )}
          <Typography variant="subtitle1">
            {listing.historicPrice && !featured ? (
              <Typography
                component="div"
                variant="body2"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through'
                }}
              >
                <Price1 price={listing.historicPrice} />
              </Typography>
            ) : (
              <div>&nbsp;</div>
            )}
            <Price1 price={listing.price} />
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}
