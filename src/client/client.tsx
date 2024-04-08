import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadableReady } from '@loadable/component'

// import App from './app-web'
import App from '../App'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../theme'
import createEmotionCache from '../ssr/createEmotionCache'

const cache = createEmotionCache();

loadableReady(() => {
  const root = document.getElementById('app')
  hydrate(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>,
    root,
  )
})
