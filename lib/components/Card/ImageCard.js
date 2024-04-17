"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
;
const ImageCard = ({
  sx,
  title,
  src,
  gradient,
  children,
  className,
  ...props
}) => {
  const backgrounSx = src === undefined ? {} : {
    background: `url("${src}")${gradient === "bottom" ? `, linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,0.2) 64%, rgba(0,0,0,0.9))` : ""}`,
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply'
  };
  (0, _react.useEffect)(() => {
    console.log(`background= ${backgrounSx.background}`);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Card, {
    sx: {
      borderRadius: "16px",
      title: title,
      ...sx,
      ...backgrounSx
    },
    className: `ImageCard ${className}`,
    ...props,
    children: children
  });
};
var _default = exports.default = ImageCard;