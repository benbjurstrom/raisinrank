// material
import { Box, BoxProps } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  const theme = useTheme()
  const PRIMARY_LIGHT = theme.palette.primary.light
  const PRIMARY_MAIN = theme.palette.primary.main
  const PRIMARY_DARK = theme.palette.primary.dark

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M122.61 97.83C122.61 103.043 121.69 108.103 119.85 113.01C118.163 117.917 116.477 121.52 114.79 123.82L112.26 127.04H77.53C81.3633 123.513 83.28 119.143 83.28 113.93C83.28 111.17 82.36 108.947 80.52 107.26C78.8333 105.42 76.4567 104.5 73.39 104.5C68.1767 104.5 63.6533 107.107 59.82 112.32L46.94 185H7.84L27.39 74.37H63.73L60.97 89.78C69.71 77.36 80.29 71.15 92.71 71.15C102.677 71.15 110.113 73.5267 115.02 78.28C120.08 83.0333 122.61 89.55 122.61 97.83Z"
          fill="url(#paint0_linear_2_6)"
        />
        <path
          d="M240.755 97.83C240.755 103.043 239.835 108.103 237.995 113.01C236.308 117.917 234.621 121.52 232.935 123.82L230.405 127.04H195.675C199.508 123.513 201.425 119.143 201.425 113.93C201.425 111.17 200.505 108.947 198.665 107.26C196.978 105.42 194.601 104.5 191.535 104.5C186.321 104.5 181.798 107.107 177.965 112.32L165.085 185H125.985L145.535 74.37H181.875L179.115 89.78C187.855 77.36 198.435 71.15 210.855 71.15C220.821 71.15 228.258 73.5267 233.165 78.28C238.225 83.0333 240.755 89.55 240.755 97.83Z"
          fill="url(#paint1_linear_2_6)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2_6"
            x1="124.5"
            y1="-56"
            x2="124.5"
            y2="282"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#7635DC" />
            <stop offset="0.390625" stop-color="#7635DC" />
            <stop offset="0.864583" stop-color="#826AF9" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2_6"
            x1="124.5"
            y1="-56"
            x2="124.5"
            y2="282"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#7635DC" />
            <stop offset="0.390625" stop-color="#7635DC" />
            <stop offset="0.864583" stop-color="#826AF9" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  )
}
