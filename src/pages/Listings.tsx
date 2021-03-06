// material
import LoadingButton from '@mui/lab/LoadingButton'
import { Container, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { getTime, parseISO } from 'date-fns'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useState } from 'react'
import React from 'react'
import { useParams } from 'react-router-dom'

import { ChartBar } from '../components/charts'
import Info2 from '../components/elements/Info2'
import ListingCard from '../components/ListingCard'
import Page from '../components/Page'
import { db, Listing } from '../db'
import useSettings from '../hooks/useSettings'
import { getCanisterFromSlug } from '../utils/canisterResolver'
import { getBigListings, getSmallListings } from '../utils/chartData'
import { updateListings } from '../utils/updateListings'

export default function Listings() {
  const [featuredListing, setFeaturedListing] = useState<Listing | undefined>()
  const [featuredListingLoaded, setFeaturedListingLoaded] = useState(false)
  const [loadingListings, setLoadingListings] = React.useState(false)

  const { themeStretch } = useSettings()
  const { collection } = useParams()
  const canister = getCanisterFromSlug(collection)

  const featuredAddress =
    canister.slug === 'icturtles'
      ? 'hjvln-qnfwp-v5pc4-dvjdu-zkobb-q2utz-fy5yn-jxlfx-7gpdw-ggegz-nae'
      : '5sxqr-iv2ti-d4ouq-js3al-ahkwd-v33kq-jnaql-nwryx-25axg-dajho-mae'

  const listings = useLiveQuery(() => {
    return db.listings
      .orderBy('timestamp')
      .filter((listing) => {
        const anHourAgo = Date.now() - 1000 * 60 * 60
        const date = parseISO(listing.timestamp)
        return listing.canisterId === canister.id && getTime(date) > anHourAgo
      })
      .limit(100)
      .reverse()
      .toArray()
  })

  const featuredListings = useLiveQuery(() => {
    return db.listings
      .orderBy('timestamp')
      .filter((listing) => {
        return listing.canisterId === canister.id && listing.sellerId === featuredAddress
      })
      .limit(50)
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
    if (!featuredListings || featuredListings.length < 1 || featuredListingLoaded) return

    setFeaturedListing(featuredListings[Math.floor(Math.random() * featuredListings.length)])
    setFeaturedListingLoaded(true)
  }, [featuredListings, featuredListingLoaded])

  async function handleLoadListings() {
    setLoadingListings(true)
    await updateListings(canister.id)
    setLoadingListings(false)
  }

  useEffect(() => {
    setLoadingListings(true)
    updateListings(canister.id).then(function () {
      setLoadingListings(false)
    })
  }, [canister.id])

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

  let chart = null
  if (allListings) {
    chart =
      canister.slug === 'btcflower' ? getBigListings(allListings) : getSmallListings(allListings)
  }

  return (
    <Page title={`${canister.name} - Recent Listings | RaisinRank.com`}>
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
          </Stack>
        </Stack>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid container item spacing={2} xs={12} sm={4}>
            <Grid item xs={12}>
              <Info2 data={allListings?.length ?? 0} description={'Total Listings'} />
            </Grid>
            <Grid item xs={12}>
              <Info2
                data={listings?.length ?? 0}
                description={'Recent Updates'}
                tooltip="Listings added or modified in the last hour. NOTE: Entrepot does not associate a time or date to its listing records. Therefore, recent listings are determined by comparing the current market listings with a copy saved in your browser."
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8}>
            {chart ? (
              <ChartBar data={chart} title="Market Depth (Listings)" hoverText="Listings" />
            ) : (
              ''
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {featuredListing ? (
            <Grid key={featuredListing.id} item xs={12} sm={6} md={3} xl={2}>
              <ListingCard canister={canister} listing={featuredListing} featured />
            </Grid>
          ) : (
            ''
          )}
          {listings.map((listing) => (
            <Grid key={listing.id} item xs={12} sm={6} md={3} xl={2}>
              <ListingCard canister={canister} listing={listing} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  )
}
