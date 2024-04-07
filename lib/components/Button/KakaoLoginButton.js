"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _auth = require("../../common/auth");
var _getImgSrc = _interopRequireWildcard(require("../../utils/getImgSrc"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* React */

/* React Packages */

/* App */

;
function KakaoLoginButton({}) {
  const {
    state,
    pathname
  } = (0, _reactRouterDom.useLocation)();
  const [url, setUrl] = (0, _react.useState)(_auth.KAKAO_AUTH_URL_BASE);

  /* Reducers */
  (0, _react.useEffect)(() => {
    const urlObject = new URL(url);
    if (state !== null && state.loginRedirectPath) {
      console.log(`[KakaoLoginButton] loginRedirectPath=${state.loginRedirectPath}`);
      urlObject.searchParams.set('state', state.loginRedirectPath);
    } else {
      console.log(`[KakaoLoginButton] pathname=${pathname}`);
      urlObject.searchParams.set('state', pathname);
    }
    setUrl(urlObject.toString());
  }, [state, pathname, url]);
  (0, _react.useEffect)(() => {
    const urlObject = new URL(url);
    urlObject.searchParams.set('client_id', `${process.env.REACT_APP_KAKAO_REST_API_KEY}`);
    urlObject.searchParams.set('redirect_uri', `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`);
    urlObject.searchParams.set('response_type', 'code');
    setUrl(urlObject.toString());
  }, []);
  (0, _react.useEffect)(() => {
    console.log(`[KakaoLoginButton]\n\turl=${url}`);
  }, [url]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    href: url,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ButtonBase, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        height: '45px',
        width: '183px',
        src: (0, _getImgSrc.default)("/kakao", "kakao_login_large_narrow", _getImgSrc.FORMATWEBP),
        alt: "kakao_login",
        className: "width-full"
      })
    })
  });
}
var _default = exports.default = KakaoLoginButton;