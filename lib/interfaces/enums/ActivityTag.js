"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTag = void 0;
var _utils = require("../../utils/utils");
const ActivityTagList = ["PHOTO", "INSTA", "NETWORK", "EXTREME", "SWIM", "DRIVE", "WALK", "THEMEPARK", "MARKET", "HOTEL", "VLOG", "WAITING", "BAR", "CAFE", "SHOPPING", "SHOW"];
const ActivityTag = exports.ActivityTag = (0, _utils.enumFromList)(ActivityTagList);