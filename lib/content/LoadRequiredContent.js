"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AuthLoadRequiredContent = void 0;
var _react = require("react");
var _material = require("@mui/material");
var _LoadStatus = require("../interfaces/enums/LoadStatus");
var _withAuthLoadStatus = _interopRequireDefault(require("../hocs/withAuthLoadStatus"));
var _getImgSrc = _interopRequireWildcard(require("../utils/getImgSrc"));
var _component = _interopRequireDefault(require("@loadable/component"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; } /* React */ /* Externals */ /* App */
const NoticeBlock = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "NoticeBlock";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "NoticeBlock" */"../components/Block/NoticeBlock"))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("../components/Block/NoticeBlock");
    }
    return eval('require.resolve')("../components/Block/NoticeBlock");
  }
});
;
function LoadRequiredContent({
  status = _LoadStatus.LoadStatus.REST,
  setStatus,
  children,
  successText = "",
  pendingText = "잠시만 기다려주세요.",
  failText = "서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요.",
  missText = "정보를 찾을 수 없어요. 잠시 후 다시 시도해주세요.",
  handleFailButtonText = "확인",
  handleMissButtonText = "확인",
  handleSuccess = () => {},
  handleFail = () => {},
  handleMiss = () => {},
  showHandleFailButton = true,
  /* false 일 경우 버튼 없이 FAIL을 즉시 처리. */
  isEnabled = true
}) {
  /* States */
  const [delayedStatus, setDelayedStatus] = (0, _react.useState)(status);
  const [isPending, setIsPending] = (0, _react.useState)(false);
  const minimumPendingTime = 500;
  const noticeBlockProps = {
    [_LoadStatus.LoadStatus.SUCCESS]: {
      body: pendingText
    },
    [_LoadStatus.LoadStatus.FAIL]: {
      body: failText,
      buttonText: handleFailButtonText,
      handleClick: () => {
        handleFail();
        setStatus(_LoadStatus.LoadStatus.REST);
      }
    },
    [_LoadStatus.LoadStatus.MISS]: {
      body: missText,
      buttonText: handleMissButtonText,
      handleClick: () => {
        handleMiss();
        setStatus(_LoadStatus.LoadStatus.REST);
      }
    }
  };

  /* Side Effect*/
  (0, _react.useEffect)(() => {
    if (isEnabled) {
      switch (status) {
        case _LoadStatus.LoadStatus.REST:
          setDelayedStatus(_LoadStatus.LoadStatus.REST);
          break;
        case _LoadStatus.LoadStatus.SUCCESS:
          if (!isPending) {
            setDelayedStatus(_LoadStatus.LoadStatus.SUCCESS);
            handleSuccess();
            setStatus(_LoadStatus.LoadStatus.REST);
          }
          break;
        case _LoadStatus.LoadStatus.PENDING:
          setDelayedStatus(_LoadStatus.LoadStatus.PENDING);
          setIsPending(true);
          setTimeout(() => {
            setIsPending(false);
          }, minimumPendingTime);
          break;
        case _LoadStatus.LoadStatus.FAIL:
          if (!isPending) {
            setDelayedStatus(_LoadStatus.LoadStatus.FAIL);
            /* 버튼 없이 FAIL을 바로 처리할 경우 */
            if (!showHandleFailButton) {
              handleFail();
              setStatus(_LoadStatus.LoadStatus.REST);
            }
          }
          break;
        case _LoadStatus.LoadStatus.MISS:
          if (!isPending) {
            setDelayedStatus(_LoadStatus.LoadStatus.MISS);
          }
          break;
        default:
          break;
      }
    }
  }, [status, isPending, handleSuccess, setStatus, isEnabled, handleFail, showHandleFailButton]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [isEnabled && (delayedStatus === _LoadStatus.LoadStatus.FAIL || delayedStatus === _LoadStatus.LoadStatus.MISS) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(NoticeBlock, {
      title: "여행 타입 테스트",
      alt: delayedStatus,
      src: (0, _getImgSrc.default)('/info', delayedStatus, _getImgSrc.FORMATWEBP),
      ...noticeBlockProps[delayedStatus]
    }) : children, isEnabled && delayedStatus === _LoadStatus.LoadStatus.PENDING && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "backdrop block--centered",
      style: {
        width: '100vw',
        height: '100vh'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CircularProgress, {})
    })]
  });
}
var _default = exports.default = LoadRequiredContent;
const AuthLoadRequiredContent = exports.AuthLoadRequiredContent = (0, _withAuthLoadStatus.default)(LoadRequiredContent);