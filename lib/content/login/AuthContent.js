"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _authReducer = require("../../reducers/authReducer");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
/* React */

/* Externals */

;
function AuthContent({}) {
  /* Hooks */
  const {
    state
  } = (0, _reactRouterDom.useLocation)();
  const isAuthorized = (0, _authReducer.useIsAuthorized)();

  /* Reducers */
  const {
    id: userId,
    authProvider
  } = (0, _authReducer.useUserProfile)();
  (0, _react.useEffect)(() => {
    if (state) console.log(`[AuthContent] ${state}`);
    if (state && state.loginRedirectPath) console.log(`[AuthContent] ${state.loginRedirectPath}`);
  }, [state]);
  return (
    // isAuthorized
    //     ?
    //     <Navigate to={`${
    //         ((state !== null) && state.loginRedirectPath)
    //         ? state.loginRedirectPath
    //         : '/home'}${
    //             (authProvider === 'GUEST')
    //             ? `?guestId=${userId}`
    //             : ''}
    //             `} />
    //     :
    /* Allow access by navigate( path, { state: {loginRedirectPath} }) only.
        Redirect access by URL to Homepage.
    */
    state && state.loginRedirectPath ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Outlet, {}) :
    /*#__PURE__*/
    // <Navigate to={'/home'} />
    (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {})
  );
}
var _default = exports.default = AuthContent;