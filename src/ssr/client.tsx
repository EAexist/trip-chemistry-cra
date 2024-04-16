import { loadableReady } from '@loadable/component'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import App from './app-web'
import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import routes from '../routes'
import createEmotionCache from '../ssr/createEmotionCache'
import { theme } from '../theme'

/*  React Router - Routers - Picking A Router. Remix Software, Inc.
    ( https://reactrouter.com/en/main/guides/ssr ) */
let router = createBrowserRouter(routes);

const cache = createEmotionCache();

loadableReady(() => {
  const root = document.getElementById('root')
  hydrateRoot(
    root,
    <HelmetProvider>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline
            to build upon. */}
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </CacheProvider>
    </HelmetProvider>
  )
})
