// material
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Container, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { getTime, getUnixTime, parseISO } from 'date-fns'
import { useLiveQuery } from 'dexie-react-hooks'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import React from 'react'
import { useParams } from 'react-router-dom'

// components
import { ChartBar } from '../components/charts'
import Info2 from '../components/elements/Info2'
import ListingCard from '../components/ListingCard'
import Page from '../components/Page'
import { db, Listing } from '../db'
import useSettings from '../hooks/useSettings'
import { getCanisterFromSlug } from '../utils/canisterResolver'
import { deleteListings, updateListings } from '../utils/updateListings'
// hooks

// ----------------------------------------------------------------------

export default function Listings() {
  const [featuredListing, setFeaturedListing] = useState<Listing | undefined>()
  const [loadingListings, setLoadingListings] = React.useState(false)
  const [deletingListings, setDeletingListings] = React.useState(false)

  const { themeStretch } = useSettings()
  const { collection } = useParams()
  const canister = getCanisterFromSlug(collection)

  let listings = useLiveQuery(() => {
    return db.listings
      .orderBy('timestamp')
      .filter((listing) => {
        const anHourAgo = Date.now() - 1000 * 60 * 60
        const date = parseISO(listing.timestamp)
        return listing.canisterId === canister.id && getTime(date) > anHourAgo
      })
      .limit(200)
      .reverse()
      .toArray()
  })

  const allListings = useLiveQuery(() => {
    return db.listings
      .filter((listing) => {
        return listing.canisterId === canister.id
      })
      .toArray()
  })

  useEffect(() => {
    if (!listings) return
    setFeaturedListing(listings[Math.floor(Math.random() * listings.length)])
  }, [listings?.length])

  if (!listings)
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

  async function handleLoadListings() {
    setLoadingListings(true)
    await updateListings(canister.id)
    setLoadingListings(false)
  }

  async function handleDeleteListings() {
    setDeletingListings(true)
    await deleteListings(canister.id)
    setDeletingListings(false)
  }

  let chart = null
  if (allListings) {
    chart = allListings.reduce(
      function (acc, listing) {
        const x = Number(listing.price) / 100000000
        switch (true) {
          case x < 1:
            acc[0].y += 1
            break
          case x < 1.5:
            acc[1].y += 1
            break
          case x < 2:
            acc[2].y += 1
            break
          case x < 5:
            acc[3].y += 1
            break
          case x < 10:
            acc[4].y += 1
            break
          case x < 20:
            acc[5].y += 1
            break
          case x < 50:
            acc[6].y += 1
            break
          case x < 100:
            acc[7].y += 1
            break
          default:
            acc[8].y += 1
            break
        }
        return acc
      },
      [
        {
          x: '< 1',
          y: 0
        },
        {
          x: '< 1.5',
          y: 0
        },
        {
          x: '< 2',
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

    console.log(chart)
  }

  return (
    <Page title="Page One | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h3" component="h1" paragraph>
            Recent Listings
          </Typography>
          <Stack direction="row" spacing={3}>
            <LoadingButton
              loading={loadingListings}
              variant="contained"
              onClick={handleLoadListings}
            >
              Update Listings
            </LoadingButton>
            <LoadingButton
              loading={deletingListings}
              variant="contained"
              onClick={handleDeleteListings}
            >
              Delete Listings
            </LoadingButton>
          </Stack>
        </Stack>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid container item spacing={3} xs={12} sm={6}>
            <Grid item xs={12} sm={6}>
              <Info2 data={allListings?.length ?? 0} description={'Total Listings'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Info2
                data={listings?.length ?? 0}
                description={'Recent Updates'}
                tooltip="Number of updates in the last hour to your browser's copy of the canister's listings"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            {chart ? <ChartBar data={chart} /> : ''}
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {featuredListing ? (
            <Grid key={featuredListing.id} item xs={12} sm={6} md={3} xl={2}>
              <ListingCard listing={featuredListing} featured />
            </Grid>
          ) : (
            ''
          )}
          {listings.map((listing) => (
            <Grid key={listing.id} item xs={12} sm={6} md={3} xl={2}>
              <ListingCard listing={listing} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  )
}
