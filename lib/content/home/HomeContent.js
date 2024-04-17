"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _material = require("@mui/material");
require("swiper/css");
require("swiper/css/autoplay");
require("swiper/css/pagination");
var _modules = require("swiper/modules");
var _react2 = require("swiper/react");
var _swiper = require("../../swiper");
var _PaginationDiv = _interopRequireDefault(require("../../swiper/components/PaginationDiv"));
var _SwiperAutoplayProgress = _interopRequireDefault(require("../../swiper/components/SwiperAutoplayProgress"));
var _texts = require("../../texts");
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* Externals */

/* Swiper */

;
function HomeContent({}) {
  /* Constants */
  const strings = (0, _texts.useStrings)().public.contents.home;

  /* Hookes */
  const navigate = (0, _useNavigateWithGuestContext.default)();

  /* States */
  const [showFloatingButton] = (0, _react.useState)(true);
  const [swiper, setSwiper] = (0, _react.useState)();

  /* Reducers */

  /* Event Handlers */
  const handleTestStart = () => {
    navigate('/test');
  };

  /* Swiper */
  const SWIPERPROPS_HOMECONTENT = {
    modules: [_modules.Pagination, _modules.Autoplay],
    loop: true,
    // rewind: true,
    speed: _swiper.SWIPER_SPEED,
    slidesPerView: 1,
    pagination: {
      clickable: true,
      el: '.pageSwiper-pagination'
    },
    // autoHeight: true,
    autoplay: {
      delay: _swiper.AUTOPLAY_DELAY,
      disableOnInteraction: false
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "page",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_react2.Swiper, {
      ...SWIPERPROPS_HOMECONTENT,
      onSwiper: swiper => {
        setSwiper(swiper);
      },
      className: "flex fill-window",
      style: {
        display: 'flex'
      },
      children: [strings.sections.map(({
        title,
        body
      }, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react2.SwiperSlide, {
        style: {
          overflowY: 'visible',
          display: 'flex',
          flexDirection: 'column'
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Toolbar, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "block--with-margin-x block__body--large flex-grow flex",
          style: {
            justifyContent: "end"
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            className: "typography-heading",
            children: title
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "",
            children: body
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            position: "absolute",
            width: "100%"
          },
          className: "fill-window"
        })]
      }, title)), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        slot: "container-end",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "block--with-margin-x block__body--large",
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
            children: [swiper && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SwiperAutoplayProgress.default, {
              swiper: swiper
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaginationDiv.default, {
              className: "pageSwiper-pagination pagination__bullets"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "floating-placeholder--bottom",
          style: {
            visibility: 'hidden'
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "block--with-margin-x flex",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
              children: strings.startButton
            })
          })
        })]
      })]
    }), showFloatingButton && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "floating--bottom flex",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
        onClick: handleTestStart,
        variant: "contained",
        className: "button--full block--with-margin",
        children: strings.startButton
      })
    })]
  });
}
var _default = exports.default = HomeContent;