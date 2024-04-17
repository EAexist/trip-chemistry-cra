"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _AppBar = _interopRequireDefault(require("../components/AppBar/AppBar"));
var _AppBarContext = require("../components/AppBar/AppBarContext");
var _LoadRequiredContent = require("../content/LoadRequiredContent");
var _HelmetWrapper = _interopRequireDefault(require("../helmet/HelmetWrapper"));
var _authReducer = require("../reducers/authReducer");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
function Page({}) {
  /* Hooks */
  const dispatch = (0, _reactRedux.useDispatch)();
  const authorize = (0, _authReducer.useAuthorize)();
  const [searchParams] = (0, _reactRouterDom.useSearchParams)();
  const guestId = searchParams.get('guestId');
  const isAutoLoginEnabaled = (0, _authReducer.useIsAutoLoginEnabled)();

  /* States */

  /* Event Handlers  */
  const handleSuccess = () => {
    dispatch((0, _authReducer.disableAutoLogin)());
    authorize();
  };
  const handleFail = () => {
    window.localStorage.setItem("kakaoAccessToken", "");
    dispatch((0, _authReducer.disableAutoLogin)());
  };

  /* Effects */

  /* 로컬 스토리지에 카카오 액세스 토큰이 남아 있을 경우 해당 정보를 이용해 로그인 */
  (0, _react.useEffect)(() => {
    if (isAutoLoginEnabaled) {
      const kakaoAccessToken = window.localStorage.getItem("kakaoAccessToken");
      console.log(`[Page] useEffect\n\tkakaoAccessToken=${kakaoAccessToken}`);
      if (kakaoAccessToken) {
        dispatch((0, _authReducer.asyncKakaoLoginByAccessToken)({
          accessToken: kakaoAccessToken
        }));
      } else {
        dispatch((0, _authReducer.disableAutoLogin)());
      }
    }
  }, [isAutoLoginEnabaled, dispatch]);

  /* Guest 접속 주소일 경우 주소의 id를 이용해 게스트로 로그인. */

  (0, _react.useEffect)(() => {
    if (guestId) {
      console.log(`[Page] useEffect guestId=${guestId}`);
      dispatch((0, _authReducer.asyncGuestLogin)(guestId));
    }
  }, [guestId, dispatch]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_AppBarContext.AppBarContextProvider, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HelmetWrapper.default, {
      title: "여행 타입 테스트",
      description: "여행 타입 테스트로 친구들과 함께 떠나는 여행 준비하기. 나의 여행 MBTI는 뭘까? 여행 계획, 여행 일정, 여행 예산, 그리고 여행지까지 서로 다른 취향을 맞춰봐!",
      keywords: "여행, 여행 일정, 여행지, 여행 계획, 여행 예산, 국내여행, 해외여행, MBTI",
      url: "https://eaexist.github.io/tripchemistry",
      image: "/static/images/meta/social-meta-iamge.jpg"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.ScrollRestoration, {
      getKey: (location, matches) => {
        console.log(`[ScrollRestoration] ${location.pathname}`);
        return location.pathname;
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_LoadRequiredContent.AuthLoadRequiredContent, {
      isEnabled: isAutoLoginEnabaled,
      handleFail: handleFail,
      handleSuccess: handleSuccess,
      showHandleFailButton: false,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_AppBar.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Outlet, {})]
    })]
  });
}
var _default = exports.default = Page;