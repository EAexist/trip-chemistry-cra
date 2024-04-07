"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _appConst = require("../../../common/app-const");
var _ToggleLabeledButton = _interopRequireDefault(require("../../../components/Button/ToggleLabeledButton"));
var _withTestAnswer = _interopRequireDefault(require("../../../hocs/withTestAnswer"));
var _texts = require("../../../texts");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
function AnswerButtonGroup({
  testName,
  answer,
  setAnswer
}) {
  const strings = Object((0, _texts.useStrings)().public.contents.test.test)[_appConst.TEST_SECTIONS[testName].type];
  const handleAnswerChange = value => {
    setAnswer(value);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
    direction: "row",
    spacing: 2,
    justifyContent: "space-around",
    alignItems: "stretch",
    className: "ButtonGroup--in-body",
    height: "96px",
    children: Object.values(strings.answers).map(({
      icon,
      display,
      label,
      value
    }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleLabeledButton.default, {
      contained: true,
      value: value,
      selected: value === answer,
      onChange: (_, value) => handleAnswerChange(value),
      label: label,
      labelSize: "xlarge",
      paperSx: {},
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "",
        style: {
          color: "inherit"
        },
        children: icon
      })
    }, value))
  });
}
var _default = exports.default = (0, _withTestAnswer.default)(AnswerButtonGroup);