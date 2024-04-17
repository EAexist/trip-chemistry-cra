"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _server = require("react-router-dom/server");
var _routes = _interopRequireDefault(require("../routes"));
var _request = _interopRequireDefault(require("../server/request"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * inspired by:
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/src/AppSsr.jsx
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/tools/ssr.js#L57
 */

const handler = (0, _server.createStaticHandler)(_routes.default);
const AppSSR = async ({
  req,
  res
}) => {
  let fetchRequest = (0, _request.default)(req, res);
  let context = await handler.query(fetchRequest);
  let router = (0, _server.createStaticRouter)(handler.dataRoutes, context);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_server.StaticRouterProvider, {
    router: router,
    context: context
  });
};
var _default = exports.default = AppSSR;