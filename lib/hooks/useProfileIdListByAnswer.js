"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _chemistryReducer = require("../reducers/chemistryReducer");
const useProfileIdListByAnswer = (testName, answer) => {
  const [userList, setProfileList] = (0, _react.useState)([]);
  const [ascendingOrder, setAscendingOrder] = (0, _react.useState)(-1);
  const testAnswerObject = (0, _chemistryReducer.useTestAnswerObject)(testName);

  /* Debug */
  (0, _react.useEffect)(() => {
    console.log(`[useProfileIdListByAnswer]: testAnswerObject Updated\n testName=${JSON.stringify(testName)} testAnswerObject=${JSON.stringify(testAnswerObject)}`);
    let userListTemp = [];
    Object.entries(testAnswerObject).forEach(([id, userAnswer]) => {
      if (userAnswer === answer) {
        userListTemp.push(id);
      }
    });
    setProfileList(userListTemp);
    setAscendingOrder(Array.from(new Set(Object.values(testAnswerObject))).sort().indexOf(answer));
  }, [testAnswerObject, answer, testName]);

  // useEffect(()=>{
  //     console.log(`[useProfileIdListByAnswer] ${answer}/${Object.values( testAnswerObject )} ascendingOrder=${ascendingOrder}`);
  // }, [ testAnswerObject, ascendingOrder ])

  return {
    userList,
    ascendingOrder
  };
};
var _default = exports.default = useProfileIdListByAnswer;