"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const TestSection = /*#__PURE__*/(0, _react.forwardRef)(({
  children
}, ref) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  className: "flex",
  style: {
    height: '100%',
    overflow: 'hidden'
  },
  ref: ref,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Toolbar, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "top-nav__placeholder"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "flex block--with-margin",
    style: {
      flexGrow: 1
    },
    children: children
  })]
}));
var _default = exports.default = TestSection;