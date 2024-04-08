/**
 * inspired by
 * @see https://github.com/gregberge/loadable-components/blob/8d29fef8f02e5b0cdd4a1add3399e48089a7b97a/examples/server-side-rendering/src/server/main.js
 */
import path from 'path'

import { ChunkExtractor } from '@loadable/server'
import express from 'express'
import { renderToString } from 'react-dom/server'
import serialize from 'serialize-javascript'
import { IAppSettings } from '../types/client'
import { createElement } from 'react'
import createEmotionCache from '../ssr/createEmotionCache'
import createEmotionServer from '@emotion/server/create-instance'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../theme'

/**
 * Can be e.g. your CDN Domain (https://cdn.example.com) in production with
 * `process.env.CDN_DOMAIN` for instance.
 */
const STATIC_URL = '/static/'

const nodeStats = path.resolve(__dirname, '../../dist/node/loadable-stats.json')
const webStats = path.resolve(__dirname, '../../dist/web/loadable-stats.json')

const app = express()

app.use('/static', express.static(path.join(__dirname, '../../dist/web')))

/**
 * node extractor is used for the server-side rendering
 * web extractor is used to get the browser-side compiled files.
 *
 * ## Learnings
 * - use `collectChunks` instead of `ChunkExtractorManager`. This was more
 *   reliable in my apps.
 * - Issue `<App />` is undefined -> resolved with `libraryTarget: 'commonjs2'`
 * in webpack.server.js config
 * @see https://github.com/gregberge/loadable-components/issues/620
 */
const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats })
const { default: App } = nodeExtractor.requireEntrypoint()

const webExtractor = new ChunkExtractor({
  statsFile: webStats,
  /**
   * has to be in sync with `__webpack_public_path__` (see src/client/path.ts)
   */
  publicPath: STATIC_URL,
})

/* Material UI */
const cache = createEmotionCache();
const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

app.get('*', (req, res) => {

  const jsx = webExtractor.collectChunks(
    createElement(App as any, { url: req.url }),
  )

  const html = renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        { jsx }
      </ThemeProvider>
    </CacheProvider>
  )

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);
  
  /**
   * Dynamic app settings created on the server and exposed with `window.app`
   * in the client.
   */
  const appContext: IAppSettings = {
    staticUrl: STATIC_URL,
  }

  res.set('content-type', 'text/html')
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <title>loadable-components-example</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
        ${emotionCss}
        ${webExtractor.getLinkTags()}
        ${webExtractor.getStyleTags()}
        <style>
          body {
            font-family: 'Roboto', sans-serif;
            background: #efefef;
          }

          #app {
            max-width: 80%;
            margin: 2rem auto;
          }
        </style>
      </head>
      <body>
      <script>
          ;window.app=${serialize(appContext)}
        </script>
        <div id="app">${html}</div>
        ${webExtractor.getScriptTags()}
      </body>
    </html>
  `)
})

app.listen(3000, () => {
  console.log('Running on http://localhost:3000/')
})
