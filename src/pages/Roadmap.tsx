import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'

// material
// components
import { MotionContainer } from '../components/animate'
import Page from '../components/Page'
import RoadmapTimeline from '../components/RoadmapTimeline'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}))

// ----------------------------------------------------------------------

export default function Roadmap() {
  return (
    <RootStyle title="Roadmap | RaisinRank">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <RoadmapTimeline />
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  )
}
