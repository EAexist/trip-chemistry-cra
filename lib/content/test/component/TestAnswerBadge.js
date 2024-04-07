"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _testAnswerReducer = require("../../../reducers/testAnswerReducer");
var _jsxRuntime = require("react/jsx-runtime");
;
function TestAnswerBadge({
  testName,
  children,
  ...props
}) {
  const isAnswered = (0, _testAnswerReducer.useIsTestAnswered)(testName);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Badge, {
    invisible: isAnswered,
    ...props,
    variant: "dot",
    color: "primary",
    children: children
  });
}
var _default = exports.default = TestAnswerBadge;