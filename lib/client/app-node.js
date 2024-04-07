"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _appWeb = _interopRequireDefault(require("./app-web"));
var _server = require("react-router-dom/server");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * inspired by:
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/src/AppSsr.jsx
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/tools/ssr.js#L57
 */

const AppSSR = ({
  url
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_server.StaticRouter, {
  location: url,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_appWeb.default, {})
});
var _default = exports.default = AppSSR;