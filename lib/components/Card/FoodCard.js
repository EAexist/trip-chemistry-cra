"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _material = require("@mui/material");
var _appConst = require("../../common/app-const");
var _getImgSrc = _interopRequireWildcard(require("../../utils/getImgSrc"));
var _texts = require("../../texts");
var _Flag = _interopRequireDefault(require("../Flag"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
;
const FoodCard = ({
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
    console.log(`[FoodCard] id=${id}`);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Card, {
    sx: {
      width: "200px"
    },
    ...props,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
      href: isActive ? data.link : undefined,
      target: "_blank",
      rel: "noopener noreferrer",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.CardActionArea, {
        disabled: !isActive,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CardMedia, {
          component: "img",
          image: (0, _getImgSrc.default)("/food", data.restaurant, _getImgSrc.FORMATWEBP),
          alt: strings.name,
          height: "160"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.CardContent, {
          className: "block__body",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
            className: "body__head",
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("h3", {
              className: "typography-name",
              children: [" ", strings.name]
            })
          }), isActive && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
              className: "typography--profile-label",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
                children: [" ", strings.restaurantName]
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
                children: [" ", cityName]
              }), _appConst.NATION[nationId].flag && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Flag.default, {
                id: nationId
              })]
            })
          })]
        })]
      })
    })
  });
};
var _default = exports.default = FoodCard;