"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _authReducer = require("../../reducers/authReducer");
var _LabeledAvatar = _interopRequireDefault(require("./LabeledAvatar"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
function UserAvatar({
  ...props
}) {
  const testResult = (0, _authReducer.useUserProfile)("testResult");
  const characterId = testResult && testResult.tripCharacter.id ? testResult.tripCharacter.id : "user";
  (0, _react.useEffect)(() => {
    console.log(`[UserAvatar] characterId=${characterId}`);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LabeledAvatar.default, {
    characterId: characterId,
    ...props
  });
}
var _default = exports.default = UserAvatar;