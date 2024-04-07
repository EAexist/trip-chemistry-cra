"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _material = require("@mui/material");
var _jsxRuntime = require("react/jsx-runtime");
const SectionPaper = /*#__PURE__*/(0, _react.forwardRef)(({
  className,
  square = true,
  children,
  ...props
}, ref) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Paper, {
  square: square,
  elevation: 0,
  ...props,
  className: `block--with-padding ${className}`,
  children: children
}));
var _default = exports.default = SectionPaper;