"use strict";

var _reactDom = require("react-dom");
var _reactRouterDom = require("react-router-dom");
var _component = require("@loadable/component");
var _App = _interopRequireDefault(require("../App"));
var _material = require("@mui/material");
var _theme = require("../theme");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _component.loadableReady)(() => {
  const root = document.getElementById('app');
  (0, _reactDom.hydrate)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ThemeProvider, {
    theme: _theme.theme,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.BrowserRouter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {})
    })
  }), root);
});