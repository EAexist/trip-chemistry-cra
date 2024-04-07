"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _jsxRuntime = require("react/jsx-runtime");
;
const OptionCard = ({
  children,
  isActive = false
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Card, {
  elevation: isActive ? 3 : 0,
  sx: {
    zIndex: isActive ? "1" : "0",
    opacity: isActive ? "1" : "0.5",
    scale: isActive ? "1" : "0.8",
    borderRadius: "12px"
    // transformOrigin: "bottom center",
  },
  children: children
});
var _default = exports.default = OptionCard;