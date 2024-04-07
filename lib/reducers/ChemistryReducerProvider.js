"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _chemistryReducer = _interopRequireDefault(require("./chemistryReducer"));
var _withReducer = _interopRequireDefault(require("../hocs/withReducer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ChemistryReducerProvider = (0, _withReducer.default)(_reactRouterDom.Outlet)({
  chemistry: _chemistryReducer.default
});
var _default = exports.default = ChemistryReducerProvider;