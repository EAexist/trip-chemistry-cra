"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _appConst = require("../../common/app-const");
var _FriendAvatar = _interopRequireDefault(require("../../components/Avatar/FriendAvatar"));
var _ImageCard = _interopRequireDefault(require("../../components/Card/ImageCard"));
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _useValueToProfileIdList = _interopRequireDefault(require("../../hooks/useValueToProfileIdList"));
var _chemistryReducer = require("../../reducers/chemistryReducer");
var _texts = require("../../texts");
var _getImgSrc = _interopRequireWildcard(require("../../utils/getImgSrc"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* React Packages */

/* App */

;
function CityChemistryContent({
  cityClass
}) {
  const navigate = (0, _useNavigateWithGuestContext.default)();
  const testStrings = (0, _texts.useStrings)().public.contents.test;
  const valueToProfileList = (0, _useValueToProfileIdList.default)(cityClass);
  const score = (0, _chemistryReducer.useCityChemistry)(cityClass);
  const handleClick = () => {
    navigate(`../city/${cityClass}`);
  };
  (0, _react.useEffect)(() => {
    console.log(`[CityChemistryContent] cityClass=${cityClass}`);
  }, [cityClass]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "block__body",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ImageCard.default, {
      src: (0, _getImgSrc.default)("/city", _appConst.TEST.city.subTests[cityClass].examples[0], _getImgSrc.FORMATWEBP),
      title: cityClass,
      gradient: "bottom",
      className: "block--xlarge",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CardActionArea, {
        onClick: handleClick,
        className: "flex-end",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CardContent, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
            justifyContent: "space-between",
            className: "typography-white",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
                className: "typography-label",
                children: testStrings.subTest[cityClass].title
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Rating, {
                value: score,
                readOnly: true,
                precision: 0.5,
                size: "small",
                emptyIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.StarBorder, {
                  fontSize: "inherit",
                  sx: {
                    color: "white"
                  }
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                children: Math.round(score * 10) / 10
              }), score > 3.4 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ThumbUp, {
                fontSize: "inherit",
                sx: {
                  color: "white"
                }
              })]
            })]
          })
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
      flexWrap: "wrap",
      spacing: 2,
      divider: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Divider, {
        variant: "middle",
        orientation: "vertical",
        flexItem: true
      }),
      children: Object.entries(valueToProfileList).reverse().map(([value, idList], index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
        sx: {
          flexWrap: "wrap"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "block--centered",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Rating, {
            value: Number(value),
            readOnly: true,
            max: Number(value),
            sx: {
              fontSize: "14px"
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "typography-note",
            children: testStrings.test.city.answers[Number(value)].label
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
          spacing: 0.75,
          children: idList.map(id => /*#__PURE__*/(0, _jsxRuntime.jsx)(_FriendAvatar.default, {
            id: id
          }))
        })]
      }))
    })]
  });
}
var _default = exports.default = CityChemistryContent;