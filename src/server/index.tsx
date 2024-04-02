/**
 * inspired by
 * @see https://github.com/gregberge/loadable-components/blob/8d29fef8f02e5b0cdd4a1add3399e48089a7b97a/examples/server-side-rendering/src/server/main.js
 */
import React from 'react';
import path from 'path'
import fs from 'fs';

import express from 'express'
import serialize from 'serialize-javascript'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'
import { IAppSettings } from '../types/client'
import { createElement } from 'react'

/* Material UI */
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from "@emotion/react";
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../ssr/createEmotionCache'
import { theme } from "../theme";
import expressStaticGzip from 'express-static-gzip'
import { StaticRouter } from 'react-router-dom/server'
import App from '../App';
/**
 * Can be e.g. your CDN Domain (https://cdn.example.com) in production with
 * `process.env.CDN_DOMAIN` for instance.
 */
const STATIC_URL = '/static/'

const nodeStats = path.resolve(__dirname, '../../dist/node/loadable-stats.json')
const webStats = path.resolve(__dirname, '../../dist/web/loadable-stats.json')

const app = express()

const PORT = process.env.PORT || 3001;


const createReactApp = async (location) => {

  console.log(location)
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
  // const { default: App } = nodeExtractor.requireEntrypoint()

  const webExtractor = new ChunkExtractor({
    statsFile: webStats,
    /**
     * has to be in sync with `__webpack_public_path__` (see src/client/path.ts)
     */
    // publicPath: STATIC_URL,
  })

  /* Material UI */
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const { default: App } = nodeExtractor.requireEntrypoint();
  const jsx = webExtractor.collectChunks(
    createElement(App as any, { location: location })
  )
  const reactApp = renderToString(jsx)
  console.log('reactApp :', reactApp);

  const emotionChunks = extractCriticalToChunks(reactApp);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  const htmlTemplate = await fs.promises.readFile(path.resolve(__dirname, '../../dist/index.html'), 'utf-8');
  const html = htmlTemplate
    .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>${webExtractor.getScriptTags()}`)
    .replace('</head>', `${webExtractor.getLinkTags()}${webExtractor.getStyleTags()}</head>`)
    .replace('<meta charset="utf-8" />', `<meta charset="utf-8" />${emotionCss}`);
  return html;

}

/* Compression */
app.use('/static', expressStaticGzip(path.join(__dirname, '../../dist'), {
  // app.use('/*', expressStaticGzip(__dirname, {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  // setHeaders: function (res, path) {
  //     res.setHeader("Cache-Control", "public, max-age=31536000");
  // }
}));

app.use('/static', express.static(path.join(__dirname, '../../dist/web')))

app.get('*', async (req, res) => {
  /**
   * Dynamic app settings created on the server and exposed with `window.app`
   * in the client.
   */
  const appContext: IAppSettings = {
    staticUrl: STATIC_URL,
  }
  const html = await createReactApp(req.url);
  res.status(200).send(html);
})

app.listen(3000, () => {
  console.log('Running on http://localhost:3000/')
})
