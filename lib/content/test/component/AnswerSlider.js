"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _withTestAnswer = _interopRequireDefault(require("../../../hocs/withTestAnswer"));
var _priceText = require("../../../utils/priceText");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
function AnswerSlider({
  testName,
  answer,
  setAnswer,
  ...sliderOwnProps
}) {
  // const strings = useStrings().public.contents.test;   

  const handleAnswerChange = (event, newValue) => {
    setAnswer(newValue);
    // onChange( newValue as number );
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Slider, {
    size: "small",
    "aria-label": "budget",
    valueLabelDisplay: "auto",
    getAriaValueText: _priceText.priceText,
    value: answer,
    onChange: handleAnswerChange,
    marks: true,
    ...sliderOwnProps
  });
}
var _default = exports.default = (0, _withTestAnswer.default)(AnswerSlider);