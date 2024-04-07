"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _material = require("@mui/material");
var _props = require("../props");
var _jsxRuntime = require("react/jsx-runtime");
/* React */

/* Mui */

/* Swiper */

;
function SwiperAutoplayProgress({
  swiper,
  className
}) {
  const [secondsLeft, setSecondsLeft] = (0, _react.useState)(Math.ceil(_props.AUTOPLAY_DELAY / 1000));
  const [progress, setProgress] = (0, _react.useState)(0);
  const [isPaused, setIsPaused] = (0, _react.useState)(false);
  const theme = (0, _material.useTheme)();
  (0, _react.useEffect)(() => {
    console.log(`Mounting [SwiperAutoplayProgress]`);
    swiper.on('autoplayTimeLeft', (swiper, timeLeft, percentage) => {
      setProgress(1 - percentage);
      setSecondsLeft(Math.ceil(timeLeft / 1000));
    });
  }, [swiper]);
  const pause = (0, _react.useCallback)(() => {
    console.log(`onActiveIndexChange: pause`);
    swiper.autoplay.pause();
  }, [swiper]);
  (0, _react.useEffect)(() => {
    console.log(`isPaused=${isPaused}`);
    swiper.off('activeIndexChange', pause);
    if (isPaused) {
      swiper.on('activeIndexChange', pause);
    }
  }, [swiper, isPaused, pause]);
  const [isMouseEntered, setIsMouseEntered] = (0, _react.useState)(false);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "autoplay-progress",
    style: {
      color: theme.palette.primary.main
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: `autoplay-progress__button`,
      onMouseEnter: () => setIsMouseEntered(true),
      onMouseLeave: () => setIsMouseEntered(false),
      children: [swiper.autoplay && (isMouseEntered ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
        sx: {
          color: "inherit"
        },
        onClick: isPaused ? () => {
          console.log(`onClick: resume`);
          setIsPaused(false);
          swiper.autoplay.start();
          swiper.autoplay.resume();
        } : () => {
          console.log(`onClick: pause`);
          setIsPaused(true);
          swiper.autoplay.pause();
          setProgress(0);
          swiper.autoplay.stop();
        },
        children: isPaused ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Icon, {
          children: "play_arrow"
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Icon, {
          children: "pause"
        })
      }) : swiper.autoplay && (isPaused ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Icon, {
        children: "pause"
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "typography-label",
        style: {
          color: "inherit"
        },
        children: `${secondsLeft}`
      }))), /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
        viewBox: "0 0 48 48",
        style: {
          'strokeDashoffset': `${125.6 * (1 - progress)}`,
          'zIndex': -20
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
          cx: "24",
          cy: "24",
          r: "20",
          stroke: theme.palette.primary.main
        })
      })]
    })
  });
}
var _default = exports.default = SwiperAutoplayProgress;