"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _component = _interopRequireDefault(require("@loadable/component"));
require("swiper/css");
require("swiper/css/navigation");
require("swiper/css/pagination");
var _react = require("swiper/react");
var _appConst = require("../../common/app-const");
var _AppBarContext = require("../../components/AppBar/AppBarContext");
var _ImageCard = _interopRequireDefault(require("../../components/Card/ImageCard"));
var _Flag = _interopRequireDefault(require("../../components/Flag"));
var _Logo = _interopRequireDefault(require("../../components/Logo"));
var _RoutedMotionPage = _interopRequireDefault(require("../../motion/components/RoutedMotionPage"));
var _PaginationDiv = _interopRequireDefault(require("../../swiper/components/PaginationDiv"));
var _props = require("../../swiper/props");
var _texts = require("../../texts");
var _getImgSrc = _interopRequireWildcard(require("../../utils/getImgSrc"));
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; } /* React */ /* Externals */ /* Swiper */ /* Page */ /* Page */ /* App */
/* Loadable Components */
const ChemistryResultAccordion = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "ChemistryResultAccordion";
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
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "ChemistryResultAccordion" */'./component/ChemistryResultAccordion'))),
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
      return require.resolveWeak("./component/ChemistryResultAccordion");
    }
    return eval('require.resolve')("./component/ChemistryResultAccordion");
  }
});
;
function CityDetailContent({
  cityClass
}) {
  /* Hooks */
  const navigate = (0, _useNavigateWithGuestContext.default)();
  const {
    state
  } = (0, _reactRouterDom.useLocation)();
  const isAppBarHidden = (0, _AppBarContext.useHideAppbar)();

  /* Constants */
  const strings = (0, _texts.useStrings)().public.contents.test;
  const commonStrings = (0, _texts.useStrings)().public.common;

  /* Event Handlers */
  const handleClose = () => {
    console.log(`[CityDetailContent] handleClose`);
    navigate('../..');
  };
  const isChemistryDefined = (0, _reactRedux.useSelector)(state => state.chemistry !== undefined);
  return isAppBarHidden && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RoutedMotionPage.default, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.AppBar, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Toolbar, {
        className: "block--with-margin-x",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
          edge: "start",
          "aria-label": "close",
          onClick: handleClose,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.NavigateBefore, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h5", {
          className: "typography-note ",
          style: {
            position: "absolute",
            width: "100%",
            textAlign: "center",
            zIndex: -1
          },
          children: strings.test.city.title
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Toolbar, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "block--with-margin-x block__body",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
        className: "typography-heading",
        children: strings.subTest[cityClass].title
      }), isChemistryDefined && /*#__PURE__*/(0, _jsxRuntime.jsx)(ChemistryResultAccordion, {
        cityClass: cityClass
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Divider, {})
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.Swiper, {
      ..._props.SWIPERPROPS_CITYDETAILCONTENT,
      initialSlide: state && state.initialIndex ? state.initialIndex : 0,
      className: "",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        slot: "container-start",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaginationDiv.default, {
          className: "pageSwiper-pagination",
          sx: {
            justifyContent: 'center'
          }
        })
      }), _appConst.TEST.city.subTests[cityClass].examples.map(cityId => /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.SwiperSlide, {
        className: "",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "block--with-margin-x block__body",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ImageCard.default, {
            src: (0, _getImgSrc.default)("/city", cityId, _getImgSrc.FORMATWEBP, 'large'),
            title: cityId,
            className: "body__head flex-end",
            gradient: "bottom",
            sx: {
              height: "320px"
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CardContent, {
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
                spacing: 0,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
                  className: "typography-heading typography-heading--large typography-white",
                  children: commonStrings.city[cityId].name
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
                  className: "typography-heading typography-white",
                  children: cityId
                }), _appConst.NATION[_appConst.CITY[cityId].nation].flag && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Flag.default, {
                  id: _appConst.CITY[cityId].nation,
                  style: {
                    marginLeft: 8
                  },
                  outlined: false
                })]
              })
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
            className: "typography-label",
            style: {
              marginTop: "1rem",
              width: "90%"
            },
            children: commonStrings.city[cityId].intro
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: commonStrings.city[cityId].body
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
              href: _appConst.CITY[cityId].link,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
                variant: "contained",
                color: "gray",
                className: "button--full",
                endIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ArrowRight, {}),
                children: commonStrings.linkTextList.map(text => text === "/link" ? commonStrings.linkType[_appConst.CITY[cityId].linkType].name : text === "/city" ? commonStrings.city[cityId].name : text)
              })
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
              className: "typography-note",
              children: [commonStrings.reference, commonStrings.linkType[_appConst.CITY[cityId].linkType].name]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Logo.default, {
              id: _appConst.CITY[cityId].linkType
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})]
        })
      }, cityId))]
    })]
  });
}
var _default = exports.default = CityDetailContent;