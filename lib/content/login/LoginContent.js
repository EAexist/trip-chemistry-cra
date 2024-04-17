"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _material = require("@mui/material");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _iconsMaterial = require("@mui/icons-material");
var _auth = require("../../common/auth");
var _KakaoLoginButton = _interopRequireDefault(require("../../components/Button/KakaoLoginButton"));
var _RoutedMotionPage = _interopRequireDefault(require("../../motion/components/RoutedMotionPage"));
var _authReducer = require("../../reducers/authReducer");
var _LoadRequiredContent = require("../LoadRequiredContent");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* Externals */

/* App */

;
function LoginContent({}) {
  const dispatch = (0, _reactRedux.useDispatch)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const {
    pathname
  } = (0, _reactRouterDom.useLocation)();
  const [url, setUrl] = (0, _react.useState)(_auth.KAKAO_AUTH_URL_BASE);

  /* Reducers */
  const doRequireInitialization = (0, _reactRedux.useSelector)(state => state.auth.data.doRequireInitialization);
  const handleAuthSuccess = () => {
    /* If user has logined before, fetch the profile. Else, InitializeNicknameContent (/initializeNickname) handles the process. */
    if (!doRequireInitialization) {
      dispatch((0, _authReducer.authorize)());
    } else {
      navigate('/login/initializeNickname', {
        state: {
          loginRedirectPath: pathname
        }
      });
    }
  };
  const handleGuestSignIn = () => {
    dispatch((0, _authReducer.asyncGuestSignIn)());
  };
  (0, _react.useEffect)(() => {
    console.log(`[LoginContent] pathname=${pathname}`);
    const urlObject = new URL(url);
    urlObject.searchParams.set('state', pathname);
    setUrl(urlObject.toString());
  }, [url, pathname]);
  (0, _react.useEffect)(() => {
    const urlObject = new URL(url);
    urlObject.searchParams.set('client_id', `${process.env.REACT_APP_KAKAO_REST_API_KEY}`);
    urlObject.searchParams.set('redirect_uri', `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`);
    urlObject.searchParams.set('response_type', 'code');
    setUrl(urlObject.toString());
  }, []);
  (0, _react.useEffect)(() => {
    console.log(`[LoginContent]\n\turl=${url}`);
  }, [url]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadRequiredContent.AuthLoadRequiredContent, {
    handleSuccess: handleAuthSuccess,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RoutedMotionPage.default, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Toolbar, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex-grow block--centered-row block__body--large",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            marginTop: "128px"
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
          className: "typography-heading",
          children: "\uB85C\uADF8\uC778 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Grid, {
            container: true,
            direction: "column",
            rowSpacing: 2,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
              item: true,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_KakaoLoginButton.default, {})
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
              item: true,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
                onClick: handleGuestSignIn,
                variant: "contained",
                sx: {
                  width: '183px',
                  height: '45px'
                },
                children: "\uAC8C\uC2A4\uD2B8 \uB85C\uADF8\uC778"
              })
            })]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            marginTop: "128px"
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            className: "typography-note",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Help, {
              fontSize: "inherit"
            }), "카카오 로그인을 이용하면\n링크를 잃어버려도 테스트 결과를 안전하게 불러올 수 있어요."]
          })
        })]
      })]
    })
  });
}
var _default = exports.default = LoginContent;