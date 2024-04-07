"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Layout = ({
  children,
  title
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
    children: title
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, ut inventore! Excepturi doloremque veritatis labore incidunt, veniam tempore ipsa dicta repudiandae aspernatur, nobis qui tenetur eligendi error, quam harum cumque?"
    })
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: children
  })]
});
var _default = exports.default = Layout;