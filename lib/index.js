"use strict";

var _reactRouterDom = require("react-router-dom");
var _material = require("@mui/material");
var _client = require("react-dom/client");
var _App = _interopRequireDefault(require("./App"));
var _theme = require("./theme");
require("./styles/index.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const root = (0, _client.createRoot)(document.getElementById('root'));
root.render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ThemeProvider, {
  theme: _theme.theme,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.BrowserRouter, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {})
  })
}));