"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _material = require("@mui/material");
var _testAnswerReducer = require("../../../reducers/testAnswerReducer");
var _texts = require("../../../texts");
var _jsxRuntime = require("react/jsx-runtime");
;
const TagSetTestAnswerChip = ({
  testName,
  selected = true
}) => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const tagToLabel = (0, _texts.useStrings)().public.test[testName].tagSet;
  const tagSet = (0, _testAnswerReducer.useTagSetAnswer)(testName, selected);
  const handleClick = tag => {
    dispatch((0, _testAnswerReducer.addTagAnswer)({
      testName,
      tag
    }));
  };
  const handleDelete = tag => {
    dispatch((0, _testAnswerReducer.deleteTagAnswer)({
      testName,
      tag
    }));
  };
  (0, _react.useEffect)(() => {
    console.log(`[TagSetTestAnswerChip] testName=${testName} tagToLabel=${JSON.stringify(tagToLabel)} `);
  }, [testName, tagToLabel]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: tagSet.map(tag => /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Chip, {
      label: `${selected ? '# ' : ''}${tagToLabel[tag]}`,
      onClick: selected ? () => handleDelete(tag) : () => handleClick(tag)
      // onClick={ selected ? undefined : () => handleClick(tag) }
      // onDelete={ selected ? () => handleDelete(tag) :  undefined }
      ,
      variant: selected ? "filled" : "outlined",
      color: "primary"
    }, tag))
  });
};
var _default = exports.default = TagSetTestAnswerChip;