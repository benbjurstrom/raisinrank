// material
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Container, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'
import { useParams } from 'react-router-dom'

// components
import Info1 from '../components/elements/Info1'
import HodleCard from '../components/HodleCard'
import Page from '../components/Page'
import { db } from '../db'
import useSettings from '../hooks/useSettings'
import { getCanisterFromSlug } from '../utils/canisterResolver'
import { deleteHodles, updateHodles } from '../utils/updateHodles'
// hooks

// ----------------------------------------------------------------------

export default function HodlerDetails() {
  const { themeStretch } = useSettings()
  const { collection } = useParams()
  const canister = getCanisterFromSlug(collection)
  const accountId = '6e8c68ac947d6d42f6fe3bde87672d9cea43c1e851de7bad1f013913bb23315d'

  const hodles = useLiveQuery(() => {
    return db.hodles
      .orderBy('tokenIndex')
      .filter((hodle) => {
        return hodle.canisterId === canister.id && hodle.ownerId === accountId
      })
      .limit(100)
      .toArray()
  })

  const ownersCount = useLiveQuery(() => {
    return db.hodles
      .orderBy('ownerId')
      .filter((hodle) => {
        return hodle.canisterId === canister.id
      })
      .uniqueKeys(function (keysArray: any) {
        return keysArray.length
      })
  })

  const [loadingHodles, setLoadingHodles] = React.useState(false)
  const [deletingHodles, setDeletingHodles] = React.useState(false)

  async function handleLoadHodles() {
    setLoadingHodles(true)
    await updateHodles(canister.id)
    setLoadingHodles(false)
  }

  async function handleDeleteHodles() {
    setDeletingHodles(true)
    await deleteHodles(canister.id)
    setDeletingHodles(false)
  }

  if (!hodles)
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

  interface Group {
    ownerId: string
    count: number
  }

  return (
    <Page title={`${canister.name} - Hodlers | RaisinRank.com`}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack spacing={3}>
          <Typography variant="h3" component="h1" paragraph>
            Ownership Records
          </Typography>
          <Stack direction="row" spacing={3}>
            <Info1 data={ownersCount ?? 0} description={'Total Owners'} />
            <Info1 data={hodles.length ?? 0} description={'Current Owner Count'} />
          </Stack>
          <Stack direction="row" spacing={3}>
            <LoadingButton loading={loadingHodles} variant="contained" onClick={handleLoadHodles}>
              Update Hodles
            </LoadingButton>
            <LoadingButton
              loading={deletingHodles}
              variant="contained"
              onClick={handleDeleteHodles}
            >
              Delete Hodles
            </LoadingButton>
          </Stack>
          <Box>
            <Grid container spacing={3}>
              {hodles.map((hodle) => (
                <Grid key={hodle.id} item xs={12} sm={6} md={3}>
                  <HodleCard hodle={hodle} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Page>
  )
}
