"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGoogleMapContext = exports.default = exports.GoogleMapContextProvider = void 0;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const GoogleMapContext = /*#__PURE__*/(0, _react.createContext)({});
const useGoogleMapContext = () => (0, _react.useContext)(GoogleMapContext);
exports.useGoogleMapContext = useGoogleMapContext;
const GoogleMapContextProvider = ({
  children,
  ...value
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(GoogleMapContext.Provider, {
  value: value,
  children: children
});
exports.GoogleMapContextProvider = GoogleMapContextProvider;
var _default = exports.default = GoogleMapContext;