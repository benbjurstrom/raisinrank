import { Box, BoxProps } from '@mui/material'
import { forwardRef, ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
// material

// ----------------------------------------------------------------------

interface PageProps extends BoxProps {
  children: ReactNode
  title?: string
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ children, title = '', ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
))

export default Page
