"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotionListItem = void 0;
var _material = require("@mui/material");
var _framerMotion = require("framer-motion");
var _props = require("../props");
var _jsxRuntime = require("react/jsx-runtime");
const MotionListItemComponent = (0, _framerMotion.m)(_material.ListItem, {
  forwardMotionProps: true
});
const MotionListItem = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(MotionListItemComponent, {
  ...props,
  variants: _props.VARIANTS_SLIDE_UP
});
exports.MotionListItem = MotionListItem;