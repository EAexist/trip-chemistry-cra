"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
const useNavigateWithGuestContext = () => {
  /* Hooks */
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [searchParams] = (0, _reactRouterDom.useSearchParams)();
  const guestId = searchParams.get('guestId');

  /* Try login when access code is generated. */
  return (0, _react.useCallback)((to, options) => {
    navigate(`${to}${guestId ? `?guestId=${guestId}` : ''}`, options);
  }, [guestId]);
};
var _default = exports.default = useNavigateWithGuestContext;