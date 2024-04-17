"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _toolkit = require("@reduxjs/toolkit");
var _store = require("../store");
var _jsxRuntime = require("react/jsx-runtime");
const withReducer = WrappedComponent => asyncReducer => props => {
  const [isReducerInjected, setIsReducerInjected] = (0, _react.useState)(_store.store.getState()[Object.keys(asyncReducer)[0]] !== undefined);

  /* Side Effects */
  (0, _react.useEffect)(() => {
    if (!isReducerInjected) {
      const newRootReducer = (0, _toolkit.combineReducers)({
        ..._store.defaultReudcer,
        ...asyncReducer
      });
      _store.store.replaceReducer(newRootReducer);
      setIsReducerInjected(true);
    }
  }, [isReducerInjected]);
  return isReducerInjected && /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
    ...props
  });
};
var _default = exports.default = withReducer;