import { Box, BoxProps } from '@mui/material'
import { motion } from 'framer-motion'

// material
//
import { varMediumClick, varSmallClick } from './variants'

// ----------------------------------------------------------------------

interface ButtonAnimateProps extends BoxProps {
  mediumClick?: boolean
}

export default function ButtonAnimate({
  mediumClick = false,
  children,
  sx,
  ...other
}: ButtonAnimateProps) {
  return (
    <Box
      component={motion.div}
      whileTap="tap"
      whileHover="hover"
      variants={mediumClick ? varMediumClick : varSmallClick}
      sx={{ display: 'inline-flex', ...sx }}
      {...other}
    >
      {children}
    </Box>
  )
}
