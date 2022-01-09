// material
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Container, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'
import { useParams } from 'react-router-dom'

import Info1 from '../components/elements/Info1'
import Page from '../components/Page'
import SaleCard from '../components/SaleCard'
import { db } from '../db'
import useSettings from '../hooks/useSettings'
import { getCanisterFromSlug } from '../utils/canisterResolver'
import { deleteSales, updateSales } from '../utils/updateSales'

// ----------------------------------------------------------------------

export default function Transactions() {
  const { themeStretch } = useSettings()
  const { collection } = useParams()
  const canister = getCanisterFromSlug(collection)

  const [loadingSales, setLoadingSales] = React.useState(false)
  const [deletingSales, setDeletingSales] = React.useState(false)

  const sales = useLiveQuery(() => {
    return db.sales
      .orderBy('soldAt')
      .filter((sale) => {
        return sale.canisterId === canister.id
      })
      .reverse()
      .limit(100)
      .toArray()
  })

  if (!sales)
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

  const salesCount = sales.length

  async function handleLoadSales() {
    setLoadingSales(true)
    await updateSales(canister.id)
    setLoadingSales(false)
  }

  async function handleDeleteSales() {
    setDeletingSales(true)
    await deleteSales(canister.id)
    setDeletingSales(false)
  }

  if (!sales) return <span>Loading</span>

  return (
    <Page title={`${canister.name} - Transactions | RaisinRank.com`}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack spacing={3}>
          <Typography variant="h3" component="h1" paragraph>
            Recent Sales
          </Typography>
          <Stack direction="row" spacing={3}>
            <Info1 data={salesCount ?? 0} description={'Total Sales'} />
            <Info1 data={salesCount ?? 0} description={'Total Sales'} />
          </Stack>
          <Stack direction="row" spacing={3}>
            <LoadingButton loading={loadingSales} variant="contained" onClick={handleLoadSales}>
              Update Sales
            </LoadingButton>
            <LoadingButton loading={deletingSales} variant="contained" onClick={handleDeleteSales}>
              Delete Sales
            </LoadingButton>
          </Stack>
          <Box>
            <Grid container spacing={3}>
              {sales.map((sale) => (
                <Grid key={sale.id} item xs={12} sm={6} md={3}>
                  <SaleCard sale={sale} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Page>
  )
}
