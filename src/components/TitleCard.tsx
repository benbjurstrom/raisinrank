// material
import { Box, Card, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Title } from '../db'
import ColorPreview from './ColorPreview'
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

type TitleCardProps = {
  title: Title
}

export default function TitleCard({ title }: TitleCardProps) {
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
          {title.tokenIndex}
        </Label>
        <ProductImgStyle
          alt={title.tokenId}
          src={`https://${title.canisterId}.raw.ic0.app/?cc=0&type=thumbnail&tokenid=${title.tokenId}`}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          test
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={['#00AB55', '#000000']} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              <span>Something</span>
            </Typography>
            &nbsp;
            <span>Else</span>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}
