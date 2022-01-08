// material
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Container, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'

// components
import Info1 from '../components/elements/Info1'
import Page from '../components/Page'
import TitleCard from '../components/TitleCard'
import { db } from '../db'
import useSettings from '../hooks/useSettings'
import { updateTitles, deleteTitles } from '../utils/updateTitles'
// hooks

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettings()
  const canisterId = 'unssi-hiaaa-aaaah-qcmya-cai'
  const accountId = '6e8c68ac947d6d42f6fe3bde87672d9cea43c1e851de7bad1f013913bb23315d'

  const titles = useLiveQuery(() => {
    return db.titles
      .orderBy('tokenIndex')
      .filter((title) => {
        return title.canisterId === canisterId && title.ownerId === accountId
      })
      .limit(100)
      .toArray()
  })

  const ownersCount = useLiveQuery(() => {
    return db.titles.orderBy('ownerId').uniqueKeys(function (keysArray: any) {
      return keysArray.length
    })
  })

  const [loadingTitles, setLoadingTitles] = React.useState(false)
  const [deletingTitles, setDeletingTitles] = React.useState(false)

  async function handleLoadTitles() {
    setLoadingTitles(true)
    await updateTitles(canisterId)
    setLoadingTitles(false)
  }

  async function handleDeleteTitles() {
    setDeletingTitles(true)
    await deleteTitles(canisterId)
    setDeletingTitles(false)
  }

  if (!titles) return <span>Loading</span>

  return (
    <Page title="Pets | Titles">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack spacing={3}>
          <Typography variant="h3" component="h1" paragraph>
            Ownership Records
          </Typography>
          <Stack direction="row" spacing={3}>
            <Info1 data={ownersCount ?? 0} description={'Total Owners'} />
            <Info1 data={titles.length ?? 0} description={'Current Owner Count'} />
          </Stack>
          <Stack direction="row" spacing={3}>
            <LoadingButton loading={loadingTitles} variant="contained" onClick={handleLoadTitles}>
              Update Titles
            </LoadingButton>
            <LoadingButton
              loading={deletingTitles}
              variant="contained"
              onClick={handleDeleteTitles}
            >
              Delete Titles
            </LoadingButton>
          </Stack>
          <Box>
            <Grid container spacing={3}>
              {titles.map((title) => (
                <Grid key={title.id} item xs={12} sm={6} md={3}>
                  <TitleCard title={title} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Page>
  )
}
