"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _chemistryReducer = require("../reducers/chemistryReducer");
var _jsxRuntime = require("react/jsx-runtime");
;
const withFriendProfile = WrappedComponent => ({
  id,
  ...props
}) => {
  const profile = (0, _chemistryReducer.useProfile)(id);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
    ...profile,
    ...props
  });
};
var _default = exports.default = withFriendProfile;