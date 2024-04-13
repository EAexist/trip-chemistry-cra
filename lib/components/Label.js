"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
;
function Label({
  label,
  labelSize = 'medium',
  children,
  isActive = false
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "Label block__body--large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "body__head",
      children: children
    }), label !== undefined && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: `Label__label-${labelSize} typography--profile-label ${isActive ? "typography--profile-label--active" : ""}`,
      children: label
    })]
  });
}
var _default = exports.default = Label;