"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _authReducer = require("../reducers/authReducer");
var _jsxRuntime = require("react/jsx-runtime");
;
;
const withAuthLoadStatus = WrappedComponent => ({
  ...props
}) => {
  const [status, setStatus] = (0, _authReducer.useAuthLoadStatus)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
    status,
    setStatus,
    ...props
  });
};
var _default = exports.default = withAuthLoadStatus;