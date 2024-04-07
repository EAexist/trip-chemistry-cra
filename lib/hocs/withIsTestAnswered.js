"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _testAnswerReducer = require("../reducers/testAnswerReducer");
var _jsxRuntime = require("react/jsx-runtime");
;
const withIsTestAnswered = WrappedComponent => ({
  testName,
  ...props
}) => {
  const isAnswered = (0, _testAnswerReducer.useIsTestAnswered)(testName);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
    testName,
    isAnswered: isAnswered,
    ...props
  });
};
var _default = exports.default = withIsTestAnswered;