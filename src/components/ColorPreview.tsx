// material
import { Box, Typography, BoxProps } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
}))

const IconStyle = styled('div')(({ theme }) => ({
  marginLeft: -4,
  borderRadius: '50%',
  width: theme.spacing(2),
  height: theme.spacing(2),
  border: `solid 2px ${theme.palette.background.paper}`,
  boxShadow: `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`
}))

// ----------------------------------------------------------------------

interface ColorPreviewProps extends BoxProps {
  colors: string[]
  limit?: number
}

export default function ColorPreview({ colors, limit = 3, sx }: ColorPreviewProps) {
  const showColor = colors.slice(0, limit)
  const moreColor = colors.length - limit

  return (
    <RootStyle component="span" sx={sx}>
      {showColor.map((color, index) => (
        <IconStyle key={color + index} sx={{ bgcolor: color }} />
      ))}

      {colors.length > limit && <Typography variant="subtitle2">{`+${moreColor}`}</Typography>}
    </RootStyle>
  )
}
