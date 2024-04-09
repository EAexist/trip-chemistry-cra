"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _server = require("react-router-dom/server");
var _App = _interopRequireDefault(require("../App"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * inspired by:
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/src/AppSsr.jsx
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/tools/ssr.js#L57
 */

// import App from './app-web'

// const cache = createEmotionCache();
const AppSSR = ({
  url
}) =>
/*#__PURE__*/
// <CacheProvider value={cache}>
// <ThemeProvider theme={theme}>
(0, _jsxRuntime.jsx)(_server.StaticRouter, {
  location: url,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {})
})
// </ThemeProvider>
// </CacheProvider>
;
var _default = exports.default = AppSSR;