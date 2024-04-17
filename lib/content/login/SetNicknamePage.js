"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _reactRedux = require("react-redux");
var _appConst = require("../../common/app-const");
var _RoutedMotionPage = _interopRequireDefault(require("../../motion/components/RoutedMotionPage"));
var _AppBarContext = _interopRequireWildcard(require("../../components/AppBar/AppBarContext"));
var _useSetNickname = _interopRequireDefault(require("../../hooks/useSetNickname"));
var _authReducer = require("../../reducers/authReducer");
var _TextFieldBlock = _interopRequireDefault(require("../../components/Block/TextFieldBlock"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* Externals */

/* App */

;
function SetNicknamePage({
  handleClose,
  doRequireInitialization
}) {
  /* Hooks */
  const setNickname = (0, _useSetNickname.default)();
  const isAppBarHidden = (0, _AppBarContext.useHideAppbar)();

  /* Reducers */
  const {
    nickname: currentNickname
  } = (0, _authReducer.useUserInfo)();
  const authProviderNickname = (0, _reactRedux.useSelector)(state => state.auth.data.profile.authProviderNickname);

  /* States */
  const [value, setValue] = (0, _react.useState)(currentNickname ? currentNickname : authProviderNickname ? authProviderNickname : "");
  const {
    setShow: setShowAppBar
  } = (0, _react.useContext)(_AppBarContext.default);
  const isInputAllowed = value.length > 0;

  /* Event Handlers */
  const handleConfirm = value => {
    setNickname(value);
  };
  const getIsConfirmAllowed = (0, _react.useCallback)(value => !doRequireInitialization && value === currentNickname, [doRequireInitialization, currentNickname]);
  const getIsValueAllowed = (0, _react.useCallback)(value => value.length <= _appConst.USER.maxNicknameLength, [_appConst.USER.maxNicknameLength]);
  const helperText = (0, _react.useCallback)(value => `${value.length}/${_appConst.USER.maxNicknameLength}`, [_appConst.USER.maxNicknameLength]);
  return isAppBarHidden && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RoutedMotionPage.default, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Toolbar, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
        "aria-label": "cancel",
        onClick: handleClose,
        edge: "start",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.NavigateBefore, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
        disabled: !isInputAllowed || getIsConfirmAllowed(value),
        onClick: () => handleConfirm(value),
        variant: "text",
        className: "",
        startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Done, {}),
        children: "\uD655\uC778"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextFieldBlock.default, {
      value: value,
      setValue: setValue,
      getIsValueAllowed: getIsValueAllowed,
      helperText: helperText,
      title: "사용할 이름을 입력해주세요.",
      className: "block--with-margin-x"
    })]
  });
}
var _default = exports.default = SetNicknamePage;