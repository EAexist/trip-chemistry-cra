"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _framerMotion = require("framer-motion");
var _reactRouterDom = require("react-router-dom");
var _LazyDomAnimation = _interopRequireDefault(require("../../motion/LazyDomAnimation"));
var _props = require("../props");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
const RoutedMotionPage = ({
  className,
  children
}) => {
  /* Hooks */
  const {
    state
  } = (0, _reactRouterDom.useLocation)();
  const motionprops = state && state.navigateDirection ? state.navigateDirection === "next" ? {
    custom: "left",
    delayChildren: 0.75,
    ..._props.SLIDEINLEFT
  } : state.navigateDirection === "prev" ? {
    custom: "right",
    delayChildren: 0.75,
    ..._props.SLIDEINLEFT
  } : undefined : undefined;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LazyDomAnimation.default, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.div, {
      ...motionprops,
      className: `page ${className}`,
      children: children
    })
  });
};
var _default = exports.default = RoutedMotionPage;