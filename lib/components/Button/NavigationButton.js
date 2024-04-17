"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _jsxRuntime = require("react/jsx-runtime");
;
const NavigationButton = ({
  position = 'absolute',
  navigateTo = 'prev',
  ...props
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
    "aria-label": navigateTo === 'prev' ? 'navigate to previous' : 'navigate to next',
    sx: {
      position: position,
      top: "50%",
      left: navigateTo === 'prev' ? 0 : undefined,
      right: navigateTo === 'next' ? 0 : undefined,
      zIndex: 10,
      ...props.sx
    },
    ...props,
    children: navigateTo === 'prev' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.NavigateBefore, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.NavigateNext, {})
  });
};
var _default = exports.default = NavigationButton;