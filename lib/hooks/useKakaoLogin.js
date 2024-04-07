"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _authReducer = require("../reducers/authReducer");
const useKakaoLogin = () => {
  /* Hooks */
  const [searchParams] = (0, _reactRouterDom.useSearchParams)();
  const dispatch = (0, _reactRedux.useDispatch)();

  /* Try login when access code is generated. */
  (0, _react.useEffect)(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    let userId = "";
    if (state) {
      let pathList = state?.split('/');
      console.log(`[useKakaoLogin] pathList=${pathList}`);
      if (pathList.includes('guest')) {
        userId = pathList[pathList.indexOf('guest') + 1];
      }
    }
    console.log(`[useKakaoLogin] useEffect\n\tcode=${code}\n\tstate=${state}\n\tuserId=${userId}`);
    if (code) {
      dispatch((0, _authReducer.asyncKakaoLogin)({
        code,
        id: userId
      }));
    }
  }, [dispatch, searchParams]);
};
var _default = exports.default = useKakaoLogin;