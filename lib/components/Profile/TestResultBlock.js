"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserTestResultBlock = exports.MotionTestResultBlock = void 0;
var _material = require("@mui/material");
var _ProfileImage = _interopRequireWildcard(require("./ProfileImage"));
var _texts = require("../../texts");
var _appConst = require("../../common/app-const");
var _withUserProfile = _interopRequireDefault(require("../../hocs/withUserProfile"));
var _withFriendProfile = _interopRequireDefault(require("../../hocs/withFriendProfile"));
var _authReducer = require("../../reducers/authReducer");
var _framerMotion = require("framer-motion");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
;
function TestResultBlock({
  id,
  testResult
}) {
  const tripTagToLabel = (0, _texts.useStrings)().public.tripTag;
  const userId = (0, _authReducer.useUserId)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "block__body",
    children: [id === userId ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProfileImage.UserProfileImage, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProfileImage.default, {
      id: id
    }), testResult.tripTagList.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
      justifyContent: "center",
      flexWrap: "wrap",
      rowGap: 1,
      children: testResult.tripTagList.map(tag => /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Chip, {
        icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Icon, {
          children: _appConst.TRIPTAG[tag]
        }),
        label: tripTagToLabel[tag]
      }, tag))
    })]
  });
}
var _default = exports.default = (0, _withFriendProfile.default)(TestResultBlock);
const MotionTestResultBlock = exports.MotionTestResultBlock = (0, _framerMotion.m)((0, _withFriendProfile.default)(TestResultBlock), {
  forwardMotionProps: true
});
const UserTestResultBlock = exports.UserTestResultBlock = (0, _withUserProfile.default)(TestResultBlock);