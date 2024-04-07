"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _useKakaoLogin = _interopRequireDefault(require("../../hooks/useKakaoLogin"));
var _LoadStatus = require("../../interfaces/enums/LoadStatus");
var _authReducer = require("../../reducers/authReducer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* React Packages */

;
function KakaoAuthRedirectPage({}) {
  /* Hooks */
  const [searchParams] = (0, _reactRouterDom.useSearchParams)();
  const loginRedirectPath = searchParams.get('state');
  const dispatch = (0, _reactRedux.useDispatch)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const authorize = (0, _authReducer.useAuthorize)();
  const userProfile = (0, _authReducer.useUserProfile)();
  (0, _useKakaoLogin.default)();

  /* Reducers */
  const [authLoadStatus, setAuthLoadStatus] = (0, _authReducer.useAuthLoadStatus)();
  (0, _react.useEffect)(() => {
    /* 카카오 로그인 성공시 권한 부여, 로컬 스토리지에 정보 저장 및 loadStatus 정리. */
    if (authLoadStatus === _LoadStatus.LoadStatus.SUCCESS) {
      console.log(`[KakaoAuthRedirectPage] kakaoAccessToken=${userProfile.kakaoAccessToken}`);
      window.localStorage.setItem("kakaoAccessToken", userProfile.kakaoAccessToken);
      authorize();
      /* [ 게스트 -> 카카오 계정으로 전환한 경우 ]
          닉네임 초기화 없이 바로 리다이렉트 */
      navigate(`${loginRedirectPath ? loginRedirectPath : "home"}`);
      setAuthLoadStatus(_LoadStatus.LoadStatus.REST);
    }
  }, [authLoadStatus, authorize, setAuthLoadStatus, userProfile]);
  (0, _react.useEffect)(() => {
    dispatch((0, _authReducer.disableAutoLogin)());
  }, [dispatch]);
  return null;
}
var _default = exports.default = KakaoAuthRedirectPage;