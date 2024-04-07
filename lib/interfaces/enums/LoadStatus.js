"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadStatus = void 0;
let LoadStatus = exports.LoadStatus = /*#__PURE__*/function (LoadStatus) {
  LoadStatus["REST"] = "rest";
  LoadStatus["PENDING"] = "pending";
  LoadStatus["SUCCESS"] = "success";
  LoadStatus["MISS"] = "miss";
  LoadStatus["FAIL"] = "fail";
  return LoadStatus;
}({});