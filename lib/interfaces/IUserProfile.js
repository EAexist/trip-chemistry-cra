"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultUserProfile = void 0;
var _IProfile = require("./IProfile");
;
const defaultUserProfile = exports.defaultUserProfile = {
  ..._IProfile.defaultProfile,
  authProvider: "",
  kakaoAccessToken: "",
  // authProviderNickname: "",
  chemistryIdList: []
};