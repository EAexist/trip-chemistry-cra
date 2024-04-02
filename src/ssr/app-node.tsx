/**
 * inspired by:
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/src/AppSsr.jsx
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/tools/ssr.js#L57
 */

import App from '../App'
import { StaticRouter } from 'react-router-dom/server'
import { theme } from '../theme'
import { ThemeProvider } from '@mui/material'

const AppSSR = ({ location }) => (
  // <ThemeProvider theme={theme}>
    <StaticRouter location={location}>
      <App />
    </StaticRouter>
  // </ThemeProvider>
)

export default AppSSR
