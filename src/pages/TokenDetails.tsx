// material
import LoadingButton from '@mui/lab/LoadingButton'
import { Card, Container, Divider, Grid, Link, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { Box } from '@mui/system'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Blockie from '../components/elements/Blockie'
import Image1 from '../components/elements/Image1'
// components
import Page from '../components/Page'
import TransactionList from '../components/TransactionList'
import { db } from '../db'
import useSettings from '../hooks/useSettings'
import { getCanisterFromSlug } from '../utils/canisterResolver'
import { updateHodles } from '../utils/updateHodles'
// hooks

// ----------------------------------------------------------------------

export default function TokenDetails() {
  const { themeStretch } = useSettings()
  const { collection, tokenIndex } = useParams()
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

  const hodle = useLiveQuery(() => {
    return db.hodles
      .filter((hodle) => {
        return hodle.canisterId === canister.id && hodle.tokenIndex === Number(tokenIndex)
      })
      .first()
  })

  const transactions = useLiveQuery(() => {
    return db.transactions
      .orderBy('soldAt')
      .filter((transaction) => {
        return (
          transaction.canisterId === canister.id && transaction.tokenIndex === Number(tokenIndex)
        )
      })
      .reverse()
      .toArray()
  })

  const listing = useLiveQuery(() => {
    return db.listings
      .orderBy('timestamp')
      .filter((listing) => {
        return listing.canisterId === canister.id && listing.tokenIndex === Number(tokenIndex)
      })
      .reverse()
      .first()
  })

  if (!hodle) {
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
    <Page title={`${canister.name} - Token Details | RaisinRank.com`}>
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
              <Blockie canister={canister} address={hodle.ownerId} />
              <Typography
                sx={{ display: 'block', maxWidth: 150 }}
                variant="h6"
                component="h6"
                noWrap
              >
                {hodle.ownerId}
              </Typography>
            </Stack>
          </Box>
          <Stack direction="row" spacing={3}>
            <LoadingButton loading={loadingHodles} variant="contained" onClick={handleLoadHodles}>
              Update Collection
            </LoadingButton>
          </Stack>
        </Stack>

        <Grid container spacing={6} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <Box sx={{ pt: '100%', position: 'relative' }}>
                <Image1 tokenIndex={hodle.tokenIndex} tokenId={hodle.tokenId} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box>{JSON.stringify(listing, null, 2)}</Box>
            <Divider sx={{ my: 4 }} />
            <Box>
              <Typography variant="h5" component="h5" paragraph>
                Transaction History
              </Typography>
              {transactions ? (
                <TransactionList
                  height={400}
                  canister={canister}
                  transactions={transactions}
                  hideImage={true}
                />
              ) : (
                ''
              )}
            </Box>
            <Divider sx={{ my: 4 }} />
            <Link
              component={'a'}
              href={`https://www.dgastonia.com/nfts/collections/${canister.dgdg}?minMintNumber=${hodle.tokenIndex}&maxMintNumber=${hodle.tokenIndex}`}
              target="_blank"
              rel="noreferrer"
            >
              View in dgdg.app
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}
