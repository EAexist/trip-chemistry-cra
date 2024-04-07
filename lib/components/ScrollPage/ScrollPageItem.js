"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _framerMotion = require("framer-motion");
var _LazyDomAnimation = _interopRequireDefault(require("../../motion/LazyDomAnimation"));
var _props = require("../../motion/props");
var _PageContext = require("./PageContext");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* ScrollPageItem
    Wrapper that renderes wrapped element when sticky container is scrolled to corresponding page(prop) 
*/

;
const ScrollPageItem = ({
  page,
  children,
  className
}) => {
  const {
    activePage
  } = (0, _PageContext.usePage)();
  const pageRef = (0, _react.useRef)(null);
  return (
    /*#__PURE__*/
    // (activePage === page) &&
    (0, _jsxRuntime.jsx)(_LazyDomAnimation.default, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.div, {
        ref: pageRef,
        ..._props.FADEIN,
        // className={`ScrollPageItem fill-window ${className}`}
        className: `fill-window ${className}`,
        children: children
      })
    })
  );
};
var _default = exports.default = ScrollPageItem;