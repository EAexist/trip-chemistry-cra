"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _App = _interopRequireDefault(require("../App"));
var _server = require("react-router-dom/server");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * inspired by:
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/src/AppSsr.jsx
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/tools/ssr.js#L57
 */

const AppSSR = ({
  location
}) =>
/*#__PURE__*/
// <ThemeProvider theme={theme}>
(0, _jsxRuntime.jsx)(_server.StaticRouter, {
  location: location,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {})
})
// </ThemeProvider>
;
var _default = exports.default = AppSSR;