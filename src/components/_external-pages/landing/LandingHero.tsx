import { Box, Container, Typography, Stack, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'

import { Canisters } from '../../../utils/canisterResolver'
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInRight } from '../../animate'
import CanisterCard from '../../CanisterCard'

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center'
  }
}))

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}))

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
})

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '48vh'
  },
  borderRadius: theme.shape.borderRadiusMd
}))

// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroOverlayStyle alt="overlay" src="/static/overlay.svg" variants={varFadeIn} />

        <HeroImgStyle alt="hero" src="https://i.imgur.com/YBTXwQq.png" variants={varFadeInUp} />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                NFT <br />
                <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                  Analytics
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Grid container spacing={2}>
                {Canisters.map((canister) => (
                  <Grid key={canister.id} item xs={4}>
                    <CanisterCard canister={canister} />
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  )
}
