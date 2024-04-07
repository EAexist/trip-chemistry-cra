"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _chemistryReducer = require("../../reducers/chemistryReducer");
var _LabeledAvatar = _interopRequireDefault(require("./LabeledAvatar"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
function FriendAvatar({
  id,
  ...props
}) {
  const {
    testResult,
    nickname
  } = (0, _chemistryReducer.useProfile)(id);
  const characterId = testResult && testResult.tripCharacter.id ? testResult.tripCharacter.id : "user";
  (0, _react.useEffect)(() => {
    console.log(`[FriendAvatar] characterId=${characterId}`);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LabeledAvatar.default, {
    characterId: characterId,
    nickname: nickname,
    ...props
  });
}
var _default = exports.default = FriendAvatar;