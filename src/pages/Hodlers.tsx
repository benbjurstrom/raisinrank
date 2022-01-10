// material
import LoadingButton from '@mui/lab/LoadingButton'
import { Container, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { ChartBar } from '../components/charts'
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

  useEffect(() => {
    setLoadingHodles(true)
    updateHodles(canister.id).then(function () {
      setLoadingHodles(false)
    })
  }, [canister.id])

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

  const chart = hodleCollection.reduce(
    function (acc, owner) {
      const x = owner.count
      switch (true) {
        case x === 1:
          acc[0].y += 1
          break
        case x < 5:
          acc[1].y += 1
          break
        case x < 10:
          acc[2].y += 1
          break
        case x < 20:
          acc[3].y += 1
          break
        case x < 50:
          acc[4].y += 1
          break
        case x < 100:
          acc[5].y += 1
          break
        default:
          acc[6].y += 1
          break
      }
      return acc
    },
    [
      {
        x: '1',
        y: 0
      },
      {
        x: '< 5',
        y: 0
      },
      {
        x: '< 10',
        y: 0
      },
      {
        x: '< 20',
        y: 0
      },
      {
        x: '< 50',
        y: 0
      },
      {
        x: '< 100',
        y: 0
      },
      {
        x: '100+',
        y: 0
      }
    ]
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
                <Info2
                  data={hodleCollection.length}
                  description={`Unique accounts holding ${canister.slug}`}
                />
              </Grid>
              {/*<Grid item xs={12}>*/}
              {/*  <Info2*/}
              {/*    data={Math.floor((totalVolume / 100000000) * 100) / 100}*/}
              {/*    description={'Total Volume'}*/}
              {/*  />*/}
              {/*</Grid>*/}
            </Grid>
            <Grid item xs={12} sm={8}>
              <ChartBar
                data={chart}
                title={`Breakdown`}
                xTitle={`# of ${canister.slug} held`}
                yTitle="# of Accounts"
                hoverText="Number of accounts"
              />
            </Grid>
          </Grid>
          <HodlesList hodleCollection={hodleCollection} />
        </Stack>
      </Container>
    </Page>
  )
}
