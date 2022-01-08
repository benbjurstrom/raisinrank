import { Suspense, lazy } from 'react'
import { Navigate, useRoutes, useLocation, useParams } from 'react-router-dom'

// layouts
import LoadingScreen from '../components/LoadingScreen'
import DashboardLayout from '../layouts/dashboard'
import LogoOnlyLayout from '../layouts/LogoOnlyLayout'
import MainLayout from '../layouts/main'
// components
// ----------------------------------------------------------------------

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation()
  const isDashboard = pathname.includes('/dashboard')

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  )
}

export default function Router() {
  const { pathname } = useLocation()
  const collection = pathname.split('/')[1]
  return useRoutes([
    // Dashboard Routes
    {
      path: '/:collection',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={`/${collection}/listings`} replace /> },
        { path: 'listings', element: <Listings /> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'hodlers', element: <Hodlers /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ element: <LandingPage /> }]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ])
}

// IMPORT COMPONENTS

// Dashboard
const Listings = Loadable(lazy(() => import('../pages/Listings')))
const Transactions = Loadable(lazy(() => import('../pages/Transactions')))
const Hodlers = Loadable(lazy(() => import('../pages/Hodlers')))
const NotFound = Loadable(lazy(() => import('../pages/Page404')))
// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')))
