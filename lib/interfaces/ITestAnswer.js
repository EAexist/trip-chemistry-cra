"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testAnswerToDTO = exports.defaultTestAnswer = void 0;
var _ActivityTag = require("./enums/ActivityTag");
var _ExpectationTag = require("./enums/ExpectationTag");
;
;
const defaultTestAnswer = exports.defaultTestAnswer = {
  expectation: {
    selected: [],
    unSelected: Object.values(_ExpectationTag.ExpectationTag)
  },
  activity: {
    selected: [],
    unSelected: Object.values(_ActivityTag.ActivityTag)
  },
  leadership: undefined,
  schedule: undefined,
  food: undefined,
  /* 식사 평균 */
  // foodSpecial: undefined, /* 특별한 식사 */
  // accomodate: undefined, /* 숙소 평균 */
  // accomodateSpecial: undefined, /* 특별한 숙소 */

  metropolis: undefined,
  history: undefined,
  nature: undefined
};
const testAnswerToDTO = testAnswer => ({
  ...testAnswer,
  expectation: testAnswer.expectation.selected,
  activity: testAnswer.activity.selected
});
exports.testAnswerToDTO = testAnswerToDTO;