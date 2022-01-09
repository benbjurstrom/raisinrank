// material
import LoadingButton from '@mui/lab/LoadingButton'
import { Container, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { differenceInHours, parseISO } from 'date-fns'
import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { ChartBar } from '../components/charts'
import Info2 from '../components/elements/Info2'
import Page from '../components/Page'
import TransactionList from '../components/TransactionList'
import { db } from '../db'
import useSettings from '../hooks/useSettings'
import { getCanisterFromSlug } from '../utils/canisterResolver'
import { updateTransactions } from '../utils/updateTransactions'

// ----------------------------------------------------------------------

export default function Transactions() {
  const { themeStretch } = useSettings()
  const { collection } = useParams()
  const canister = getCanisterFromSlug(collection)

  const [loadingTransactions, setLoadingTransactions] = React.useState(false)

  const transactions = useLiveQuery(() => {
    return db.transactions
      .orderBy('soldAt')
      .filter((transaction) => {
        return transaction.canisterId === canister.id
      })
      .reverse()
      .toArray()
  })

  async function handleLoadTransactions() {
    setLoadingTransactions(true)
    await updateTransactions(canister.id)
    setLoadingTransactions(false)
  }

  useEffect(() => {
    setLoadingTransactions(true)
    updateTransactions(canister.id).then(function () {
      setLoadingTransactions(false)
    })
  }, [canister.id])

  if (!transactions)
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

  const increments = [
    {
      x: '< 1 hour',
      y: 0
    },
    {
      x: '< 6 hours',
      y: 0
    },
    {
      x: '< 1 day',
      y: 0
    },
    {
      x: '< 7 days',
      y: 0
    },
    {
      x: '< 30 days',
      y: 0
    },
    {
      x: '< 1 year',
      y: 0
    },
    {
      x: '1 year+',
      y: 0
    }
  ]

  const transactionsChart = transactions.reduce(function (acc, transaction) {
    const hoursAgo = differenceInHours(Date.now(), parseISO(transaction.soldAt))
    switch (true) {
      case hoursAgo < 1:
        acc[0].y += 1
        break
      case hoursAgo < 6:
        acc[1].y += 1
        break
      case hoursAgo < 24:
        acc[2].y += 1
        break
      case hoursAgo < 24 * 7:
        acc[3].y += 1
        break
      case hoursAgo < 24 * 30:
        acc[4].y += 1
        break
      case hoursAgo < 24 * 365:
        acc[5].y += 1
        break
      default:
        acc[6].y += 1
        break
    }
    return acc
  }, increments)

  const totalVolume = transactions.reduce((sum, { price }) => sum + Number(price), 0)

  const volumeChart = transactions
    .reduce(
      function (acc, transaction) {
        const hoursAgo = differenceInHours(Date.now(), parseISO(transaction.soldAt))
        const price = Number(transaction.price)
        switch (true) {
          case hoursAgo < 1:
            acc[0].y += price
            break
          case hoursAgo < 6:
            acc[1].y += price
            break
          case hoursAgo < 24:
            acc[2].y += price
            break
          case hoursAgo < 24 * 7:
            acc[3].y += price
            break
          case hoursAgo < 24 * 30:
            acc[4].y += price
            break
          case hoursAgo < 24 * 365:
            acc[5].y += price
            break
          default:
            acc[6].y += price
            break
        }
        return acc
      },
      [
        {
          x: '< 1 hour',
          y: 0
        },
        {
          x: '< 6 hours',
          y: 0
        },
        {
          x: '< 1 day',
          y: 0
        },
        {
          x: '< 7 days',
          y: 0
        },
        {
          x: '< 30 days',
          y: 0
        },
        {
          x: '< 1 year',
          y: 0
        },
        {
          x: '1 year+',
          y: 0
        }
      ]
    )
    .map(function (increment) {
      return {
        x: increment.x,
        y: Math.floor((increment.y / 100000000) * 100) / 100
      }
    })

  return (
    <Page title={`${canister.name} - Transactions | RaisinRank.com`}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h3" component="h1" paragraph>
            Transaction History
          </Typography>
          <Stack direction="row" spacing={3}>
            <LoadingButton
              loading={loadingTransactions}
              variant="contained"
              onClick={handleLoadTransactions}
            >
              Update Transactions
            </LoadingButton>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid container item spacing={2} xs={12} sm={4}>
              <Grid item xs={12}>
                <Info2 data={transactions.length} description={'Total Transactions'} />
              </Grid>
              <Grid item xs={12}>
                <Info2
                  data={Math.floor((totalVolume / 100000000) * 100) / 100}
                  description={'Total Volume'}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              {transactionsChart ? (
                <ChartBar
                  data={transactionsChart}
                  title="Transaction history"
                  xTitle="Date Range"
                  yTitle="Transactions"
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              {volumeChart ? (
                <ChartBar
                  data={volumeChart}
                  title="Transaction volume"
                  xTitle="Date Range"
                  yTitle="Total ICP"
                />
              ) : (
                ''
              )}
            </Grid>
          </Grid>
          <TransactionList transactions={transactions} />
        </Stack>
      </Container>
    </Page>
  )
}
