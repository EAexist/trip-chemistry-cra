"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.defaultReudcer = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _authReducer = _interopRequireDefault(require("../reducers/authReducer"));
var _profileSearchReducer = _interopRequireDefault(require("../reducers/profileSearchReducer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const store = exports.store = (0, _toolkit.configureStore)({
  reducer: {
    auth: _authReducer.default,
    profileSearch: _profileSearchReducer.default
    // testAnswer: testAnswerReducer,
    // chemistry: chemistryReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  //     serializableCheck: false,
  // }),
  devTools: process.env.NODE_ENV !== 'production'
});
const defaultReudcer = exports.defaultReudcer = {
  auth: _authReducer.default
};