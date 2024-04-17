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
var _reactRouterDom = require("react-router-dom");
var _LazyDomAnimation = _interopRequireDefault(require("../../motion/LazyDomAnimation"));
var _FriendAvatar = _interopRequireDefault(require("../../components/Avatar/FriendAvatar"));
var _NoticeBlock = _interopRequireDefault(require("../../components/Block/NoticeBlock"));
var _SectionPaper = _interopRequireDefault(require("../../components/Paper/SectionPaper"));
var _HelmetWrapper = _interopRequireDefault(require("../../helmet/HelmetWrapper"));
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _RoutedMotionPage = _interopRequireDefault(require("../../motion/components/RoutedMotionPage"));
var _authReducer = require("../../reducers/authReducer");
var _chemistryReducer = require("../../reducers/chemistryReducer");
var _getImgSrc = _interopRequireWildcard(require("../../utils/getImgSrc"));
var _LoginContent = _interopRequireDefault(require("../login/LoginContent"));
var _ChemistryDetailContent = _interopRequireDefault(require("./ChemistryDetailContent"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* Externals */

/* App */

function ChemistryContent({}) {
  /* Hooks */
  const navigate = (0, _useNavigateWithGuestContext.default)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const params = (0, _reactRouterDom.useParams)();
  const chemistryId = params.chemistryId ? params.chemistryId : "";

  /* Induced */
  const link = `http://localhost:3000/chemistry/${chemistryId}`;

  /* Reducers */
  const {
    title,
    profileList
  } = (0, _chemistryReducer.useChemistry)();
  const isChemistryEnabled = (0, _chemistryReducer.useIsChemistryEnabled)();
  const userId = (0, _authReducer.useUserId)();
  const isAuthorized = (0, _authReducer.useIsAuthorized)();
  const hasAnsweredTest = (0, _authReducer.useHasAnsweredTest)();

  /* Induced */
  const isMember = Object.keys(profileList).includes(userId);

  /* States */
  const [isShareModalOpen, setIsShareModalOpen] = (0, _react.useState)(false);
  const [isLinkCopiedAlertOpen, setIsLinkCopiedAlertOpen] = (0, _react.useState)(false);
  const [showLoginContent, setShowLoginContent] = (0, _react.useState)(false);

  /* Deprecated */
  // const [isInviteOptionsOpen, setIsInviteOptionsOpen] = useState(false);
  // const [characterSectionActiveIProfileId, setCharacterSectionActiveIProfileId] = useState<IProfileId | undefined>(userId);

  /* Event Handlers */
  const handleClickNavigateBefore = () => {
    navigate('../myChemistry', {
      state: {
        navigateDirection: 'prev'
      }
    });
  };
  const handleStartTest = () => {
    navigate('../test');
  };
  const handleStartShare = () => {
    setIsShareModalOpen(true);
  };

  /* Deprecated */
  // const handleStartSearch = () => {
  //     navigate('searchAndInviteFriend', { state: { navigateDirection: 'next' } });
  // }

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };
  const handleCloseLinkCopiedAlert = () => {
    setIsLinkCopiedAlertOpen(false);
  };
  const handleCopyLink = async () => {
    /* https://sisiblog.tistory.com/301 */
    try {
      await navigator.clipboard.writeText(link);
      console.log('Content copied to clipboard');
      /* Resolved - 클립보드에 복사 성공 */
    } catch (err) {
      console.error('Failed to copy: ', err);
      /* Rejected - 클립보드에 복사 실패 */
    }
    setIsShareModalOpen(false);
    setIsLinkCopiedAlertOpen(true);
  };
  const handleJoinChemistry = isAuthorized ? () => {
    dispatch((0, _chemistryReducer.asyncJoinChemistry)({
      userId,
      chemistryId
    }));
  } : () => {
    setShowLoginContent(true);
  };

  /* Side Effects */
  (0, _react.useEffect)(() => {
    if (isLinkCopiedAlertOpen) {
      let timer = setTimeout(() => {
        setIsLinkCopiedAlertOpen(false);
      }, 2000);
    }
  }, [isLinkCopiedAlertOpen]);
  return !isAuthorized && showLoginContent ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoginContent.default, {}) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HelmetWrapper.default, {
      title: `여행 타입 테스트 | 친구들과 떠나는 여행을 준비해보세요.`
      // description={ `DESCRIPTION` }
      ,
      description: Object.values(profileList).length > 0 ? `${Object.values(profileList)[0].nickname}님의 ${title}. 참여하고 여행의 리더, 일정, 예산 그리고 여행지를 함께 결정해보세요.` : `${title}. 참여하고 여행의 리더, 일정, 예산 그리고 여행지를 함께 결정해보세요.`,
      keywords: "여행, 여행 일정, 여행지, 여행 계획, 여행 예산, 국내여행, 해외여행, MBTI",
      url: "https://eaexist.github.io/tripchemistry",
      image: "/static/images/meta/social-meta-iamge.jpg"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Toolbar, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RoutedMotionPage.default, {
      className: "page min-fill-window flex block--gray block__body--large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_SectionPaper.default, {
        className: "block__body body__head",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "body__head typography-note",
          children: isMember && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
            onClick: handleClickNavigateBefore,
            sx: {
              padding: 0
            },
            startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.NavigateBefore, {}),
            className: "typography-note",
            children: "\uC5EC\uD589 \uBAA9\uB85D"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
          className: "typography-heading",
          style: {
            marginTop: '0.5rem'
          },
          children: title
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.List, {
          children: Object.values(profileList).map(({
            id,
            nickname,
            testAnswer
          }) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.ListItem, {
            className: `${testAnswer === null && 'disabled'}`,
            secondaryAction: testAnswer === null && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
              className: "typography-note",
              spacing: 0,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Error, {
                sx: {
                  fontSize: 18
                }
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                children: "\uD14C\uC2A4\uD2B8 \uAE30\uB2E4\uB9AC\uB294 \uC911"
              })]
            }),
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemAvatar, {
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FriendAvatar.default, {
                id: id,
                showLabel: false
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemText, {
              primary: nickname,
              className: "typography-note"
            })]
          }, id))
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LazyDomAnimation.default, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_framerMotion.m.div, {
            className: "flex",
            children: isMember ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
              onClick: handleStartShare,
              startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.GroupAdd, {}),
              variant: "outlined",
              className: "button--full",
              children: "\uCE5C\uAD6C \uCD08\uB300\uD558\uAE30"
            })
            /* [Deprecated] 친구 초대 방법 선택 > 링크 공유로 통합 */
            // <m.div>
            //     {
            //         isInviteOptionsOpen
            //             ?
            //             <m.div {...FADEIN_VIEWPORT} key={String(isInviteOptionsOpen)}>
            //                 <Grid container columnSpacing={2}>
            //                     {
            //                         [
            //                             {
            //                                 onClick: handleStartShare,
            //                                 icon: 'share',
            //                                 label: '링크 공유'
            //                             },
            //                             {
            //                                 onClick: handleStartSearch,
            //                                 icon: 'person_search',
            //                                 label: '로그인 계정 검색'
            //                             },
            //                         ].map(({ onClick, icon, label }) => (
            //                             <Grid item xs={6} display={"flex"} flexDirection={'column'}>
            //                                 <Button
            //                                     onClick={onClick}
            //                                     startIcon={<Icon>{icon}</Icon>}
            //                                     variant="outlined"
            //                                     className="button--full"
            //                                 >
            //                                     {label}
            //                                 </Button>
            //                             </Grid>

            //                         ))
            //                     }
            //                 </Grid>
            //             </m.div>
            //             :
            //             <m.div className="flex">
            //                 <Button
            //                     onClick={() => setIsInviteOptionsOpen(true)}
            //                     startIcon={<GroupAdd />}
            //                     variant="outlined"
            //                     className="button--full"
            //                 >
            //                     친구 초대하기
            //                 </Button>
            //             </m.div>
            //     }
            // </m.div>
            : /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
              onClick: handleJoinChemistry,
              startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.AirplaneTicket, {}),
              variant: "outlined",
              className: "button--full",
              children: "\uCC38\uC5EC\uD558\uAE30"
            })
          })
        })]
      }), isChemistryEnabled ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChemistryDetailContent.default, {}) :
      /*#__PURE__*/
      /* 참여자를 한 명도 추가하지 않음. */
      (0, _jsxRuntime.jsx)(_material.Paper, {
        elevation: 0,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NoticeBlock.default, {
          alt: "invite",
          src: (0, _getImgSrc.default)('/info', "invite", _getImgSrc.FORMATWEBP),
          ...(Object.keys(profileList).length < 2 ? {
            body: "여행을 함께할 친구를 초대하고\n케미스트리를 확인해보세요."
          } : {
            body: "두 명 이상이 테스트를 완료하면 결과를 확인할 수 있어요."
          }),
          isFullscreen: false
        })
      }), isMember && !hasAnsweredTest && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "block--white",
        style: {
          marginTop: 0
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "placeholder--button--full block--with-margin",
          style: {
            marginTop: 0
          }
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Modal, {
        open: isShareModalOpen,
        onClose: handleCloseShareModal,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "floating--bottom",
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SectionPaper.default, {
            square: false,
            sx: {
              borderRadius: "16px"
            },
            className: "block__body block--with-margin--small flex",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
              container: true,
              className: "body__head",
              children: [{
                onClick: handleCopyLink,
                icon: 'content_copy',
                label: '링크 복사'
              }, {
                onClick: handleCopyLink,
                icon: 'more_horiz',
                label: '더보기'
              }].map(({
                onClick,
                icon,
                label
              }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
                item: true,
                xs: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ButtonBase, {
                  onClick: onClick,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
                    direction: "column",
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Avatar, {
                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Icon, {
                        children: icon
                      })
                    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                      className: "typography-note",
                      children: label
                    })]
                  })
                })
              }, label))
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
              onClick: handleCloseShareModal,
              variant: "contained",
              color: "gray",
              className: "button--full",
              children: "\uB2EB\uAE30"
            })]
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Modal, {
        open: isLinkCopiedAlertOpen,
        onClose: handleCloseLinkCopiedAlert,
        hideBackdrop: true,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "floating--bottom",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Alert, {
            action: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
              "aria-label": "close",
              color: "inherit",
              size: "small",
              onClick: () => {
                setIsLinkCopiedAlertOpen(false);
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Close, {
                fontSize: "inherit"
              })
            }),
            severity: "success",
            className: "block--with-margin--small",
            children: "\uB9C1\uD06C\uB97C \uBCF5\uC0AC\uD588\uC5B4\uC694."
          })
        })
      }), isMember && !hasAnsweredTest && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "floating--bottom flex",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
          onClick: handleStartTest,
          variant: "contained",
          className: "button--full block--with-margin",
          children: "\uD14C\uC2A4\uD2B8 \uD558\uB7EC\uAC00\uAE30"
        })
      })]
    })]
  });
}
var _default = exports.default = ChemistryContent;