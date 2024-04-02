/**
 * inspired by:
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/src/AppSsr.jsx
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/tools/ssr.js#L57
 */

import { StaticRouter } from 'react-router-dom/server'
import App from './App'

const AppSSR = ({ url } : { url : string }) => (
  <StaticRouter location={url}>
    <App />
  </StaticRouter>
)

export default AppSSR
