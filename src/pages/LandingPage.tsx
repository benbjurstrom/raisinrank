// material
import { styled } from '@mui/material/styles'

import { LandingHero } from '../components/_external-pages/landing'
import Page from '../components/Page'

const RootStyle = styled(Page)({
  height: '100%'
})

export default function LandingPage() {
  return (
    <RootStyle title="NFT Analytics | RaisinRank.com" id="move_top">
      <LandingHero />
    </RootStyle>
  )
}
