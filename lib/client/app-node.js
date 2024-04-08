"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("@emotion/react");
var _App = _interopRequireDefault(require("../App"));
var _server = require("react-router-dom/server");
var _theme = require("../theme");
var _createEmotionCache = _interopRequireDefault(require("../ssr/createEmotionCache"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * inspired by:
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/src/AppSsr.jsx
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/tools/ssr.js#L57
 */

// import App from './app-web'

const cache = (0, _createEmotionCache.default)();
const AppSSR = ({
  url
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.CacheProvider, {
  value: cache,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.ThemeProvider, {
    theme: _theme.theme,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_server.StaticRouter, {
      location: url,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {})
    })
  })
});
var _default = exports.default = AppSSR;