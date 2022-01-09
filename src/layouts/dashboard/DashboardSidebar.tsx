import DeleteIcon from '@mui/icons-material/Delete'
import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Box, Drawer, Stack, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import React, { useEffect } from 'react'
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom'

import { MHidden } from '../../components/@material-extend'
import Logo from '../../components/Logo'
import NavSection from '../../components/NavSection'
import Scrollbar from '../../components/Scrollbar'
import SvgIconStyle from '../../components/SvgIconStyle'
import { deleteDB } from '../../db'
import useCollapseDrawer from '../../hooks/useCollapseDrawer'
import { getCanisterFromSlug } from '../../utils/canisterResolver'

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
)

const ICONS = {
  user: getIcon('ic_user'),
  analytics: getIcon('ic_analytics'),
  ecommerce: getIcon('ic_ecommerce')
}

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280
const COLLAPSE_WIDTH = 102

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex
    })
  }
}))

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm
}))

const ProductImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '100%'
}))

type DashboardSidebarProps = {
  isOpenSidebar: boolean
  onCloseSidebar: VoidFunction
}

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) {
  const [deletingDB, setDeletingDB] = React.useState(false)

  async function handleDeleteDB() {
    setDeletingDB(true)
    await deleteDB()
    setDeletingDB(false)
  }

  const { pathname } = useLocation()
  const { collection } = useParams()
  const canister = getCanisterFromSlug(collection)
  const sidebarConfig = [
    {
      subheader: 'general',
      items: [
        { title: 'Listings', path: `/${collection}/listings`, icon: ICONS.ecommerce },
        { title: 'Transactions', path: `/${collection}/transactions`, icon: ICONS.ecommerce },
        { title: 'Hodlers', path: `/${collection}/hodlers`, icon: ICONS.user }
      ]
    }
  ]

  const { isCollapse, collapseClick, collapseHover, onHoverEnter, onHoverLeave } =
    useCollapseDrawer()

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start'
        }
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: 'center'
          })
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo />
          </Box>
        </Stack>

        {isCollapse ? (
          <Avatar alt="My Avatar" src={canister.thumbnail} sx={{ mx: 'auto', mb: 2 }} />
        ) : (
          <a
            href={'https://entrepot.app/marketplace/' + canister.slug}
            target="_blank"
            rel="noreferrer"
          >
            <AccountStyle>
              <ProductImgStyle src={canister.thumbnail} />
              <Typography variant="subtitle1" sx={{ color: 'text.primary', mt: 2 }}>
                {canister.name}
              </Typography>
            </AccountStyle>
          </a>
        )}
      </Stack>

      <NavSection navConfig={sidebarConfig} isShow={!isCollapse} />
      <Box sx={{ flexGrow: 1 }} />
      <LoadingButton
        startIcon={<DeleteIcon />}
        sx={{ margin: 2 }}
        color="error"
        loading={deletingDB}
        onClick={handleDeleteDB}
      >
        Reset Database
      </LoadingButton>
    </Scrollbar>
  )

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH
        },
        ...(collapseClick && {
          position: 'absolute'
        })
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88)
              })
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  )
}
