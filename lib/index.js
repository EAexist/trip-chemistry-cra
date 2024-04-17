"use strict";

var _reactRouterDom = require("react-router-dom");
var _material = require("@mui/material");
var _client = require("react-dom/client");
var _theme = require("./theme");
var _reactHelmetAsync = require("react-helmet-async");
var _routes = _interopRequireDefault(require("./routes"));
require("./styles/index.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const root = (0, _client.createRoot)(document.getElementById('root'));

/*  React Router - Routers - Picking A Router. Remix Software, Inc.
    ( https://reactrouter.com/en/main/guides/ssr ) */
let router = (0, _reactRouterDom.createBrowserRouter)(_routes.default);
root.render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactHelmetAsync.HelmetProvider, {
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ThemeProvider, {
    theme: _theme.theme,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.RouterProvider, {
      router: router
    })
  })
}));