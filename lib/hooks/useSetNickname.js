"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _authReducer = require("../reducers/authReducer");
const useSetNickname = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const userId = (0, _authReducer.useUserId)();
  return (0, _react.useCallback)(value => {
    dispatch((0, _authReducer.asyncSetNickname)({
      id: userId,
      value
    }));
  }, [dispatch, userId]);
};
var _default = exports.default = useSetNickname;