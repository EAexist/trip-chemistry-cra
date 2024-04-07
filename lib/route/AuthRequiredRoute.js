"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _react = require("react");
var _authReducer = require("../reducers/authReducer");
var _LoginContent = _interopRequireDefault(require("../content/login/LoginContent"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* React Packages */

;
function AuthRequiredRoute({}) {
  /* Hooks */
  const {
    pathname
  } = (0, _reactRouterDom.useLocation)();
  const isAuthorized = (0, _authReducer.useIsAuthorized)();
  (0, _react.useEffect)(() => {
    console.log(`[AuthRequiredRoute] pathname=${pathname}`);
  }, [pathname]);
  return isAuthorized ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Outlet, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoginContent.default, {});
}
var _default = exports.default = AuthRequiredRoute;