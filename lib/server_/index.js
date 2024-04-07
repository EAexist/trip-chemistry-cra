"use strict";

var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _express = _interopRequireDefault(require("express"));
var _server = require("react-dom/server");
var _server2 = require("@loadable/server");
var _react = require("react");
var _createInstance = _interopRequireDefault(require("@emotion/server/create-instance"));
var _createEmotionCache = _interopRequireDefault(require("../ssr/createEmotionCache"));
var _expressStaticGzip = _interopRequireDefault(require("express-static-gzip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * inspired by
 * @see https://github.com/gregberge/loadable-components/blob/8d29fef8f02e5b0cdd4a1add3399e48089a7b97a/examples/server-side-rendering/src/server/main.js
 */

/* Material UI */

/**
 * Can be e.g. your CDN Domain (https://cdn.example.com) in production with
 * `process.env.CDN_DOMAIN` for instance.
 */
const STATIC_URL = '/static/';
const nodeStats = _path.default.resolve(__dirname, '../../dist/node/loadable-stats.json');
const webStats = _path.default.resolve(__dirname, '../../dist/web/loadable-stats.json');
const app = (0, _express.default)();
const PORT = process.env.PORT || 3001;
const createReactApp = async location => {
  console.log(location);
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
  const nodeExtractor = new _server2.ChunkExtractor({
    statsFile: nodeStats
  });
  // const { default: App } = nodeExtractor.requireEntrypoint()

  const webExtractor = new _server2.ChunkExtractor({
    statsFile: webStats
    /**
     * has to be in sync with `__webpack_public_path__` (see src/client/path.ts)
     */
    // publicPath: STATIC_URL,
  });

  /* Material UI */
  const cache = (0, _createEmotionCache.default)();
  const {
    extractCriticalToChunks,
    constructStyleTagsFromChunks
  } = (0, _createInstance.default)(cache);
  const {
    default: App
  } = nodeExtractor.requireEntrypoint();
  const jsx = webExtractor.collectChunks( /*#__PURE__*/(0, _react.createElement)(App, {
    location: location
  }));
  const reactApp = (0, _server.renderToString)(jsx);
  console.log('reactApp :', reactApp);
  const emotionChunks = extractCriticalToChunks(reactApp);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);
  const htmlTemplate = await _fs.default.promises.readFile(_path.default.resolve(__dirname, '../../dist/index.html'), 'utf-8');
  const html = htmlTemplate.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>${webExtractor.getScriptTags()}`).replace('</head>', `${webExtractor.getLinkTags()}${webExtractor.getStyleTags()}</head>`).replace('<meta charset="utf-8" />', `<meta charset="utf-8" />${emotionCss}`);
  return html;
};

/* Compression */
app.use('/static', (0, _expressStaticGzip.default)(_path.default.join(__dirname, '../../dist'), {
  // app.use('/*', expressStaticGzip(__dirname, {
  enableBrotli: true,
  orderPreference: ['br', 'gz']
  // setHeaders: function (res, path) {
  //     res.setHeader("Cache-Control", "public, max-age=31536000");
  // }
}));
app.use('/static', _express.default.static(_path.default.join(__dirname, '../../dist/web')));
app.get('*', async (req, res) => {
  /**
   * Dynamic app settings created on the server and exposed with `window.app`
   * in the client.
   */
  const appContext = {
    staticUrl: STATIC_URL
  };
  const html = await createReactApp(req.url);
  res.status(200).send(html);
});
app.listen(3000, () => {
  console.log('Running on http://localhost:3000/');
});