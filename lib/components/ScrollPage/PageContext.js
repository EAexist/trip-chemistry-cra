"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePage = exports.default = exports.PageContextProvider = void 0;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
;
const PageContext = /*#__PURE__*/(0, _react.createContext)({});
const usePage = () => (0, _react.useContext)(PageContext);
exports.usePage = usePage;
const PageContextProvider = ({
  value,
  children
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(PageContext.Provider, {
    value: value,
    children: children
  });
};
exports.PageContextProvider = PageContextProvider;
var _default = exports.default = PageContext;