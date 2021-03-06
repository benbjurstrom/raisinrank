import { styled, useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { MHidden } from '../../components/@material-extend'
import useCollapseDrawer from '../../hooks/useCollapseDrawer'
import DashboardNavbar from './DashboardNavbar'
import DashboardSidebar from './DashboardSidebar'

const APP_BAR_MOBILE = 64

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
})

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}))

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const theme = useTheme()
  const { collapseClick } = useCollapseDrawer()
  const [open, setOpen] = useState(false)

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      </MHidden>
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle
        sx={{
          transition: theme.transitions.create('margin', {
            duration: theme.transitions.duration.complex
          }),
          ...(collapseClick && {
            ml: '102px'
          })
        }}
      >
        <Outlet />
      </MainStyle>
    </RootStyle>
  )
}
