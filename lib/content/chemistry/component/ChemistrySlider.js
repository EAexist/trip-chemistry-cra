"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _useValueToProfileIdList = _interopRequireDefault(require("../../../hooks/useValueToProfileIdList"));
var _useProfileIdListByAnswer = _interopRequireDefault(require("../../../hooks/useProfileIdListByAnswer"));
var _FriendAvatar = _interopRequireDefault(require("../../../components/Avatar/FriendAvatar"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
const SliderValueLabel = ({
  testName,
  value
}) => {
  const {
    userList
  } = (0, _useProfileIdListByAnswer.default)(testName, value);
  return userList.length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
    className: "Slider__value",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      className: "typography-label",
      children: value
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
      spacing: 0.5,
      children: userList.map(id => /*#__PURE__*/(0, _jsxRuntime.jsx)(_FriendAvatar.default, {
        id: id
      }, id))
    })]
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "Slider__value"
  });
};
function ChemistrySlider({
  testName,
  ...sliderOwnProps
}) {
  const budgetAnswerToProfiles = (0, _useValueToProfileIdList.default)(testName);
  const marks = Array.from({
    length: (sliderOwnProps.max - sliderOwnProps.min) / sliderOwnProps.step + 1
  }, (value, index) => sliderOwnProps.max - index * sliderOwnProps.step);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
    alignItems: 'stretch',
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
      alignItems: 'stretch',
      className: "Slider",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Slider, {
        sx: {
          // '& input[type="range"]': {
          //     WebkitAppearance: 'slider-vertical',
          // },
          height: 300,
          zIndex: 1
        },
        getAriaLabel: () => `friends' restaurant budget preference`,
        orientation: "vertical",
        size: "small",
        value: Object.keys(budgetAnswerToProfiles).map(answer => Number(answer)),
        marks: true,
        ...sliderOwnProps
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "flex",
      children: marks.map(value => /*#__PURE__*/(0, _jsxRuntime.jsx)(SliderValueLabel, {
        testName: testName,
        value: value
      }, value))
    })]
  });
}
var _default = exports.default = ChemistrySlider;
/* Deprecated */
// interface ValueLabelComponentProps extends SliderValueLabelProps {
//     testName: ITestName;
// }
// const valueLabelComponent = (testName: ITestName) => ({ value, children }: SliderValueLabelProps) => {
//     const { userList, ascendingOrder } = useProfileIdListByAnswer(testName, value);
//     const isEven = ascendingOrder % 2 === 0;
//     return (
//         <Tooltip open={true} placement={isEven ? "left" : "right"} className="Slider__value-label" title={
//             <Stack flexDirection={isEven ? "row-reverse" : "row"}>
//                 <h2 className="typography-label">{value}</h2>
//                 <Stack>
//                     {
//                         userList.map((id) => (
//                             <AvatarProfile id={id} />
//                         ))
//                     }
//                 </Stack>
//             </Stack>
//         }
//         >
//             {children}
//         </Tooltip>
//     );
// }