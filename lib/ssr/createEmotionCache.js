"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEmotionCache;
var _cache = _interopRequireDefault(require("@emotion/cache"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function createEmotionCache() {
  return (0, _cache.default)({
    key: 'css'
  });
}