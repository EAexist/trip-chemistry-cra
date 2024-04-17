"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _material = require("@mui/material");
var _Label = _interopRequireDefault(require("../Label"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
const ToggleLabeledButton = ({
  label,
  children,
  onChange,
  size = "medium",
  labelSize = 'medium',
  value,
  selected,
  contained = false,
  sx,
  paperSx,
  elevation = 0,
  className
}) => {
  const [elevated, setElevated] = (0, _react.useState)(false);
  const theme = (0, _material.useTheme)();
  (0, _react.useEffect)(() => {
    if (selected !== undefined) {
      setElevated(selected);
    }
  }, [selected]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.ButtonBase
  // variant="base"
  , {
    onClick: e => {
      if (onChange) onChange(e, value);
    },
    onMouseEnter: selected ? undefined : () => setElevated(true),
    onMouseLeave: selected ? undefined : () => setElevated(false),
    className: className,
    sx: {
      ...sx,
      height: "fit-content"
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
      label: label,
      labelSize: labelSize,
      isActive: selected,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Paper, {
        elevation: elevated ? 5 : elevation,
        sx: {
          ...(selected ? contained ? {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
          } : {
            backgroundColor: theme.palette.secondary.dark
          } : {
            backgroundColor: theme.palette.secondary.dark,
            ...paperSx
          })
        },
        className: `ToggleLabeledButton__paper ToggleLabeledButton__paper--${size}`,
        children: children
      })
    })
  });
};
var _default = exports.default = ToggleLabeledButton;