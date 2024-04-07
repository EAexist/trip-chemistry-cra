"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _react2 = require("swiper/react");
require("swiper/css");
var _props = require("../../../swiper/props");
var _StepContext = require("../StepContext");
var _jsxRuntime = require("react/jsx-runtime");
/* Swiper */

;
function Stepper({
  className,
  children,
  ...props
}) {
  /* States */
  const topNavSwiperRef = (0, _react.useRef)(null);
  const step = (0, _StepContext.useStep)();

  /* Side Effects */
  (0, _react.useEffect)(() => {
    topNavSwiperRef.current?.swiper.slideTo(step);
  }, [step]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.Swiper, {
    ..._props.SWIPERPROPS_STEPPER,
    ref: topNavSwiperRef,
    className: className,
    ...props,
    children: children
  });
}
var _default = exports.default = Stepper;