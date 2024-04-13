"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _framerMotion = require("framer-motion");
var _LazyDomAnimation = _interopRequireDefault(require("../../motion/LazyDomAnimation"));
var _react2 = require("swiper/react");
var _AppBarContext = require("../../components/AppBar/AppBarContext");
var _TextFieldBlock = _interopRequireDefault(require("../../components/Block/TextFieldBlock"));
var _withReducer = _interopRequireDefault(require("../../hocs/withReducer"));
var _useCreateChemistry = _interopRequireDefault(require("../../hooks/useCreateChemistry"));
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _props = require("../../motion/props");
var _authReducer = require("../../reducers/authReducer");
var _chemistryReducer = _interopRequireWildcard(require("../../reducers/chemistryReducer"));
var _props2 = require("../../swiper/props");
var _LoadRequiredContent = _interopRequireWildcard(require("../LoadRequiredContent"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* React Packages */

/* App */

;
function CreateChemistryContent({}) {
  /* Constants */
  const maxTitleLength = 20;

  /* Hooks */
  const createChemistry = (0, _useCreateChemistry.default)();
  const navigate = (0, _useNavigateWithGuestContext.default)();
  const isAppBarHidden = (0, _AppBarContext.useHideAppbar)();

  /* Reducers */
  const [status, setStatus] = (0, _chemistryReducer.useChemistryLoadStatus)();
  const chemistryId = (0, _chemistryReducer.useChemistryId)();
  const getProfile = (0, _authReducer.useGetProfile)();

  /* States */
  const [title, setTItle] = (0, _react.useState)("친구들과의 일본 우정 여행");
  const [swiper, setSwiper] = (0, _react.useState)();
  const isInputAllowed = title.length > 0;
  const swiperRef = (0, _react.useRef)(null);

  /* Event Handlers */
  /* Swiper Navigation */
  const handleNavigatePrev = () => swiper?.slidePrev();
  const handleNavigateNext = () => swiper?.slideNext();

  /* Close & Confirm */
  const handleClose = () => {
    navigate('../../myChemistry', {
      state: {
        navigateDirection: 'prev'
      }
    });
  };
  const handleConfirm = () => {
    createChemistry(title);
  };
  const handleCreateChemistrySuccess = () => {
    getProfile();
  };
  const handleGetProfileSuccess = () => {
    navigate(`../../chemistry/${chemistryId}`);
  };

  /* TextFieldBlock */
  /* @TODO Prevent Redundant Names? */
  const isConfirmAllowed = true;
  const getIsValueAllowed = (0, _react.useCallback)(title => title.length <= maxTitleLength, [maxTitleLength]);
  const helperText = (0, _react.useCallback)(title => `${title.length}/${maxTitleLength}`, [maxTitleLength]);

  /* Side Effects */

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadRequiredContent.default, {
    status,
    setStatus,
    handleSuccess: handleCreateChemistrySuccess,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadRequiredContent.AuthLoadRequiredContent, {
      handleSuccess: handleGetProfileSuccess,
      children: isAppBarHidden && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LazyDomAnimation.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_framerMotion.m.div, {
          ..._props.SLIDEINLEFT,
          className: "page fill-window",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Toolbar, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
              edge: "start",
              "aria-label": "cancel",
              onClick: swiper?.isBeginning ? handleClose : handleNavigatePrev,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.NavigateBefore, {})
            }), swiper?.isEnd ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
              disabled: !isInputAllowed || !isConfirmAllowed,
              onClick: handleConfirm,
              variant: "text",
              "aria-label": "next",
              startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Done, {}),
              children: "\uD655\uC778"
            }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
              edge: "end",
              "aria-label": "next",
              onClick: handleNavigateNext,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.NavigateNext, {})
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.Swiper, {
            ..._props2.SWIPERPROPS_PAGE,
            ref: swiperRef,
            className: "",
            onSwiper: swiper => setSwiper(swiper),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.SwiperSlide, {
              className: "",
              children: ({
                isActive
              }) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "block--with-margin-x",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextFieldBlock.default, {
                  value: title,
                  setValue: setTItle,
                  getIsValueAllowed: getIsValueAllowed,
                  helperText: helperText,
                  title: "여행 제목을 입력해주세요.",
                  autoFocus: isActive
                })
              })
            }, "title")
          })]
        })
      })
    })
  });
}
var _default = exports.default = (0, _withReducer.default)(CreateChemistryContent)({
  chemistry: _chemistryReducer.default
}); // <SwiperSlide key={"0"} className=''>
// <div className="block--with-margin-x block__body--large">
//     <h2 className="typography-body">
//         연결 방식을 선택해주세요.
//     </h2>
//     <Grid container>
//         <Grid item xs={6}>
//             <ButtonBase sx={{ width: "100%" }}>
//                 <div className="block--with-margin-x">
//                     <Share fontSize={"large"} />
//                     <h2 className="typography-heading">
//                         링크
//                     </h2>
//                     <p>
//                         링크를 가진 누구나 간편하게 참여할 수 있어요.
//                     </p>
//                 </div>
//             </ButtonBase>
//         </Grid>
//         <Grid item xs={6}>
//             <ButtonBase sx={{ width: "100%" }}>
//                 <div className="block--with-margin-x">
//                     <PersonSearch fontSize={"large"} />
//                     <h2 className="typography-heading">
//                         친구 직접 추가하기
//                     </h2>
//                     <p>
//                         친구들을 직접 선택해 참여를 요청할 수 있어요.
//                     </p>
//                 </div>
//             </ButtonBase>
//         </Grid>
//     </Grid>
// </div>
// </SwiperSlide>