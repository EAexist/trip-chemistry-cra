"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getImgSrc = _interopRequireDefault(require("../utils/getImgSrc"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*  */

;
function Logo({
  id,
  format = 'webp',
  size = "medium",
  iconName,
  ...props
}) {
  // const src = getImgSrc( '/logos', `logo-${id}-${size}`, format )
  const src = (0, _getImgSrc.default)('/logos', `logo-${id}-${size}`, format);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
    src: src,
    alt: id,
    width: "32px",
    height: "32px",
    className: `Logo Logo-${size}`
    // srcSet={ `${src.replace(size, `medium`)} 24w` }
    ,
    sizes: '24w',
    ...props
  });
}
var _default = exports.default = Logo;