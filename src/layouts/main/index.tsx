import DeleteIcon from '@mui/icons-material/Delete'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Container, Link, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

// material
// components
import Logo from '../../components/Logo'
import { deleteDB } from '../../db'
//
import MainFooter from './MainFooter'
import MainNavbar from './MainNavbar'

// ----------------------------------------------------------------------

export default function MainLayout() {
  const [deletingDB, setDeletingDB] = React.useState(false)

  async function handleDeleteDB() {
    setDeletingDB(true)
    await deleteDB()
    setDeletingDB(false)
  }

  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
            </ScrollLink>

            <Typography variant="caption" component="p">
              © All rights reserved
              <br /> made by &nbsp;
              <Link href="https://twitter.com/nullraisins" target="_blank">
                @nullraisins
              </Link>
            </Typography>
            <LoadingButton
              startIcon={<DeleteIcon />}
              sx={{ margin: 2 }}
              color="error"
              loading={deletingDB}
              onClick={handleDeleteDB}
            >
              Reset Database
            </LoadingButton>
          </Container>
        </Box>
      )}
    </>
  )
}
