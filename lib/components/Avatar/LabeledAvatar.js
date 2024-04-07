"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _getImgSrc = _interopRequireWildcard(require("../../utils/getImgSrc"));
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
;
function LabeledAvatar({
  characterId,
  showLabel = true,
  labelSize,
  nickname,
  testResult,
  className,
  ...props
}) {
  const imageId = characterId ? characterId : testResult ? testResult.tripCharacter.id : "";
  const theme = (0, _material.useTheme)();
  (0, _react.useEffect)(() => {
    console.log(`[LabeledAvatar] imageId=${imageId}`);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
    spacing: 0.75,
    direction: "column",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Avatar, {
      alt: nickname,
      src: (0, _getImgSrc.default)('/character', imageId, _getImgSrc.FORMATWEBP),
      className: `profile__avatar ${className}`,
      style: {
        backgroundColor: theme.palette.primary.light
      },
      ...props
    }), showLabel && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: `Profile__label Profile__label-${labelSize} typography--profile-label`,
      children: nickname
    })]
  });
}
var _default = exports.default = LabeledAvatar;