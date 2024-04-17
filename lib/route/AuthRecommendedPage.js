"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _react = require("react");
var _LoginContent = _interopRequireDefault(require("../content/login/LoginContent"));
var _authReducer = require("../reducers/authReducer");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* Externals */

;
function AuthRecommendedPage({}) {
  /* Hooks */
  const {
    pathname
  } = (0, _reactRouterDom.useLocation)();
  const isAuthorized = (0, _authReducer.useIsAuthorized)();
  (0, _react.useEffect)(() => {
    console.log(`[AuthRecommendedPage] pathname=${pathname}`);
  }, [pathname]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [!isAuthorized && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoginContent.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        display: isAuthorized ? 'block' : 'none'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Outlet, {})
    })]
  });
}
var _default = exports.default = AuthRecommendedPage;