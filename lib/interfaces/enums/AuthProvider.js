"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthProvider = void 0;
var _utils = require("../../utils/utils");
const AuthProviderList = ["NONE", "GUEST", "KAKAO"];
const AuthProvider = exports.AuthProvider = (0, _utils.enumFromList)(AuthProviderList);