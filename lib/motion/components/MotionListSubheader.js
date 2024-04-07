"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotionListSubheader = void 0;
var _material = require("@mui/material");
var _framerMotion = require("framer-motion");
var _props = require("../props");
var _jsxRuntime = require("react/jsx-runtime");
const MotionListSubheaderComponent = (0, _framerMotion.m)(_material.ListSubheader, {
  forwardMotionProps: true
});
const MotionListSubheader = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(MotionListSubheaderComponent, {
  ...props,
  variants: _props.VARIANTS_SLIDE_UP
});
exports.MotionListSubheader = MotionListSubheader;