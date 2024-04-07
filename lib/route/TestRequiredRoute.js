"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _reactRedux = require("react-redux");
var _NoticeBlock = _interopRequireDefault(require("../components/Block/NoticeBlock"));
var _authReducer = require("../reducers/authReducer");
var _getImgSrc = _interopRequireWildcard(require("../utils/getImgSrc"));
var _useNavigateWithGuestContext = _interopRequireDefault(require("../hooks/useNavigateWithGuestContext"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* React Packages */

/* App */

;
function TestRequiredRoute({}) {
  const navigate = (0, _useNavigateWithGuestContext.default)();

  /* Reducers */
  const nickname = (0, _reactRedux.useSelector)(state => state.auth.data.profile.nickname);
  const hasAnsweredTest = (0, _authReducer.useHasAnsweredTest)();

  /* Event Handlers */
  const handleHasNotAnsweredTest = () => {
    navigate('test');
  };
  return hasAnsweredTest ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Outlet, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_NoticeBlock.default, {
    alt: "miss",
    src: (0, _getImgSrc.default)('/info', "MISS", _getImgSrc.FORMATWEBP),
    body: `${nickname} 님의 여행은 어떤 모습일까요?\n테스트를 완료하고 결과를 확인해보세요.`,
    buttonText: "테스트하러 가기",
    handleClick: handleHasNotAnsweredTest
  });
}
var _default = exports.default = TestRequiredRoute;