// material
import LoadingButton from '@mui/lab/LoadingButton'
import { Container, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'
import { useParams } from 'react-router-dom'

// components
import Info2 from '../components/elements/Info2'
import HodlesList from '../components/HodlesList'
import Page from '../components/Page'
import { db } from '../db'
import useSettings from '../hooks/useSettings'
import { getCanisterFromSlug } from '../utils/canisterResolver'
import { HodleCollection, updateHodles } from '../utils/updateHodles'

export default function Hodlers() {
  const { themeStretch } = useSettings()
  const { collection } = useParams()
  const canister = getCanisterFromSlug(collection)

  const hodles = useLiveQuery(() => {
    return db.hodles
      .orderBy('tokenIndex')
      .filter((hodle) => {
        return hodle.canisterId === canister.id
      })
      .toArray()
  })

  const [loadingHodles, setLoadingHodles] = React.useState(false)

  async function handleLoadHodles() {
    setLoadingHodles(true)
    await updateHodles(canister.id)
    setLoadingHodles(false)
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

  const hodleCollection = hodles
    .reduce<HodleCollection[]>((acc, { ownerId }) => {
      // Check if there exist an object in empty array whose CategoryId matches
      let isElemExist = acc.findIndex(function (item: HodleCollection) {
        return item.ownerId === ownerId
      })

      if (isElemExist === -1) {
        let obj: HodleCollection = {
          ownerId: ownerId,
          count: 1
        }
        acc.push(obj)
      } else {
        acc[isElemExist].count += 1
      }
      return acc
    }, [])
    .sort((a, b) => b.count - a.count)

  if (!hodleCollection)
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

  return (
    <Page title={`${canister.name} - Hodlers | RaisinRank.com`}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h3" component="h1" paragraph>
            Hodlers
          </Typography>
          <Stack direction="row" spacing={3}>
            <LoadingButton loading={loadingHodles} variant="contained" onClick={handleLoadHodles}>
              Update Hodlers
            </LoadingButton>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid container item spacing={2} xs={12} sm={4}>
              <Grid item xs={12}>
                <Info2 data={hodleCollection.length} description={'Total Hodlers'} />
              </Grid>
              {/*<Grid item xs={12}>*/}
              {/*  <Info2*/}
              {/*    data={Math.floor((totalVolume / 100000000) * 100) / 100}*/}
              {/*    description={'Total Volume'}*/}
              {/*  />*/}
              {/*</Grid>*/}
            </Grid>
            <Grid item xs={12} sm={4}>
              {/*{transactionsChart ? (*/}
              {/*  <ChartBar*/}
              {/*    data={transactionsChart}*/}
              {/*    title="Transaction history"*/}
              {/*    xTitle="Date Range"*/}
              {/*    yTitle="Total Transactions"*/}
              {/*  />*/}
              {/*) : (*/}
              {/*  ''*/}
              {/*)}*/}
            </Grid>
            <Grid item xs={12} sm={4}>
              {/*{volumeChart ? (*/}
              {/*  <ChartBar*/}
              {/*    data={volumeChart}*/}
              {/*    title="Transaction volume"*/}
              {/*    xTitle="Date Range"*/}
              {/*    yTitle="Volume in ICP"*/}
              {/*  />*/}
              {/*) : (*/}
              {/*  ''*/}
              {/*)}*/}
            </Grid>
          </Grid>
          <HodlesList hodleCollection={hodleCollection} />
        </Stack>
      </Container>
    </Page>
  )
}
