"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _framerMotion = require("framer-motion");
var _LazyDomAnimation = _interopRequireDefault(require("../../motion/LazyDomAnimation"));
var _reactRouterDom = require("react-router-dom");
var _appConst = require("../../common/app-const");
var _MotionList = require("../../motion/components/MotionList");
var _MotionListItem = require("../../motion/components/MotionListItem");
var _MotionListSubheader = require("../../motion/components/MotionListSubheader");
var _props = require("../../motion/props");
var _authReducer = require("../../reducers/authReducer");
var _texts = require("../../texts");
var _UserAvatar = _interopRequireDefault(require("../Avatar/UserAvatar"));
var _PngIcon = _interopRequireDefault(require("../PngIcon"));
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
function Drawer({
  open,
  onDrawerItemClick
}) {
  /* Hooks */
  const navigate = (0, _useNavigateWithGuestContext.default)();
  const strings = (0, _texts.useStrings)();
  const {
    pathname,
    search
  } = (0, _reactRouterDom.useLocation)();
  const {
    zIndex
  } = (0, _material.useTheme)();

  /* Reducers */
  const isAuthorized = (0, _authReducer.useIsAuthorized)();
  const user = (0, _authReducer.useUserInfo)();
  /*  */
  /* Event handlers  */
  const handleDrawerItemClick = path => {
    onDrawerItemClick();
    navigate(path);
  };
  const variants_drawer = {
    open: {
      y: 0,
      transition: {
        /*  */
        duration: 0.5
      }
    },
    closed: {
      y: '-100%',
      transition: {
        duration: 0.5,
        delay: 0.5
      }
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LazyDomAnimation.default, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.AnimatePresence, {
      children: open && /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.div, {
        initial: "closed",
        animate: "open",
        exit: "closed",
        variants: variants_drawer,
        style: {
          zIndex: `${zIndex.appBar - 1}`
        },
        className: "drawer",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "page fill-window",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Toolbar, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MotionList.MotionList
          // initial={false}
          // animate={openDrawer ? "open" : "closed"}
          // initial={"open"}
          // exit={"closed"}
          , {
            variants: _props.VARIANTS_STAGGER_CHILDREN,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MotionListSubheader.MotionListSubheader, {
              disableGutters: true,
              className: "block--with-margin-x",
              children: `내 정보`
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MotionListItem.MotionListItem, {
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.ListItemButton, {
                onClick: () => handleDrawerItemClick('user'),
                selected: pathname.includes('user'),
                disableGutters: true,
                className: "block--with-padding-x",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemAvatar, {
                  children: isAuthorized ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_UserAvatar.default, {
                    showLabel: false
                  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Avatar, {})
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemText, {
                  primary: isAuthorized ? user.nickname : "로그인하기"
                  // secondary={
                  //     isAuthorized ? getNameTag(user) : undefined
                  // }
                })]
              })
            }, "profile"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Divider, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MotionListSubheader.MotionListSubheader, {
              disableGutters: true,
              className: "block--with-margin-x",
              children: `내 여행`
            }), Object.entries(_appConst.CONTENTS).map(([content, {
              path,
              icon
            }]) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_MotionListItem.MotionListItem, {
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.ListItemButton, {
                onClick: () => handleDrawerItemClick(path),
                selected: pathname.includes(path),
                disableGutters: true,
                className: "block--with-padding-x",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemAvatar, {
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Avatar, {
                    variant: "rounded",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PngIcon.default, {
                      name: icon
                    })
                  })
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemText, {
                  primary: strings.public.contents[content].label
                })]
              })
            }, content))]
          })]
        })
      })
    })
  });
}
var _default = exports.default = Drawer;