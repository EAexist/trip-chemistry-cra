"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _testAnswerReducer = require("../reducers/testAnswerReducer");
var _jsxRuntime = require("react/jsx-runtime");
// import { BudgetResponse, SubTestName, TestAnswer, ITestName } from "../interface/interfaces";

;

/* HOC WithTestAnswer
    컴포넌트에 테스트 섹션 정보와 해당 정보에 대응하는 testAnswer 리듀서 state 와 setter 함수를 연결.   */
const withTestAnswer = WrappedComponent => ({
  testName,
  ...props
}) => {
  const [answer, setAnswer] = (0, _testAnswerReducer.useTestAnswer)(testName);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
    testName,
    answer,
    setAnswer: value => {
      setAnswer({
        testName,
        value
      });
    },
    ...props
  });
};
var _default = exports.default = withTestAnswer;