"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _chemistryReducer = require("../reducers/chemistryReducer");
;
const useValueToProfileIdList = testName => {
  /* @TODO 완성 후 testAnswerDefault 제거 */
  // const testAnswerDefault = useSelector(( state:RootState )=>(state.testAnswer.data[testName.testName][testName.subTestName]));

  const [valueToProfileList, setValueToProfileIdList] = (0, _react.useState)({});
  const testAnswerObject = (0, _chemistryReducer.useTestAnswerObject)(testName);

  /* Debug */
  (0, _react.useEffect)(() => {
    console.log(`[useValueToProfileIdList]: testAnswerObject Updated\n testName=${JSON.stringify(testName)} testAnswerObject=${JSON.stringify(testAnswerObject)}`);
    let valueToProfileListTemp = {};
    valueToProfileListTemp = {};
    Object.entries(testAnswerObject).forEach(([id, value]) => {
      const value_ = value?.toString();
      if (value_) {
        if (Object.keys(valueToProfileListTemp).includes(value_)) {
          valueToProfileListTemp[value_].push(id);
        } else {
          valueToProfileListTemp[value_] = [id];
        }
      }
    });
    setValueToProfileIdList(valueToProfileListTemp);
  }, [testAnswerObject, testName]);
  (0, _react.useEffect)(() => {
    console.log(`[useValueToProfileIdList]: valueToProfileList=${JSON.stringify(valueToProfileList)}}`);
  }, [valueToProfileList]);
  return valueToProfileList;
};
var _default = exports.default = useValueToProfileIdList;