// scroll bar
import 'simplebar/src/simplebar.css'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

// contexts
import App from './App'
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext'
import { SettingsProvider } from './contexts/SettingsContext'
//
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

// ----------------------------------------------------------------------

ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <SettingsProvider>
        <CollapseDrawerProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CollapseDrawerProvider>
      </SettingsProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
