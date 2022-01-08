// material
import { styled } from '@mui/material/styles'

import Page from '../components/Page'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
})

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="The starting point for your next project | Minimal-UI" id="move_top">
      <LandingHero />
    </RootStyle>
  )
}
