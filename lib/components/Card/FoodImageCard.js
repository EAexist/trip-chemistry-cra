"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _material = require("@mui/material");
var _appConst = require("../../common/app-const");
var _texts = require("../../texts");
var _getImgSrc = _interopRequireWildcard(require("../../utils/getImgSrc"));
var _ImageCard = _interopRequireDefault(require("./ImageCard"));
var _Flag = _interopRequireDefault(require("../Flag"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
;
const FoodImageCard = ({
  id,
  isActive,
  ...props
}) => {
  const commonStrings = (0, _texts.useStrings)().public.common;
  const strings = commonStrings.food[id];
  const data = _appConst.FOOD[id];
  const cityName = commonStrings.city[data.city].name;
  const nationId = _appConst.CITY[data.city].nation;
  (0, _react.useEffect)(() => {
    console.log(`[FoodImageCard] id=${id}`);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    href: isActive ? data.link : undefined,
    target: "_blank",
    rel: "noopener noreferrer",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ButtonBase, {
      className: "block--full",
      disabled: !isActive,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "block__body",
        style: {
          opacity: isActive ? 1 : 0.5
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ImageCard.default, {
          src: (0, _getImgSrc.default)("/food", data.restaurant, _getImgSrc.FORMATWEBP),
          title: strings.name,
          sx: {
            width: "196px",
            height: "196px",
            borderRadius: "12px"
          },
          className: "body__head"
        }), isActive && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            width: "100%",
            textAlign: "start"
          },
          className: "block__body",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            className: "typography-label body__head",
            children: strings.name
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
            className: "typography-note",
            spacing: 0.5,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
              children: [" ", strings.restaurantName]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Divider, {
              orientation: "vertical",
              variant: "middle",
              flexItem: true
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
              children: [" ", cityName]
            }), _appConst.NATION[nationId].flag && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Flag.default, {
              id: nationId
            })]
          })]
        })]
      })
    })
  });
};
var _default = exports.default = FoodImageCard;