"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _texts = require("../../texts");
var _Logo = _interopRequireDefault(require("../Logo"));
var _AppBarContext = require("./AppBarContext");
var _Drawer = _interopRequireDefault(require("../Drawer/Drawer"));
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// const Drawer = loadable(() => import(
//     /* webpackChunkName: "Drawer" */ 
//     /* webpackPrefetch: true */
//     '../Drawer/Drawer'
//     ));

;
function AppBar({}) {
  /* Hooks */

  const navigate = (0, _useNavigateWithGuestContext.default)();
  const strings = (0, _texts.useStrings)();
  const openAppBar = (0, _AppBarContext.useAppBar)();

  /* States */
  const [openDrawer, setOpenDrawer] = (0, _react.useState)(false);
  const [animateDrawerClose, setAnimateDrawerClose] = (0, _react.useState)(false);

  /* Event handlers  */
  const handleTitleButtonClick = () => {
    setAnimateDrawerClose(false);
    setOpenDrawer(false);
    navigate('home');
  };
  const handleMenuButtonClick = () => {
    setAnimateDrawerClose(true);
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const handleDrawerItemClick = () => {
    setAnimateDrawerClose(false);
    setOpenDrawer(false);
  };
  return openAppBar && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.AppBar, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Toolbar, {
        className: "block--with-margin-x",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
          onClick: handleTitleButtonClick,
          startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Logo.default, {
            id: "app"
          }),
          style: {
            fontWeight: 400
          },
          children: strings.public.common.title
        }), openDrawer ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
          edge: "end",
          "aria-label": "menu",
          onClick: handleDrawerClose,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Close, {})
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
          edge: "end",
          "aria-label": "menu",
          onClick: handleMenuButtonClick,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Menu, {})
        })]
      })
    }), animateDrawerClose && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Drawer.default, {
      open: openDrawer,
      onDrawerItemClick: handleDrawerItemClick
    })]
  });
}
var _default = exports.default = AppBar;