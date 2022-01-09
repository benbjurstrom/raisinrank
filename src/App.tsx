import { ProgressBarStyle } from './components/LoadingScreen'
import ScrollToTop from './components/ScrollToTop'
import ThemePrimaryColor from './components/ThemePrimaryColor'
import Router from './routes'
// theme
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'

export default function App() {
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <GlobalStyles />
        <ProgressBarStyle />
        <ScrollToTop />
        <Router />
      </ThemePrimaryColor>
    </ThemeConfig>
  )
}
