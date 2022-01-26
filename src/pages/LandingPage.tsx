// material
import { styled } from '@mui/material/styles'

import { LandingHero, LandingMinimal } from '../components/_external-pages/landing'
import Page from '../components/Page'

const RootStyle = styled(Page)({
  height: '100%'
})

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}))

export default function LandingPage() {
  return (
    <RootStyle title="NFT Analytics | RaisinRank.com" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingMinimal />
      </ContentStyle>
    </RootStyle>
  )
}
