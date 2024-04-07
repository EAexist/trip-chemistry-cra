"use strict";

var _axios = _interopRequireDefault(require("axios"));
var _qs = _interopRequireDefault(require("qs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_axios.default.defaults.paramsSerializer = params => {
  return _qs.default.stringify(params, {
    arrayFormat: 'comma'
  });
};
_axios.default.defaults.baseURL = process.env.REACT_APP_API_URL;