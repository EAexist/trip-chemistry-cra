"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpectationTag = void 0;
var _utils = require("../../utils/utils");
const ExpectationTagList = ["HEAL", "COMPACT", "FULLFILL", "MEMORY", "RELAX", "COMFORT", "ADVENTURE", "NEW", "DIGITAL_DETOX", "REST", "VIEW", "FRIENDSHIP"];
const ExpectationTag = exports.ExpectationTag = (0, _utils.enumFromList)(ExpectationTagList);