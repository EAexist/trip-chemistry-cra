"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProfile = void 0;
var _ITestAnswer = require("./ITestAnswer");
var _ITestResult = require("./ITestResult");
;
const defaultProfile = exports.defaultProfile = {
  id: "",
  nickname: "",
  discriminator: "",
  testAnswer: _ITestAnswer.defaultTestAnswer,
  testResult: _ITestResult.defaultTestResult
};