// material
import { Box, Card, ListItemIcon, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3)
}))

// ----------------------------------------------------------------------

type Props = {
  data: number
  description: string
}

const Info1 = ({ data, description }: Props): JSX.Element => {
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">{data}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral'
        }}
      >
        <ListItemIcon />
      </Box>
    </RootStyle>
  )
}

export default Info1
