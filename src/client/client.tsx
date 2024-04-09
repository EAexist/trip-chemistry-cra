import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom'

// import App from './app-web'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import { hydrateRoot } from 'react-dom/client'
import App from '../App'
import createEmotionCache from '../ssr/createEmotionCache'
import { theme } from '../theme'
import { CssBaseline } from '@mui/material'

const cache = createEmotionCache();

loadableReady(() => {
  const root = document.getElementById('root')
  hydrateRoot(
    root,
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline
            to build upon. */}
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>    
  )
})
