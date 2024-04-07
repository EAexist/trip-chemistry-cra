"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _reactRouterDom = require("react-router-dom");
var _component = require("@loadable/component");
var _appWeb = _interopRequireDefault(require("./app-web"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _component.loadableReady)(() => {
  const root = document.getElementById('app');
  (0, _reactDom.hydrate)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.BrowserRouter, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_appWeb.default, {})
  }), root);
});