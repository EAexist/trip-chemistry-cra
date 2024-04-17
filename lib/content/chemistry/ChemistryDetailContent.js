"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _framerMotion = require("framer-motion");
var _reactRedux = require("react-redux");
var _LazyDomAnimation = _interopRequireDefault(require("../../motion/LazyDomAnimation"));
var _material = require("@mui/material");
var _appConst = require("../../common/app-const");
var _SectionPaper = _interopRequireDefault(require("../../components/Paper/SectionPaper"));
var _texts = require("../../texts");
var _FriendAvatar = _interopRequireDefault(require("../../components/Avatar/FriendAvatar"));
var _NavigationButton = _interopRequireDefault(require("../../components/Button/NavigationButton"));
var _ToggleButton = _interopRequireDefault(require("../../components/Button/ToggleButton"));
var _ProfileImage = _interopRequireDefault(require("../../components/Profile/ProfileImage"));
var _TestResultBlock = _interopRequireDefault(require("../../components/Profile/TestResultBlock"));
var _useValueToProfileIdList = _interopRequireDefault(require("../../hooks/useValueToProfileIdList"));
var _props = require("../../motion/props");
var _chemistryReducer = require("../../reducers/chemistryReducer");
var _CityChemistryContent = _interopRequireDefault(require("./CityChemistryContent"));
var _ChemistrySlider = _interopRequireDefault(require("./component/ChemistrySlider"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* Externals */

/* App */

function ChemistryDetailContent({}) {
  /* Constants */
  const testStrings = (0, _texts.useStrings)().public.contents.test;
  const strings = (0, _texts.useStrings)().public.contents.chemistry;

  /* States */
  const [characterSectionActiveUserIndex, setCharacterSectionActiveUserIndex] = (0, _react.useState)(0);

  /* Reducers */
  const idList = (0, _chemistryReducer.useProfileIdList)(false);
  const answeredProfileIdList = (0, _chemistryReducer.useProfileIdList)();
  const chemistry = (0, _chemistryReducer.useChemistry)();
  const scheduleAnswerToProfiles = (0, _useValueToProfileIdList.default)('schedule');
  const budgetAnswerToProfiles = (0, _useValueToProfileIdList.default)('food');
  const characterSectionCharacter = (0, _reactRedux.useSelector)(state => state.chemistry.data.profileList[answeredProfileIdList[characterSectionActiveUserIndex]]?.testResult.tripCharacter);
  const profileList = Object.values((0, _reactRedux.useSelector)(state => state.chemistry.data.profileList));
  const leaderDataList = (0, _chemistryReducer.filterProfile)(profileList, chemistry?.leaderList, "nickname");
  const follwerDataList = (0, _chemistryReducer.filterProfile)(profileList, answeredProfileIdList.filter(id => !chemistry?.leaderList.includes(id)), "nickname");
  const leadershipAnswerToProfileList = (0, _useValueToProfileIdList.default)("leadership");
  const sortedCityList = (0, _chemistryReducer.useSortedCityList)();
  (0, _react.useEffect)(() => {
    console.log(`[ChemistryDetailContent] budgetAnswerToProfiles=${JSON.stringify(budgetAnswerToProfiles)}`);
  }, [budgetAnswerToProfiles]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_LazyDomAnimation.default, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_SectionPaper.default, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.h2, {
          ..._props.FADEIN_VIEWPORT,
          className: "typography-heading",
          children: strings.sections.tripCharacter.title
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_framerMotion.m.div, {
          ..._props.FADEIN_VIEWPORT,
          className: "block__body",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
            spacing: -0.25,
            justifyContent: 'center',
            alignItems: 'start',
            children: answeredProfileIdList.map((id, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleButton.default, {
              value: index,
              onChange: (_, value) => setCharacterSectionActiveUserIndex(value),
              selected: characterSectionActiveUserIndex === index,
              className: "toggle-button--button-base",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FriendAvatar.default, {
                id: id,
                labelSize: "large"
              }, id)
            }, id))
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.AnimatePresence, {
            mode: "wait",
            initial: false,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_framerMotion.m.div, {
              ..._props.FADEIN,
              exit: "hidden",
              className: "navigation-button__container",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TestResultBlock.default, {
                id: answeredProfileIdList[characterSectionActiveUserIndex]
              }, characterSectionActiveUserIndex), characterSectionActiveUserIndex > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationButton.default, {
                navigateTo: "prev",
                onClick: () => setCharacterSectionActiveUserIndex(prev => prev > 0 ? prev - 1 : prev)
              }), characterSectionActiveUserIndex < answeredProfileIdList.length - 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationButton.default, {
                navigateTo: "next",
                onClick: () => setCharacterSectionActiveUserIndex(prev => prev < answeredProfileIdList.length - 1 ? prev + 1 : prev)
              })]
            }, characterSectionActiveUserIndex)
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.AnimatePresence, {
            mode: "wait",
            initial: false,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.p, {
              ..._props.FADEIN,
              exit: "hidden",
              custom: 0.5,
              children: characterSectionCharacter?.body
            }, characterSectionActiveUserIndex)
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SectionPaper.default, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.h2, {
          ..._props.FADEIN_VIEWPORT,
          className: "typography-heading",
          children: strings.sections.leadership.title
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_framerMotion.m.div, {
          ..._props.FADEIN_VIEWPORT,
          className: "block__body",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
            display: 'flex',
            justifyContent: 'center',
            children: Object.keys(Object.values(leadershipAnswerToProfileList)).length > 0 && Object.values(leadershipAnswerToProfileList).reverse()[0].map(id => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProfileImage.default, {
              id: id,
              showCharacterLabel: false
            }, id))
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
            flexWrap: "wrap",
            spacing: 4,
            justifyContent: "center",
            children: Object.keys(Object.values(leadershipAnswerToProfileList)).length > 1 && Object.entries(leadershipAnswerToProfileList).reverse().slice(1).map(([value, idList], index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
              sx: {
                flexWrap: "wrap"
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                className: "typography-note",
                children: testStrings.test.leadership.answers[Number(value)].label
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
                spacing: 0.5,
                children: idList.map(id => /*#__PURE__*/(0, _jsxRuntime.jsx)(_FriendAvatar.default, {
                  id: id
                }, id))
              })]
            }, value))
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "block__body",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: strings.sections.leadership.body.map((string, index) => string === "/idList" ? chemistry && leaderDataList.map((nickname, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.Fragment, {
                children: [index > 0 && ", ", /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
                  children: ` ${nickname} `
                }), strings.sections.leadership.idPostfix]
              }, nickname)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Fragment, {
                children: string
              }, index))
            }), follwerDataList.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: strings.sections.leadership.detail.map((string, index) => string === "/idList" ? chemistry && follwerDataList.map((nickname, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.Fragment, {
                children: [index > 0 && ", ", /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
                  children: ` ${nickname} `
                }), strings.sections.leadership.idPostfix]
              }, index)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Fragment, {
                children: string
              }, index))
            })]
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SectionPaper.default, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.h2, {
          ..._props.FADEIN_VIEWPORT,
          className: "typography-heading",
          children: strings.sections.schedule.title
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_framerMotion.m.div, {
          ..._props.FADEIN_VIEWPORT,
          className: "block__body",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.List, {
              disablePadding: true,
              children: Object.values(testStrings.test.schedule.answers).map(({
                label,
                value
              }) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.ListItem, {
                disablePadding: Object.keys(scheduleAnswerToProfiles).includes(String(value)),
                disableGutters: true,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemAvatar, {
                  style: {
                    width: "100px"
                  },
                  className: "block--centered",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                    className: Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? "typography-label" : "disabled",
                    children: label
                  })
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemText, {
                  primary: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
                      spacing: 0.5,
                      children: (Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? scheduleAnswerToProfiles[value] : []).map(id => /*#__PURE__*/(0, _jsxRuntime.jsx)(_FriendAvatar.default, {
                        id: id
                      }, id))
                    })
                  }),
                  sx: {
                    marginLeft: "16px"
                  }
                })]
              }, label)).reverse()
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "block__body",
            children: chemistry?.scheduleChemistryText?.map((body, index) => {
              const list = body.split(/(%\S*%)/);
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                children: list.map((t, index) => t[0] === "%" ? /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
                  children: t.replaceAll('%', '')
                }, index) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Fragment, {
                  children: t
                }, index))
              }, index);
            })
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SectionPaper.default, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.h2, {
          ..._props.FADEIN_VIEWPORT,
          className: "typography-heading",
          children: strings.sections.budget.title
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_framerMotion.m.div, {
          ..._props.FADEIN_VIEWPORT,
          className: "block__body",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "block--centered",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChemistrySlider.default, {
              ..._appConst.SLIDERPROPS_CHEMISTRY_BUDGET_FOOD
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "block__body",
            children: chemistry?.budgetChemistryText?.map((body, index) => {
              const list = body.split(/(%\S*%)/);
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                children: list.map((t, index) => t[0] === "%" ? /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
                  children: t.replaceAll('%', '')
                }, index) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Fragment, {
                  children: t
                }, index))
              }, index);
            })
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SectionPaper.default, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.h2, {
          ..._props.FADEIN_VIEWPORT,
          className: "typography-heading",
          children: strings.sections.city.title
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
          className: "block__body",
          children: sortedCityList && sortedCityList.map(cityClass => /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.li, {
            ..._props.FADEIN_VIEWPORT,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CityChemistryContent.default, {
              cityClass: cityClass
            })
          }, cityClass))
        })]
      })]
    })
  });
}
var _default = exports.default = ChemistryDetailContent;