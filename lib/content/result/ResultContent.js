"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _framerMotion = require("framer-motion");
var _reactRedux = require("react-redux");
var _LazyDomAnimation = _interopRequireDefault(require("../../motion/LazyDomAnimation"));
var _TestResultBlock = require("../../components/Profile/TestResultBlock");
var _props = require("../../motion/props");
var _texts = require("../../texts");
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */
/* React Packages */

;
function ResultContent({}) {
  const strings = (0, _texts.useStrings)().public.contents.result;
  const navigate = (0, _useNavigateWithGuestContext.default)();

  /* Reducers */
  const character = (0, _reactRedux.useSelector)(state => state.auth.data.profile.testResult.tripCharacter);

  /* Event Handlers */
  const handleChemistryButtonClick = () => {
    navigate('../myChemistry');
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "page",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Toolbar, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LazyDomAnimation.default, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_framerMotion.m.div, {
        ..._props.FADEIN_VIEWPORT,
        className: "block__body block--with-padding-x",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.h5, {
          className: "typography-heading",
          children: strings.sections.tripCharacter.title
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "block__body",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TestResultBlock.UserTestResultBlock, {}), character.body.split("\n").map(text => /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: text
          }, text))]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "flex",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
            onClick: handleChemistryButtonClick,
            variant: "contained",
            className: "button--full",
            children: strings.navigateToChemistryButton
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})]
      })
    })]
  });
}
var _default = exports.default = ResultContent;