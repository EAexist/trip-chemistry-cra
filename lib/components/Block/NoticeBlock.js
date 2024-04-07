"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _framerMotion = require("framer-motion");
var _LazyDomAnimation = _interopRequireDefault(require("../../motion/LazyDomAnimation"));
var _props = require("../../motion/props");
var _LazyImage = _interopRequireDefault(require("../LazyImage"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* React Packages */

/* App */

;
function NoticeBlock({
  handleClick,
  alt,
  src,
  title,
  body,
  buttonText,
  isFullscreen = true,
  lazyLoadImage = false
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `page flex ${isFullscreen ? 'fill-window' : ''}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_LazyDomAnimation.default, {
      children: [isFullscreen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Toolbar, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_framerMotion.m.div, {
        ..._props.SLIDEINUPINVIEW,
        className: "flex-grow block--centered block__body block--with-padding",
        children: [title && /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
          className: "typography-heading",
          children: title
        }), alt && src && lazyLoadImage ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_LazyImage.default, {
          src: src,
          alt: alt,
          width: "256px",
          height: "256px",
          containerClassName: "NoticeBlock__image"
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: src,
          alt: alt,
          width: "256px",
          height: "256px",
          className: "NoticeBlock__image"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: body
        })]
      }), handleClick && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_framerMotion.m.div, {
        ..._props.FADEIN_INVIEW,
        className: "block__body",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "block--with-margin-x flex",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
            onClick: handleClick,
            variant: "contained",
            style: {
              visibility: handleClick !== undefined ? "visible" : "hidden"
            },
            className: "button--full",
            children: buttonText
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})]
      })]
    })
  });
}
var _default = exports.default = NoticeBlock;