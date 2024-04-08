"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _reactRouterDom = require("react-router-dom");
var _component = require("@loadable/component");
var _App = _interopRequireDefault(require("../App"));
var _react2 = require("@emotion/react");
var _styles = require("@mui/material/styles");
var _theme = require("../theme");
var _createEmotionCache = _interopRequireDefault(require("../ssr/createEmotionCache"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import App from './app-web'

const cache = (0, _createEmotionCache.default)();
(0, _component.loadableReady)(() => {
  const root = document.getElementById('app');
  (0, _reactDom.hydrate)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.CacheProvider, {
    value: cache,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.ThemeProvider, {
      theme: _theme.theme,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.BrowserRouter, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {})
      })
    })
  }), root);
});