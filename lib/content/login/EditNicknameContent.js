"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../hooks/useNavigateWithGuestContext"));
var _LoadRequiredContent = require("../LoadRequiredContent");
var _SetNicknamePage = _interopRequireDefault(require("./SetNicknamePage"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* React Packages */

/* App */

;
function EditNicknameContent({}) {
  /* Hooks */
  const navigate = (0, _useNavigateWithGuestContext.default)();

  /* Reducers */

  /* States */

  /* Event Handlers */
  const handleClose = () => {
    navigate('/user', {
      state: {
        navigateDirection: 'prev'
      }
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadRequiredContent.AuthLoadRequiredContent
  // handleFail={handleFail}
  , {
    handleSuccess: handleClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SetNicknamePage.default, {
      handleClose: handleClose
    })
  });
}
var _default = exports.default = EditNicknameContent;