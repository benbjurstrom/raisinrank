// material
import { styled } from '@mui/material/styles'

// components
import {
  LandingHero,
  LandingMinimal,
  LandingDarkMode,
  LandingPricingPlans,
  LandingAdvertisement,
  LandingCleanInterfaces,
  LandingHugePackElements
} from '../components/_external-pages/landing'
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
