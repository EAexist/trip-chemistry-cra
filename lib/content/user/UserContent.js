"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _reactRedux = require("react-redux");
var _UserAvatar = _interopRequireDefault(require("../../components/Avatar/UserAvatar"));
var _KakaoLoginButton = _interopRequireDefault(require("../../components/Button/KakaoLoginButton"));
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _AuthProvider = require("../../interfaces/enums/AuthProvider");
var _RoutedMotionPage = _interopRequireDefault(require("../../motion/components/RoutedMotionPage"));
var _authReducer = require("../../reducers/authReducer");
var _LoadRequiredContent = require("../LoadRequiredContent");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* Externals */

/* App */

;
function UserContent({}) {
  /* Hooks */
  const dispatch = (0, _reactRedux.useDispatch)();
  const navigate = (0, _useNavigateWithGuestContext.default)();

  /* Reducers */
  const {
    id,
    authProvider,
    nickname
  } = (0, _authReducer.useUserProfile)();

  /* Event Handlers */
  const handleClickAvatar = () => {
    // if (!hasAnsweredTest) {
    //     navigate('avatarGallery');
    // }
  };
  const handleLogout = () => {
    dispatch((0, _authReducer.asyncKakaoLogout)(id));
  };
  const handleLogoutSuccess = () => {
    window.localStorage.setItem("kakaoAccessToken", "");
  };
  const handleEdit = () => {
    navigate('setNickname', {
      state: {
        navigateDirection: 'next'
      }
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadRequiredContent.AuthLoadRequiredContent, {
    handleSuccess: handleLogoutSuccess,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RoutedMotionPage.default, {
      className: "flex fill-window",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Toolbar, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex-grow block--centered block__body--large",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ButtonBase, {
            onClick: handleClickAvatar,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UserAvatar.default, {
              sx: {
                height: "128px",
                width: "128px"
              },
              showLabel: false
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Toolbar, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
              edge: "start",
              onClick: handleEdit,
              disabled: true,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Icon, {})
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              className: "typography-heading  typography-heading--large",
              children: nickname
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
              edge: "end",
              "aria-label": "edit",
              onClick: handleEdit,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Edit, {})
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
            direction: 'column',
            children: _AuthProvider.AuthProvider[authProvider] === _AuthProvider.AuthProvider.GUEST ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_KakaoLoginButton.default, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
              onClick: handleLogout,
              variant: "outlined",
              children: "\uB85C\uADF8\uC544\uC6C3"
            })
          })
        })]
      }), _AuthProvider.AuthProvider[authProvider] === _AuthProvider.AuthProvider.GUEST && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "block--with-margin block--with-margin--large block--centered",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          className: "typography-note block--width-large",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Help, {
            fontSize: "inherit"
          }), "카카오 로그인을 이용하면\n링크를 잃어버려도 내 테스트 결과를 안전하게 불러올 수 있어요."]
        })
      })]
    })
  });
}
var _default = exports.default = UserContent;