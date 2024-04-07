"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _framerMotion = require("framer-motion");
var _LazyDomAnimation = _interopRequireDefault(require("../../motion/LazyDomAnimation"));
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _RoutedMotionPage = _interopRequireDefault(require("../../motion/components/RoutedMotionPage"));
var _props = require("../../motion/props");
var _authReducer = require("../../reducers/authReducer");
var _ChemistrySummaryButton = _interopRequireDefault(require("./component/ChemistrySummaryButton"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React Packages */

/* App */

;
function ChemistryListContent({}) {
  /* Hooks */
  const navigate = (0, _useNavigateWithGuestContext.default)();

  /* Reducers */
  const chemistryIdList = (0, _authReducer.useChemistryIdList)();

  /* Event Handler */
  const handleAddChemistry = () => {
    navigate(`new`);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RoutedMotionPage.default, {
    className: "page fill-window flex block--gray",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Toolbar, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "block--with-margin-x block__body",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_LazyDomAnimation.default, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.h2, {
          ..._props.FADEIN_VIEWPORT,
          className: "typography-heading",
          children: "\uB0B4 \uC5EC\uD589"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_framerMotion.m.ul, {
          ..._props.STAGGER_CHILDREN,
          custom: 0.5,
          className: "block__body",
          children: [Object.values(chemistryIdList).map(id => /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.li, {
            variants: _props.VARIANTS_SLIDE_UP,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChemistrySummaryButton.default, {
              id: id
            })
          })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.li, {
            variants: _props.VARIANTS_SLIDE_UP,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Button, {
              variant: "outlined",
              className: "block--large flex-row",
              sx: {
                borderRadius: "16px"
              },
              onClick: handleAddChemistry,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Add, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                children: "\uC0C8 \uC5EC\uD589 \uB9CC\uB4E4\uAE30"
              })]
            })
          })]
        })]
      })
    })]
  });
}
var _default = exports.default = ChemistryListContent;