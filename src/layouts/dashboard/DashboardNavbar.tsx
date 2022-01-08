import menu2Fill from '@iconify/icons-eva/menu-2-fill'
import { Icon } from '@iconify/react'
// material
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'

// hooks
//
import { MHidden } from '../../components/@material-extend'
import Logo from '../../components/Logo'
import useCollapseDrawer from '../../hooks/useCollapseDrawer'

import AccountPopover from './AccountPopover'
import LanguagePopover from './LanguagePopover'
import NotificationsPopover from './NotificationsPopover'
import Searchbar from './Searchbar'

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280
const COLLAPSE_WIDTH = 102

const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 92

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}))

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}))

// ----------------------------------------------------------------------

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction
}

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  const { isCollapse } = useCollapseDrawer()

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` }
        })
      }}
    >
      <MHidden width="lgUp">
        <ToolbarStyle>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </ToolbarStyle>
      </MHidden>
    </RootStyle>
  )
}
