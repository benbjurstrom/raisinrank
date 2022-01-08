// material
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Container, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'

// components
import Info1 from '../components/elements/Info1'
import Page from '../components/Page'
import SaleCard from '../components/SaleCard'
import { db } from '../db'
import useSettings from '../hooks/useSettings'
import { updateSales, deleteSales } from '../utils/updateSales'
// hooks

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettings()
  const canisterId = 'unssi-hiaaa-aaaah-qcmya-cai'

  const sales = useLiveQuery(() => {
    return db.sales
      .orderBy('soldAt')
      .filter((sale) => {
        return sale.canisterId === canisterId
      })
      .reverse()
      .limit(100)
      .toArray()
  })

  const salesCount = useLiveQuery(() => db.sales.count())

  const [loadingSales, setLoadingSales] = React.useState(false)
  const [deletingSales, setDeletingSales] = React.useState(false)

  async function handleLoadSales() {
    setLoadingSales(true)
    await updateSales(canisterId)
    setLoadingSales(false)
  }

  async function handleDeleteSales() {
    setDeletingSales(true)
    await deleteSales(canisterId)
    setDeletingSales(false)
  }

  if (!sales) return <span>Loading</span>

  return (
    <Page title="Page One | Minimal-UI">
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
