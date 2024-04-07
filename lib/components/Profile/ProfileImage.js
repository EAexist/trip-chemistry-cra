"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserProfileImage = void 0;
var _withFriendProfile = _interopRequireDefault(require("../../hocs/withFriendProfile"));
var _withUserProfile = _interopRequireDefault(require("../../hocs/withUserProfile"));
var _getImgSrc = _interopRequireWildcard(require("../../utils/getImgSrc"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
function ProfileImage({
  renderLabel,
  showCharacterLabel = true,
  id,
  nickname,
  testResult
}) {
  const tripCharacter = testResult.tripCharacter;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "block--centered",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      src: (0, _getImgSrc.default)('/character', tripCharacter.id, _getImgSrc.FORMATWEBP),
      alt: nickname,
      className: "ProfileImage__image",
      width: "192px",
      height: "192px"
    }), renderLabel === undefined ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
        className: "typography-label",
        children: nickname
      }), showCharacterLabel && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "typography-note",
        children: tripCharacter.name
      })]
    }) : renderLabel(id)]
  });
}
var _default = exports.default = (0, _withFriendProfile.default)(ProfileImage);
const UserProfileImage = exports.UserProfileImage = (0, _withUserProfile.default)(ProfileImage);