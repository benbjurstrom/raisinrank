// material
import { Box, Container, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Canisters } from '../../../utils/canisterResolver'
//
import CanisterCard from '../../CanisterCard'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}))

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  const unfeaturedCanisters = Canisters.filter((canister) => {
    return canister.featured === false
  })

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 25 } }}>
          <Grid container spacing={2}>
            {unfeaturedCanisters.map((canister) => (
              <Grid key={canister.id} item xs={4} md={3} lg={2}>
                <CanisterCard canister={canister} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </RootStyle>
  )
}
