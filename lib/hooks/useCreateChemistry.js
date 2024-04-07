"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _authReducer = require("../reducers/authReducer");
var _chemistryReducer = require("../reducers/chemistryReducer");
const useCreateChemistry = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const userId = (0, _authReducer.useUserId)();
  return (0, _react.useCallback)(title => {
    dispatch((0, _chemistryReducer.asyncCreateChemistry)({
      title: title,
      titleCity: "kyoto",
      userId: userId
    }));
  }, [dispatch, userId]);
};
var _default = exports.default = useCreateChemistry;