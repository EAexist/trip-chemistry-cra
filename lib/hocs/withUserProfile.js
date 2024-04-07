"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _authReducer = require("../reducers/authReducer");
var _jsxRuntime = require("react/jsx-runtime");
;
const withUserProfile = WrappedComponent => ({
  ...props
}) => {
  const profile = (0, _authReducer.useUserProfile)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
    ...profile,
    ...props
  });
};
var _default = exports.default = withUserProfile;