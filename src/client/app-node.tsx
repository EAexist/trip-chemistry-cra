/**
 * inspired by:
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/src/AppSsr.jsx
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/tools/ssr.js#L57
 */

// import App from './app-web'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import App from '../App'
import { StaticRouter } from 'react-router-dom/server'
import { theme } from '../theme'
import createEmotionCache from '../ssr/createEmotionCache';

const cache = createEmotionCache();

const AppSSR = ({ url }) => (
  <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </ThemeProvider>
  </CacheProvider>
)

export default AppSSR
