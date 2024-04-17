"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _appConst = require("../../common/app-const");
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

/* Externals */

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
    navigate(`city/${cityClass}`);
  };
  (0, _react.useEffect)(() => {
    console.log(`[CityChemistryContent] cityClass=${cityClass}`);
  }, [cityClass]);
  return (
    /*#__PURE__*/
    // <div className="block__body">
    (0, _jsxRuntime.jsx)(_ImageCard.default, {
      src: (0, _getImgSrc.default)("/city", _appConst.TEST.city.subTests[cityClass].examples[0], _getImgSrc.FORMATWEBP, "large"),
      title: cityClass,
      gradient: "bottom",
      className: "block--xlarge",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CardActionArea, {
        onClick: handleClick,
        className: "flex-end",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CardContent, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
            justifyContent: "space-between",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
              className: "typography-heading",
              children: testStrings.subTest[cityClass].title
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
              spacing: 0,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Rating, {
                value: score,
                readOnly: true,
                precision: 0.5,
                emptyIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.StarBorder, {
                  fontSize: "inherit"
                }),
                sx: {
                  fontSize: "inherit"
                }
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                children: Math.round(score * 10) / 10
              }), score > 3.4 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ThumbUp, {
                fontSize: "inherit",
                sx: {
                  marginLeft: "8px"
                }
              })]
            })]
          })
        })
      })
    })
    // <Stack
    //     flexWrap={"wrap"}
    //     spacing={0}
    //     gap={1}
    // >
    //     {
    //         Object.entries(valueToProfileList).reverse().map(([value, idList], index) => (
    //             <Stack sx={{ flexWrap: "wrap" }}>
    //                 <div className="block--centered">
    //                     <Rating value={Number(value)} readOnly max={Number(value)} sx={{ fontSize: "14px" }} />
    //                     <p className="typography-note">{testStrings.test.city.answers[Number(value) as keyof typeof testStrings.test.city.answers].label}</p>
    //                 </div>
    //                 <Stack spacing={0.5}>
    //                     {
    //                         idList.map((id) => (
    //                             <FriendAvatar id={id} />
    //                         ))
    //                     }
    //                 </Stack>
    //             </Stack>
    //         ))
    //     }
    // </Stack>
    // </div>
  );
}
var _default = exports.default = CityChemistryContent;