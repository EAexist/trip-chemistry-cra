"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _reactRedux = require("react-redux");
var _LabeledAvatar = _interopRequireDefault(require("../../components/Avatar/LabeledAvatar"));
var _RoutedMotionPage = _interopRequireDefault(require("../../motion/components/RoutedMotionPage"));
var _AppBarContext = require("../../components/AppBar/AppBarContext");
var _LoadStatus = require("../../interfaces/enums/LoadStatus");
var _authReducer = require("../../reducers/authReducer");
var _chemistryReducer = require("../../reducers/chemistryReducer");
var _profileSearchReducer = require("../../reducers/profileSearchReducer");
var _texts = require("../../texts");
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* Externals */

/* App */

;
function SearchAndInviteFriendContent({
  handleSucess
}) {
  /* Constants */
  const strings = (0, _texts.useStrings)().public.contents.chemistry.addFriend;
  const commonStrings = (0, _texts.useStrings)().public.common;

  /* Hooks */
  const navigate = (0, _useNavigateWithGuestContext.default)();
  const dispatch = (0, _reactRedux.useDispatch)(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
  const isAppBarHidden = (0, _AppBarContext.useHideAppbar)();

  /* States */
  const [input, setInput] = (0, _react.useState)(""); /* AutoComplete에 사용자가 입력한 값 */
  const flaggedProfileList = (0, _profileSearchReducer.useFlaggedProfileList)();
  const flaggedProfileListLength = Object.keys(flaggedProfileList).length;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = (0, _react.useState)(false);

  /* Reducers */
  const profileSearchResultList = (0, _profileSearchReducer.useSearchedProfileList)();
  const [profileSearchtatus] = (0, _profileSearchReducer.useProfileSearchStatus)();
  const idList = (0, _chemistryReducer.useProfileIdList)();
  const addusers = (0, _profileSearchReducer.useAddProfiles)();
  const userId = (0, _authReducer.useUserId)();

  /* Event Handlers */
  const handleCloseButtonClick = () => {
    if (flaggedProfileListLength > 0) {
      setIsConfirmModalOpen(true);
    } else {
      handleClose();
    }
  };
  const handleAddFriendAndClose = () => {
    // dispatch(clearChemistry());
    addusers();
    handleClose();
  };
  const handleClose = () => {
    navigate('../', {
      state: {
        navigateDirection: 'prev'
      }
    });
  };
  const handleToggle = profile => {
    if (Object.keys(flaggedProfileList).includes(profile.id)) {
      dispatch((0, _profileSearchReducer.deleteFlagged)(profile.id));
    } else {
      dispatch((0, _profileSearchReducer.addFlagged)(profile));
    }
  };
  const handleConfirmSuccess = () => {};
  const handleConfirmMissFail = () => {};

  /* Side Effects */
  (0, _react.useEffect)(() => {
    dispatch((0, _profileSearchReducer.resetSearch)());
  }, []);
  (0, _react.useEffect)(() => {
    if (input !== "") {
      dispatch((0, _profileSearchReducer.asyncSearchProfile)(input));
    }
  }, [input, dispatch]);
  (0, _react.useEffect)(() => {
    console.log(`[SearchAndInviteFriendContent] profileSearchtatus=${profileSearchtatus}`);
  }, [profileSearchtatus]);
  const FlaggedAvatarProfileGroup = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
    children: Object.values(flaggedProfileList).map(profile => /*#__PURE__*/(0, _jsxRuntime.jsx)(_LabeledAvatar.default, {
      ...profile,
      labelSize: "large"
    }, profile.nickname))
  });
  return isAppBarHidden && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RoutedMotionPage.default, {
    children: isConfirmModalOpen ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "block--with-margin block__body--large block--centered flex-grow",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
        className: "typography-label",
        children: `${flaggedProfileListLength}명을 친구로 추가할까요?`
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(FlaggedAvatarProfileGroup, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Grid, {
        container: true,
        columnSpacing: 4,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          item: true,
          xs: 6,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
            onClick: handleAddFriendAndClose,
            startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Done, {}),
            children: "\uCE5C\uAD6C\uB85C \uCD94\uAC00\uD558\uAE30"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          item: true,
          xs: 6,
          display: "flex",
          justifyContent: "center",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
            onClick: handleClose,
            startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Close, {}),
            children: "\uADF8\uB0E5 \uB2EB\uAE30"
          })
        })]
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Toolbar, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
          edge: "start",
          onClick: handleCloseButtonClick,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.NavigateBefore, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
          disabled: flaggedProfileListLength === 0,
          onClick: handleAddFriendAndClose,
          variant: "text",
          className: "",
          startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Done, {}),
          children: `확인${flaggedProfileListLength > 0 ? ` (${flaggedProfileListLength}명 일행으로 추가하기)` : ''}`
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "block--with-margin flex-grow block__body--large flex",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
          onChange: event => {
            setInput(event.target.value);
          },
          placeholder: strings.searchFormPlaceholder,
          InputProps: {
            startAdornment: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.InputAdornment, {
              position: "start",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Search, {})
            })
          },
          sx: {
            width: "100%"
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(FlaggedAvatarProfileGroup, {}), profileSearchtatus === _LoadStatus.LoadStatus.FAIL ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "flex-grow block--centered block__body--large",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Warning, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
            children: commonStrings.error.connect
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: commonStrings.error.contact
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Stack, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Icon, {
              children: commonStrings.contact.icon
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: commonStrings.contact.mail
            })]
          })]
        }) : input !== "" && profileSearchResultList.length === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "flex-grow block--centered",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.QuestionMark, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            children: ["\uC0AC\uC6A9\uC790\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC5B4\uC694. ", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), " \uCE5C\uAD6C\uC758 \uB2C9\uB124\uC784\uACFC \uD0DC\uADF8\uB97C \uB2E4\uC2DC \uD655\uC778\uD574\uC8FC\uC138\uC694."]
          })]
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.List, {
              children: profileSearchResultList.map(profile => /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItem, {
                disablePadding: true,
                secondaryAction: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                  style: {
                    marginRight: "16px"
                  },
                  children: profile.id === userId ? /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                    className: "typography-note disabled",
                    children: "\uB098"
                  }) : idList.includes(profile.id) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                    className: "typography-note disabled",
                    children: "\uC774\uBBF8 \uCD94\uAC00\uB418\uC5C8\uC5B4\uC694"
                  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Checkbox, {
                    edge: "end",
                    checked: Object.keys(flaggedProfileList).includes(profile.id)
                  })
                }),
                children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.ListItemButton, {
                  disableGutters: true,
                  onClick: () => handleToggle(profile),
                  disabled: idList.includes(profile.id),
                  style: {
                    zIndex: 2
                  },
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemAvatar, {
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LabeledAvatar.default, {
                      characterId: profile.testResult ? profile.testResult.tripCharacter.id : undefined,
                      showLabel: false
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ListItemText, {
                    primary: profile.nickname
                  })]
                })
              }, profile.id))
            })
          })
        })]
      })]
    })
  });
}
var _default = exports.default = SearchAndInviteFriendContent;