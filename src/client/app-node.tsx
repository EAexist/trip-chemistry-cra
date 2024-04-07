/**
 * inspired by:
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/src/AppSsr.jsx
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/tools/ssr.js#L57
 */
import React from 'react'

import App from './app-web'
import { StaticRouter } from 'react-router-dom/server'

const AppSSR = ({ url }) => (
  <StaticRouter location={url}>
    <App />
  </StaticRouter>
)

export default AppSSR
