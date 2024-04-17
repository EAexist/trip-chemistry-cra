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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
    container: true,
    columns: Object.keys(strings.answers).length,
    children: Object.values(strings.answers).map(({
      icon,
      display,
      label,
      value
    }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
      item: true,
      xs: 1,
      display: "flex",
      justifyContent: "center",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleLabeledButton.default, {
        contained: true,
        value: value,
        selected: value === answer,
        onChange: (_, value) => handleAnswerChange(value),
        label: label,
        size: "small",
        labelSize: "large",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "",
          style: {
            color: "inherit"
          },
          children: icon
        })
      }, value)
    }, value))
  });
}
var _default = exports.default = (0, _withTestAnswer.default)(AnswerButtonGroup);