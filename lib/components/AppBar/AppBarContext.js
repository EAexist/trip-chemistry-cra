"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useShowAppBar = exports.useHideAppbar = exports.useAppBar = exports.default = exports.AppBarContextProvider = void 0;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const AppBarContext = /*#__PURE__*/(0, _react.createContext)({});
const AppBarContextProvider = ({
  children
}) => {
  const [showAppBar, setShowAppBar] = (0, _react.useState)(true);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(AppBarContext.Provider, {
    value: {
      show: showAppBar,
      setShow: setShowAppBar
    },
    children: children
  });
};
exports.AppBarContextProvider = AppBarContextProvider;
const useAppBar = () => (0, _react.useContext)(AppBarContext).show;
exports.useAppBar = useAppBar;
const useShowAppBar = () => (0, _react.useContext)(AppBarContext).setShow;
exports.useShowAppBar = useShowAppBar;
const useHideAppbar = () => {
  const {
    show,
    setShow
  } = (0, _react.useContext)(AppBarContext);
  (0, _react.useEffect)(() => {
    setShow(false);
    return () => {
      setShow(true);
    };
  }, [setShow]);
  return !show;
};
exports.useHideAppbar = useHideAppbar;
var _default = exports.default = AppBarContext;