// material
import LoadingButton from '@mui/lab/LoadingButton'
import { Container, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { Box } from '@mui/system'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Blockie from '../components/elements/Blockie'
// components
import Info2 from '../components/elements/Info2'
import HodleCard from '../components/HodleCard'
import HodlePetTypes from '../components/HodlePetTypes'
import HodlePlanetTypes from '../components/HodlePlanetTypes'
import Page from '../components/Page'
import { db } from '../db'
import useSettings from '../hooks/useSettings'
import { getCanisterFromSlug } from '../utils/canisterResolver'
import { updateHodles } from '../utils/updateHodles'
// hooks

// ----------------------------------------------------------------------

export default function HodlerDetails() {
  const { themeStretch } = useSettings()
  const { collection, account } = useParams()
  const canister = getCanisterFromSlug(collection)

  const [loadingHodles, setLoadingHodles] = React.useState(false)

  async function handleLoadHodles() {
    setLoadingHodles(true)
    await updateHodles(canister.id)
    setLoadingHodles(false)
  }

  useEffect(() => {
    setLoadingHodles(true)
    updateHodles(canister.id).then(function () {
      setLoadingHodles(false)
    })
  }, [canister.id])

  const hodles = useLiveQuery(() => {
    return db.hodles
      .orderBy('tokenIndex')
      .filter((hodle) => {
        return hodle.canisterId === canister.id && hodle.ownerId === account
      })
      .toArray()
  })

  if (!hodles) {
    return (
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography
          sx={{
            color: 'text.primary'
          }}
        >
          Loading...
        </Typography>
      </Container>
    )
  }

  return (
    <Page title={`${canister.name} - Wallet Collection | RaisinRank.com`}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <Typography variant="h3" component="h1">
              {canister.name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={3}>
              {account ? <Blockie address={account} /> : ''}
              <Typography
                sx={{ display: 'block', maxWidth: 150 }}
                variant="h6"
                component="h6"
                noWrap
              >
                {account}
              </Typography>
            </Stack>
          </Box>
          <Stack direction="row" spacing={3}>
            <LoadingButton loading={loadingHodles} variant="contained" onClick={handleLoadHodles}>
              Update Collection
            </LoadingButton>
          </Stack>
        </Stack>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid container item spacing={2} xs={12} sm={4}>
            <Grid item xs={12}>
              <Info2 data={hodles.length} description={canister.name} />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8}>
            {canister.slug === 'spaceapes' ? <HodlePlanetTypes hodles={hodles} /> : ''}
            {canister.slug === 'icpets' ? <HodlePetTypes hodles={hodles} /> : ''}
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {hodles.map((hodle) => (
            <Grid key={hodle.id} item xs={12} sm={6} md={3} xl={2}>
              <HodleCard hodle={hodle} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  )
}
