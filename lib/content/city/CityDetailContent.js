"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _react2 = require("swiper/react");
require("swiper/css");
require("swiper/css/pagination");
require("swiper/css/navigation");
var _appConst = require("../../common/app-const");
var _props = require("../../swiper/props");
var _FriendAvatar = _interopRequireDefault(require("../../components/Avatar/FriendAvatar"));
var _ImageCard = _interopRequireDefault(require("../../components/Card/ImageCard"));
var _Logo = _interopRequireDefault(require("../../components/Logo"));
var _MotionList = require("../../motion/components/MotionList");
var _MotionListItem = require("../../motion/components/MotionListItem");
var _RoutedMotionPage = _interopRequireDefault(require("../../motion/components/RoutedMotionPage"));
var _PaginationDiv = _interopRequireDefault(require("../../swiper/components/PaginationDiv"));
var _AppBarContext = require("../../components/AppBar/AppBarContext");
var _props2 = require("../../motion/props");
var _chemistryReducer = require("../../reducers/chemistryReducer");
var _texts = require("../../texts");
var _getImgSrc = _interopRequireWildcard(require("../../utils/getImgSrc"));
var _Flag = _interopRequireDefault(require("../../components/Flag"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* React Packages */

/* Swiper */

/* Page */
/* Page */

/* App */

;
function CityDetailContent({
  cityClass
}) {
  /* Hooks */
  const navigate = (0, _reactRouterDom.useNavigate)();
  const {
    state
  } = (0, _reactRouterDom.useLocation)();
  const isAppBarHidden = (0, _AppBarContext.useHideAppbar)();

  /* States */
  const [expanded, setExpanded] = (0, _react.useState)(false);

  /* Constants */
  const strings = (0, _texts.useStrings)().public.contents.test;
  const commonStrings = (0, _texts.useStrings)().public.common;

  /* Event Handlers */
  const handleClose = () => {
    navigate(-1);
  };
  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  /* Reducers */
  const isChemistryEnabled = (0, _chemistryReducer.useIsChemistryEnabled)();
  const score = (0, _chemistryReducer.useCityChemistry)(cityClass);
  const answerList = (0, _chemistryReducer.useProfileAll)().map(({
    id,
    testAnswer
  }) => ({
    id: id,
    answer: testAnswer[cityClass]
  })).sort((a, b) => b.answer - a.answer);

  // useSelector((state: RootState) =>
  //     isChemistryEnabled
  //         ? Object.entries(state.chemistry.data.profileList).map(([id, { testAnswer }]) => (
  //             { id: id, answer: testAnswer[cityClass] }
  //         )).sort((a, b) => (b.answer as number) - (a.answer as number))
  //         : []
  // )

  return isAppBarHidden && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RoutedMotionPage.default, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.AppBar, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Toolbar, {
        className: "margin-x",
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
            textAlign: "center"
          },
          children: strings.test.city.title
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Toolbar, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "block--with-margin-x block__body--large",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
        className: "typography-heading",
        children: strings.subTest[cityClass].title
      })
    }), isChemistryEnabled && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "block--with-margin-x",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Accordion, {
        expanded: expanded,
        onChange: handleChange,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.AccordionSummary, {
          expandIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ExpandMore, {}),
          "aria-controls": "scores",
          id: "scores",
          sx: {
            padding: 0
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
            justifyContent: 'space-between',
            style: {
              width: "100%"
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Rating, {
                value: score,
                readOnly: true,
                precision: 0.5,
                size: "small"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                children: Math.round(score * 10) / 10
              }), score > 3.4 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ThumbUp, {
                fontSize: "inherit"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              className: "typography-note",
              children: expanded ? "답변 접기" : "친구들의 답변 보기"
            })]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.AccordionDetails, {
          sx: {
            padding: 0
          },
          children: expanded && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MotionList.MotionList, {
            initial: "closed",
            animate: "open",
            variants: _props2.VARIANTS_STAGGER_CHILDREN,
            children: answerList.map(({
              id,
              answer
            }) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MotionListItem.MotionListItem, {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemAvatar, {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FriendAvatar.default, {
                  id: id
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemText, {
                primary: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Rating, {
                    value: Number(answer),
                    readOnly: true,
                    precision: 0.5,
                    size: "small"
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                    className: "typography-note",
                    children: strings.test.city.answers[answer].label
                  })]
                })
              })]
            }))
          })
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Divider, {
      variant: "middle"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react2.Swiper, {
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
      }), _appConst.TEST.city.subTests[cityClass].examples.map(cityId => /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.SwiperSlide, {
        className: "",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "block--with-margin-x block__body--large",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ImageCard.default, {
            src: (0, _getImgSrc.default)("/city", cityId, _getImgSrc.FORMATWEBP),
            title: cityId,
            className: "body__head flex-end",
            gradient: "bottom",
            sx: {
              height: "320px"
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CardContent, {
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
                className: "typography-white",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
                  className: "typography-heading",
                  children: commonStrings.city[cityId].name
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
                  className: "typography-heading",
                  children: cityId
                }), _appConst.NATION[_appConst.CITY[cityId].nation].flag && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Flag.default, {
                  id: _appConst.CITY[cityId].nation
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
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
                className: "typography-note",
                children: [commonStrings.reference, commonStrings.linkType[_appConst.CITY[cityId].linkType].name]
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Logo.default, {
                id: _appConst.CITY[cityId].linkType
              })]
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})]
        })
      }, cityId))]
    })]
  });
}
var _default = exports.default = CityDetailContent;