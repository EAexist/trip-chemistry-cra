"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _axios = _interopRequireDefault(require("axios"));
var _react = require("react");
var _appConst = require("../../../common/app-const");
var _LabeledAvatar = _interopRequireDefault(require("../../../components/Avatar/LabeledAvatar"));
var _useNavigateWithGuestContext = _interopRequireDefault(require("../../../hooks/useNavigateWithGuestContext"));
var _IChemistry = require("../../../interfaces/IChemistry");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
function ChemistrySummaryButton({
  id
}) {
  /* Hooks */
  const navigate = (0, _useNavigateWithGuestContext.default)();

  /* State */
  const [chemistry, setChemistry] = (0, _react.useState)(_IChemistry.defaultChemistry);

  /* Event Handler */
  const handleClick = () => {
    navigate(`../chemistry/${id}`, {
      state: {
        navigateDirection: 'next'
      }
    });
  };

  /* Side Effect */
  (0, _react.useEffect)(() => {
    /* API 요청 */
    _axios.default.get(`/chemistry`, {
      method: "GET",
      headers: _appConst.HEADERS_AXIOS,
      params: {
        id: id
      }
    }).then(response => {
      setChemistry(response.data);
    });
  }, [id]);
  (0, _react.useEffect)(() => {
    console.log(`[ChemistrySummaryButton] chemistry=${chemistry}`);
  }, [chemistry]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Card, {
    className: "block--xlarge",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.CardActionArea, {
      onClick: handleClick,
      className: "flex-end",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.CardContent, {
        className: "block__body--large block--centered",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
          className: "typography-body",
          children: chemistry.title
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Stack, {
          spacing: 0.75,
          children: Object.values(chemistry.profileList).map(({
            testResult,
            nickname
          }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_LabeledAvatar.default, {
            nickname,
            characterId: testResult && testResult.tripCharacter ? testResult.tripCharacter.id : "user"
          }, nickname))
        })]
      })
    })
  });
}
var _default = exports.default = ChemistrySummaryButton;