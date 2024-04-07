"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRedux = require("react-redux");
var _store = require("../store");
var _Page = _interopRequireDefault(require("./Page"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
function PageWrapper({}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRedux.Provider, {
    store: _store.store,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Page.default, {})
  });
}
var _default = exports.default = PageWrapper;