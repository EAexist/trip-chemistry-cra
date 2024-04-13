"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _iconsMaterial = require("@mui/icons-material");
var _appConst = require("../../../common/app-const");
var _texts = require("../../../texts");
var _withIsTestAnswered = _interopRequireDefault(require("../../../hocs/withIsTestAnswered"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
function TestInstruction({
  testName,
  isAnswered,
  className,
  showBackdrop = false
}) {
  const strings = (0, _texts.useStrings)().public.contents.test.test;
  const instruction = strings[_appConst.TEST_SECTIONS[testName].type].instruction;
  return isAnswered ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `${className} ${showBackdrop ? "backdrop" : ""}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
      justifyContent: "center",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Help, {
        className: "typography-body"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
        className: "typography--center typography-note",
        children: instruction
      })]
    })
  });
}
var _default = exports.default = (0, _withIsTestAnswered.default)(TestInstruction);