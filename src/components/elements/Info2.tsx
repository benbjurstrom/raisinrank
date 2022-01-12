// material
import InfoIcon from '@mui/icons-material/Info'
import { Box, Card, Stack, Tooltip, Typography } from '@mui/material'
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
  tooltip?: string
}

const Info2 = ({ data, description, tooltip }: Props): JSX.Element => {
  let display = data.toString()
  if (data === 100) {
    display = '100+'
  }

  return (
    <RootStyle>
      <div>
        <Typography variant="h3">{display}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            {description}{' '}
          </Typography>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoIcon sx={{ height: 18, width: 18 }} />
            </Tooltip>
          )}
        </Stack>
      </div>
      <Box
        sx={{
          width: 10,
          height: 120
        }}
      />
    </RootStyle>
  )
}

export default Info2
