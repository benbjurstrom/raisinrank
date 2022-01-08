// material
import { CssBaseline } from '@mui/material'
import {
  createTheme,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider
} from '@mui/material/styles'
import { ReactNode, useMemo } from 'react'

//
import breakpoints from './breakpoints'
import componentsOverride from './overrides'
import palette from './palette'
import shadows, { customShadows } from './shadows'
import shape from './shape'
import typography from './typography'

// ----------------------------------------------------------------------

type ThemeConfigProps = {
  children: ReactNode
}

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const isLight = false

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight ? { ...palette.light, mode: 'light' } : { ...palette.dark, mode: 'dark' },
      shape,
      typography,
      breakpoints,
      direction: 'ltr',
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark
    }),
    [isLight]
  )

  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
