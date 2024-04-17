"use strict";

var _component = require("@loadable/component");
var _reactRouterDom = require("react-router-dom");
var _react = require("@emotion/react");
var _material = require("@mui/material");
var _styles = require("@mui/material/styles");
var _client = require("react-dom/client");
var _reactHelmetAsync = require("react-helmet-async");
var _routes = _interopRequireDefault(require("../routes"));
var _createEmotionCache = _interopRequireDefault(require("../ssr/createEmotionCache"));
var _theme = require("../theme");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import App from './app-web'

/*  React Router - Routers - Picking A Router. Remix Software, Inc.
    ( https://reactrouter.com/en/main/guides/ssr ) */let router = (0, _reactRouterDom.createBrowserRouter)(_routes.default);
const cache = (0, _createEmotionCache.default)();
(0, _component.loadableReady)(() => {
  const root = document.getElementById('root');
  (0, _client.hydrateRoot)(root, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactHelmetAsync.HelmetProvider, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.CacheProvider, {
      value: cache,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styles.ThemeProvider, {
        theme: _theme.theme,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CssBaseline, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.RouterProvider, {
          router: router
        })]
      })
    })
  }));
});