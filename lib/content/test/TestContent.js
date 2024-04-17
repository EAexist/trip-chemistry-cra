"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _framerMotion = require("framer-motion");
var _reactRedux = require("react-redux");
var _LazyDomAnimation = _interopRequireDefault(require("../../motion/LazyDomAnimation"));
require("swiper/css");
require("swiper/css/effect-coverflow");
var _react2 = require("swiper/react");
var _appConst = require("../../common/app-const");
var _texts = require("../../texts");
var _TestSection = _interopRequireDefault(require("../../components/Block/TestSection"));
var _FoodImageCard = _interopRequireDefault(require("../../components/Card/FoodImageCard"));
var _ImageCard = _interopRequireDefault(require("../../components/Card/ImageCard"));
var _OptionCard = _interopRequireDefault(require("../../components/Card/OptionCard"));
var _Flag = _interopRequireDefault(require("../../components/Flag"));
var _GoogleMapContext = _interopRequireDefault(require("../../components/GoogleMap/common/GoogleMapContext"));
var _options = require("../../components/GoogleMap/common/options");
var _GoogleMap = _interopRequireDefault(require("../../components/GoogleMap/ui/GoogleMap"));
var _GoogleMapMarker = _interopRequireDefault(require("../../components/GoogleMap/ui/GoogleMapMarker"));
var _Logo = _interopRequireDefault(require("../../components/Logo"));
var _PngIcon = _interopRequireDefault(require("../../components/PngIcon"));
var _ScrollPageContainer = _interopRequireDefault(require("../../components/ScrollPage/ScrollPageContainer"));
var _ScrollPageItem = _interopRequireDefault(require("../../components/ScrollPage/ScrollPageItem"));
var _StepCheckpointContext = require("../../components/Step/StepCheckpointContext");
var _StepContext = _interopRequireDefault(require("../../components/Step/StepContext"));
var _SectionButton = _interopRequireDefault(require("../../components/Step/components/SectionButton"));
var _Stepper = _interopRequireDefault(require("../../components/Step/components/Stepper"));
var _withReducer = _interopRequireDefault(require("../../hocs/withReducer"));
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _props = require("../../motion/props");
var _authReducer = require("../../reducers/authReducer");
var _testAnswerReducer = _interopRequireWildcard(require("../../reducers/testAnswerReducer"));
var _props2 = require("../../swiper/props");
var _getImgSrc = _interopRequireWildcard(require("../../utils/getImgSrc"));
var _priceText = require("../../utils/priceText");
var _LoadRequiredContent = _interopRequireWildcard(require("../LoadRequiredContent"));
var _AnswerButtonGroup = _interopRequireDefault(require("./component/AnswerButtonGroup"));
var _AnswerSlider = _interopRequireDefault(require("./component/AnswerSlider"));
var _TagSetTestAnswerChip = _interopRequireDefault(require("./component/TagSetTestAnswerChip"));
var _TestAnswerBadge = _interopRequireDefault(require("./component/TestAnswerBadge"));
var _TestInstruction = _interopRequireDefault(require("./component/TestInstruction"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* Externals */

/* Swiper */

/* Food Carousel */

/* App */

;
function TestContent({}) {
  const navigate = (0, _useNavigateWithGuestContext.default)();
  const theme = (0, _material.useTheme)();

  /* contentstrings */
  const contentstrings = (0, _texts.useStrings)().public.contents.test;
  const commonStrings = (0, _texts.useStrings)().public.common;

  /* Reducers */
  const isAllTestAnswered = (0, _testAnswerReducer.useIsAllTestAnswered)();
  const leadershipAnswer = (0, _reactRedux.useSelector)(state => state.testAnswer.data.leadership);
  const scheduleAnswer = (0, _reactRedux.useSelector)(state => state.testAnswer.data.schedule);
  const foodAnswer = (0, _reactRedux.useSelector)(state => state.testAnswer.data.food);
  const getProfile = (0, _authReducer.useGetProfile)();
  const submitAnswer = (0, _testAnswerReducer.useSubmitAnswer)();
  const [submitStatus, setSubmitStatus] = (0, _testAnswerReducer.useTestAnswerStatus)();

  /* States */
  const foodCarouselSwiperRef = (0, _react.useRef)(null);
  const [scheduleExampleMap, setScheduleExampleMap] = (0, _react.useState)();
  const [isConfirmTooltipOpen, setIsConfirmTooltipOpen] = (0, _react.useState)(false);
  const [step, setStep] = (0, _react.useState)(0);
  const [showScrollDownIcon, setShowScrollDownIcon] = (0, _react.useState)(true);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = (0, _react.useState)(false);

  /* 첫 렌더 후 Scroll Resotration 중에 Top Nav 가 슬라이드 되는 모션을 방지함. */
  const [preventInitialSwipe, setPreventInitialSwipe] = (0, _react.useState)(true);

  /* Event Handlers */
  const handleCityCardClick = (key, cityIndex) => {
    navigate(`../city/${key}`, {
      state: {
        initialIndex: cityIndex
      }
    });
  };
  const handleConfirmTooltipOpen = () => {
    if (!isAllTestAnswered) {
      setIsConfirmTooltipOpen(true);
    }
  };
  const handleConfirmTooltipClick = () => {
    /* @TODO Scroll To First UnAnswered Test Section. */
  };
  const handleConfirmButtonClick = () => {
    submitAnswer();
  };
  const handleSubmitSuccess = () => {
    setIsAnswerSubmitted(true);
    getProfile();
  };
  const handleLoadSuccess = () => {
    navigate('../result');
    // setIsAnswerSubmitted(false);
  };
  // const handleFail = () => {
  //     navigate('test');
  // }

  /* Side Effects */
  // useEffect(()=>{
  //     const newRootReducer = combineReducers({
  //         ...defaultReudcer,
  //         testAnswer: testAnswerReducer
  //       })          
  //       store.replaceReducer(newRootReducer)
  // }, [])

  /* Test Answer Side Effects */
  (0, _react.useEffect)(() => {
    if (foodAnswer !== undefined) {
      foodCarouselSwiperRef.current?.swiper.slideTo(Object.keys(_appConst.TEST.food.examples).indexOf(String(foodAnswer)));
    }
  }, [foodAnswer]);
  (0, _react.useEffect)(() => {
    if (scheduleAnswer !== undefined) {
      if (scheduleExampleMap !== undefined && scheduleExampleMap !== null) {
        let {
          zoom,
          center
        } = _appConst.TEST.schedule.subTests.schedule.examples[scheduleAnswer];
        scheduleExampleMap.setZoom(zoom);
        scheduleExampleMap.panTo(center);
      }
    }
  }, [scheduleAnswer, scheduleExampleMap]);

  /* Motion */
  const {
    scrollY
  } = (0, _framerMotion.useScroll)();
  (0, _framerMotion.useMotionValueEvent)(scrollY, "change", latest => {
    console.log(`[TestContent] ScrollY Change`);
    if (scrollY.get() > window.innerHeight) {
      setShowScrollDownIcon(false);
    } else {
      setShowScrollDownIcon(true);
    }
  });

  /* 첫 렌더 후 100ms 동안 Top Nav의 애니메이션 비활성화 */
  (0, _react.useEffect)(() => {
    const timer = setTimeout(() => {
      setPreventInitialSwipe(false);
    }, 100);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadRequiredContent.default, {
    status: submitStatus,
    setStatus: setSubmitStatus,
    handleSuccess: handleSubmitSuccess,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadRequiredContent.AuthLoadRequiredContent, {
      handleSuccess: handleLoadSuccess,
      isEnabled: isAnswerSubmitted,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "page",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_LazyDomAnimation.default, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_StepContext.default.Provider, {
            value: {
              step,
              setStep
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_StepCheckpointContext.StepCheckpointContextProvider, {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "top-nav",
                style: {
                  backgroundColor: theme.palette.gray.light
                },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.div, {
                  ..._props.FADEIN,
                  custom: 0.2,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Stepper.default, {
                    className: "block--with-margin-x top-nav__swiper",
                    speed: preventInitialSwipe ? 0 : 500,
                    children: Object.entries(_appConst.TEST_SECTIONS).map(([testName, {
                      icon
                    }], index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.SwiperSlide, {
                      className: "top-nav__swiper",
                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SectionButton.default, {
                        size: "small",
                        labelSize: "large",
                        value: index,
                        index: index,
                        label: contentstrings.subTest[testName].label,
                        sx: {
                          height: "100%",
                          display: 'flex',
                          alignItems: 'start',
                          paddingTop: '8px'
                        },
                        paperSx: {
                          opacity: 0.4
                        },
                        elevation: 1
                        // className="ButtonGroup__item"
                        ,
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TestAnswerBadge.default, {
                          testName: testName,
                          sx: {
                            height: 'fit-content',
                            padding: "4px"
                          },
                          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PngIcon.default, {
                            name: testName,
                            size: "large"
                          })
                        })
                      })
                    }, testName))
                  })
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ScrollPageContainer.default, {
                onPageChange: page => setStep(page),
                pages: Object.keys(_appConst.TEST_SECTIONS).length,
                children: [["expectation", "activity"].map((testName, index) => {
                  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ScrollPageItem.default, {
                    page: index,
                    className: "flex",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TestSection.default, {
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                        className: "flex-grow block--centered",
                        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                          className: "block--with-margin-x block__body--large",
                          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TestInstruction.default, {
                            testName: testName
                          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
                            flexWrap: "wrap",
                            justifyContent: "center",
                            rowGap: 1,
                            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TagSetTestAnswerChip.default, {
                              testName: testName
                            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TagSetTestAnswerChip.default, {
                              testName: testName,
                              selected: false
                            })]
                          })]
                        })
                      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                        className: "block",
                        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                          className: "test__title",
                          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
                            className: "test__title__heading typography-heading",
                            children: contentstrings.subTest[testName].title
                          })
                        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                          className: "test__input"
                        })]
                      })]
                    })
                  }, testName);
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ScrollPageItem.default, {
                  page: 2,
                  className: "flex",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TestSection.default, {
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                      className: "modal__container flex-grow",
                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
                        spacing: -4,
                        children: Object.entries(contentstrings.subTest.leadership.options).map(([value, {
                          detail
                        }]) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_OptionCard.default, {
                          isActive: Number(value) === leadershipAnswer,
                          children: [Number(value) === leadershipAnswer && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CardContent, {
                            sx: {
                              textAlign: 'center'
                            },
                            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                              className: "text",
                              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                                children: detail
                              })
                            })
                          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CardMedia, {
                            component: "img",
                            alt: value,
                            height: "100%",
                            image: (0, _getImgSrc.default)("/test", `leadership_${value}-medium`, _getImgSrc.FORMATWEBP),
                            srcSet: `${(0, _getImgSrc.default)("/test", `leadership_${value}-medium`, _getImgSrc.FORMATWEBP)} 128w`,
                            sizes: '30vw'
                          })]
                        }, value))
                      })
                    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                      className: "block block__body--large",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                        className: "test__title",
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
                          className: "test__title__heading typography-heading",
                          children: contentstrings.test.leadership.title
                        })
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_AnswerButtonGroup.default, {
                        testName: "leadership"
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})]
                    })]
                  })
                }, "leadership"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ScrollPageItem.default, {
                  page: 3,
                  className: "flex",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TestSection.default, {
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                      className: "flex-grow block--centered",
                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Card, {
                        className: "test__google-map-container modal__container",
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GoogleMapContext.default.Provider, {
                          value: {
                            map: scheduleExampleMap,
                            setMap: setScheduleExampleMap
                          },
                          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GoogleMap.default, {
                            opts: _options.OPTIONS_TEST_SCHEDULE,
                            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_GoogleMapMarker.default, {
                              ..._appConst.TEST.schedule.subTests.schedule.airportPlace
                            }), scheduleAnswer !== undefined && Object.entries(_appConst.TEST.schedule.subTests.schedule.examples).map(([value, {
                              places
                            }]) => places.map(place => /*#__PURE__*/(0, _jsxRuntime.jsx)(_GoogleMapMarker.default, {
                              ...place,
                              isActive: Number(value) <= scheduleAnswer
                            }, place.label)))]
                          })
                        })
                      })
                    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                      className: "block block__body--large",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                        className: "test__title",
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
                          className: "test__title__heading typography-heading",
                          children: contentstrings.test.schedule.title
                        })
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_AnswerButtonGroup.default, {
                        testName: "schedule"
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})]
                    })]
                  })
                }, "schedule"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ScrollPageItem.default, {
                  page: 4,
                  className: "flex",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TestSection.default, {
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                      className: "flex-grow block--centered",
                      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react2.Swiper, {
                        ..._props2.SWIPERPROPS_FOODCARDCAROUSEL,
                        className: "carousel__swiper carousel--coverflow__swiper modal__container",
                        ref: foodCarouselSwiperRef,
                        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TestInstruction.default, {
                          testName: "food",
                          showBackdrop: true,
                          className: "block--centered"
                        }), Object.values(_appConst.TEST.food.examples).map((id, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.SwiperSlide, {
                          className: "carousel__swiper carousel--coverflow__swiper",
                          children: ({
                            isActive
                          }) => id === "more" ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.AnimatePresence, {
                            mode: "wait",
                            initial: false,
                            children: isActive ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.div, {
                              ..._props.FADEIN,
                              exit: "hidden",
                              style: {
                                width: "260px",
                                height: "240px"
                              },
                              className: "block--centered block--with-padding block--with-padding--large",
                              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                                className: "block-with-margin-x",
                                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                                  children: "\uB354 \uB9CE\uC740 \uC2DD\uB2F9 \uCC3E\uC544\uBCF4\uAE30"
                                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.List, {
                                  children: _appConst.TEST.food.more.map(source => /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItem, {
                                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                                      href: _appConst.LINK[source].link,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemButton, {
                                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemText, {
                                          primary: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
                                            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Logo.default, {
                                              id: source,
                                              size: "small"
                                            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                                              children: commonStrings.linkType[source].name
                                            })]
                                          }),
                                          secondary: commonStrings.linkType[source].body
                                        })
                                      })
                                    })
                                  }, source))
                                })]
                              })
                            }, "summary") : /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.div, {
                              ..._props.FADEIN,
                              exit: "hidden",
                              style: {
                                width: "200px",
                                height: "240px",
                                position: "absolute",
                                opacity: 0.5
                              },
                              className: "block--centered",
                              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                                children: `더 많은 식당\n찾아보기`
                              })
                            }, "detail")
                          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_FoodImageCard.default, {
                            id: id,
                            isActive: isActive
                          })
                        }, id))]
                      })
                    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                      className: "block block__body--large",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                        className: "test__title",
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
                          className: "test__title__heading typography-heading",
                          children: contentstrings.subTest.food.title
                        })
                      }), foodAnswer !== undefined ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("h4", {
                        className: "typography-test-answer",
                        children: [(0, _priceText.priceText)(foodAnswer), " ", foodAnswer === _appConst.SLIDERPROPS_TEST_BUDGET_FOOD.max ? '이상' : '']
                      })
                      // : <h4 className='typography-test-answer'>? 원</h4>
                      : /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                        className: "container--center",
                        style: {
                          marginTop: 0
                        },
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_AnswerSlider.default, {
                          testName: "food",
                          ..._appConst.SLIDERPROPS_TEST_BUDGET_FOOD
                        })
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})]
                    })]
                  })
                }, "budget"), Object.entries(_appConst.TEST.city.subTests).map(([key, {
                  examples
                }], index) =>
                /*#__PURE__*/
                // <SectionPaperWithStep key={key} index={0e="section">
                (0, _jsxRuntime.jsx)(_ScrollPageItem.default, {
                  page: 5 + index,
                  className: "flex",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TestSection.default, {
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                      className: "flex-grow block--centered",
                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.Swiper, {
                        ..._props2.SWIPERPROPS_CAROUSEL,
                        className: "carousel__swiper",
                        children: examples.map((cityId, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_react2.SwiperSlide, {
                          className: "carousel__swiper",
                          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.ButtonBase, {
                            onClick: () => handleCityCardClick(key, index),
                            className: "block--full block__body--large",
                            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ImageCard.default, {
                              src: (0, _getImgSrc.default)("/city", cityId, _getImgSrc.FORMATWEBP),
                              title: cityId,
                              sx: {
                                width: "196px",
                                height: "196px",
                                borderRadius: "12px"
                              },
                              className: "body__head"
                            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
                              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
                                className: "typography-name",
                                children: commonStrings.city[cityId].name
                              }), _appConst.NATION[_appConst.CITY[cityId].nation].flag && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Flag.default, {
                                id: _appConst.CITY[cityId].nation
                              })]
                            })]
                          })
                        }, cityId))
                      })
                    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                      className: "block block__body--large",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                        className: "test__title",
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
                          className: "test__title__heading typography-heading",
                          children: contentstrings.test.city.titleTextList.map(text => text === "/testName" ? contentstrings.subTest[key].title : text === "/particle" ? contentstrings.subTest[key].particle : text)
                        })
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_AnswerButtonGroup.default, {
                        testName: key
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})]
                    })]
                  })
                }, key))]
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
                  open: isConfirmTooltipOpen,
                  onClose: () => setIsConfirmTooltipOpen(false),
                  onOpen: handleConfirmTooltipOpen,
                  title: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
                    onClick: handleConfirmTooltipClick,
                    endIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.NavigateNext, {}),
                    children: contentstrings.main.tooltip_completeTest
                  }),
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                    className: "block--with-margin flex",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
                      onClick: handleConfirmButtonClick,
                      disabled: !isAllTestAnswered,
                      variant: "contained",
                      className: "button--full",
                      children: contentstrings.main.confirmButton
                    })
                  })
                })
              })]
            })
          }), showScrollDownIcon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.div, {
            animate: {
              opacity: [1, 0.2, 1]
            },
            transition: {
              duration: 2.5,
              times: [0, 0.5, 1],
              ease: "easeInOut",
              repeat: Infinity
            },
            className: "floating--bottom block--centered block--with-padding ",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ExpandMore, {
              className: "typography-gray",
              sx: {
                fontSize: "40px"
              }
            })
          })]
        })
      })
    })
  });
}
var _default = exports.default = (0, _withReducer.default)(TestContent)({
  testAnswer: _testAnswerReducer.default
});