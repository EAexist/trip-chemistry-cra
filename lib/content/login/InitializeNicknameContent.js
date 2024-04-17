"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _framerMotion = require("framer-motion");
var _reactRedux = require("react-redux");
var _LazyDomAnimation = _interopRequireDefault(require("../../motion/LazyDomAnimation"));
var _reactRouterDom = require("react-router-dom");
var _props = require("../../motion/props");
var _authReducer = require("../../reducers/authReducer");
var _LoadRequiredContent = require("../LoadRequiredContent");
var _SetNicknamePage = _interopRequireDefault(require("./SetNicknamePage"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* Externals */

/* App */

;
function InitializeNicknameContent({}) {
  /* Hooks */
  const {
    state
  } = (0, _reactRouterDom.useLocation)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const navigate = (0, _reactRouterDom.useNavigate)();

  /* States */
  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] = (0, _react.useState)(false);

  /* Reducers */
  const {
    id: userId,
    authProvider
  } = (0, _authReducer.useUserProfile)();

  /* Event Handlers */
  const handleClose = () => {
    setIsConfirmCancelModalOpen(true);
  };
  const handleCancelLogin = () => {
    navigate(`${state !== null && state.loginRedirectPath ? state.loginRedirectPath : ""}`, {
      state: {
        navigateDirection: 'prev'
      }
    });
  };
  const handleCloseConfirmCancelModal = () => {
    setIsConfirmCancelModalOpen(false);
  };
  const handleSuccess = () => {
    // dispatch(asyncGetSampleProfiles());
    dispatch((0, _authReducer.setIsInitialized)());
    dispatch((0, _authReducer.authorize)());
    navigate(`${state !== null && state.loginRedirectPath ? state.loginRedirectPath : "home"}${authProvider === 'GUEST' ? `?guestId=${userId}` : ''}`);
  };
  return (
    /* Allow access by navigate( path, { state: {loginRedirectPath} }) only.
        Redirect access by URL to Homepage.
    */
    state && state.loginRedirectPath ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadRequiredContent.AuthLoadRequiredContent, {
      handleSuccess: handleSuccess,
      children:
      /*#__PURE__*/
      // doRequireInitialization ?
      (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [isConfirmCancelModalOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LazyDomAnimation.default, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.div, {
            ..._props.SLIDEINUPINVIEW,
            className: "page fill-window flex",
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "block--with-margin-lg block__body--large block--centered flex-grow",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
                className: "typography-label",
                children: `닉네임을 설정 중이에요.\n취소하고 처음으로 돌아갈까요?`
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Grid, {
                container: true,
                columnSpacing: 4,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
                  item: true,
                  xs: 6,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
                    onClick: handleCloseConfirmCancelModal,
                    startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Close, {}),
                    children: "\uB85C\uADF8\uC778 \uACC4\uC18D\uD558\uAE30"
                  })
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
                  item: true,
                  xs: 6,
                  display: "flex",
                  justifyContent: "center",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
                    onClick: handleCancelLogin,
                    startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Done, {}),
                    children: "\uD655\uC778"
                  })
                })]
              })]
            })
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SetNicknamePage.default, {
          handleClose: handleClose,
          doRequireInitialization: true
        })]
      })
      // : <></>
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Navigate, {
      to: '/home'
    })
  );
}
var _default = exports.default = InitializeNicknameContent;