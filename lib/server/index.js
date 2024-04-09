"use strict";

var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _server = require("@loadable/server");
var _express = _interopRequireDefault(require("express"));
var _server2 = require("react-dom/server");
var _react = require("react");
var _createEmotionCache = _interopRequireDefault(require("../ssr/createEmotionCache"));
var _createInstance = _interopRequireDefault(require("@emotion/server/create-instance"));
var _react2 = require("@emotion/react");
var _styles = require("@mui/material/styles");
var _theme = require("../theme");
var _material = require("@mui/material");
var _expressStaticGzip = _interopRequireDefault(require("express-static-gzip"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * inspired by
 * @see https://github.com/gregberge/loadable-components/blob/8d29fef8f02e5b0cdd4a1add3399e48089a7b97a/examples/server-side-rendering/src/server/main.js
 */

/**
 * Can be e.g. your CDN Domain (https://cdn.example.com) in production with
 * `process.env.CDN_DOMAIN` for instance.
 */const STATIC_URL = '/static/';
const nodeStats = _path.default.resolve(__dirname, '../../dist/node/loadable-stats.json');
const webStats = _path.default.resolve(__dirname, '../../dist/js/loadable-stats.json');
const app = (0, _express.default)();
app.use('/static', (0, _expressStaticGzip.default)(_path.default.join(__dirname, '../../dist'), {
  enableBrotli: true,
  orderPreference: ['br'],
  serveStatic: {
    maxAge: 31536000000
  }
}));

/* Resources */
app.use('/static', _express.default.static(_path.default.join(__dirname, '../../dist')));

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
const nodeExtractor = new _server.ChunkExtractor({
  statsFile: nodeStats
});
const {
  default: App
} = nodeExtractor.requireEntrypoint();
const webExtractor = new _server.ChunkExtractor({
  statsFile: webStats
  /**
   * has to be in sync with `__webpack_public_path__` (see src/client/path.ts)
   */
  // publicPath: STATIC_URL,
});

/* [SEO] robots.tsx  */
app.get('/robots.txt', async (req, res) => {
  console.log(`/robots.txt`);
  const robots = await _fs.default.promises.readFile(_path.default.resolve(__dirname, '../../dist/robots.txt'), 'utf-8');
  res.status(200).send(robots);
});

/* Routes */
app.get('*', async (req, res) => {
  const jsx = webExtractor.collectChunks( /*#__PURE__*/(0, _react.createElement)(App, {
    url: req.url
  }));

  /* Material UI */
  const cache = (0, _createEmotionCache.default)();
  const {
    extractCriticalToChunks,
    constructStyleTagsFromChunks
  } = (0, _createInstance.default)(cache);
  const appHtml = (0, _server2.renderToString)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.CacheProvider, {
    value: cache,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styles.ThemeProvider, {
      theme: _theme.theme,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CssBaseline, {}), jsx]
    })
  }));

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(appHtml);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  /**
   * Dynamic app settings created on the server and exposed with `window.app`
   * in the client.
   */
  const appContext = {
    staticUrl: STATIC_URL
  };
  const htmlTemplate = await _fs.default.promises.readFile(_path.default.resolve(__dirname, '../../dist/index.html'), 'utf-8');
  const html = htmlTemplate.replace('<meta id="emotionCss"/>', emotionCss).replace('<meta id="styleTags"/>', webExtractor.getStyleTags()).replace('<div id="root"></div>', `<div id="root">${appHtml}</div>${webExtractor.getScriptTags()}`);
  res.set('content-type', 'text/html');
  res.send(html);
  // res.send(`
  //   <!doctype html>
  //   <html lang="en">
  //     <head>
  //       <title>loadable-components-example</title>
  //       <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
  //       ${emotionCss}
  //       ${webExtractor.getLinkTags()}
  //       ${webExtractor.getStyleTags()}
  //       <style>
  //         body {
  //           font-family: 'Roboto', sans-serif;
  //           background: #efefef;
  //         }

  //         #app {
  //           max-width: 80%;
  //           margin: 2rem auto;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //     <script>
  //         ;window.app=${serialize(appContext)}
  //       </script>
  //       <div id="app">${html}</div>
  //       ${webExtractor.getScriptTags()}
  //     </body>
  //   </html>
  // `)
});
app.listen(3000, () => {
  console.log('Running on http://localhost:3000/');
});