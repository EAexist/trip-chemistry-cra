"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
const ToggleButton = (0, _material.styled)(_material.ToggleButton)(({
  variant = 'enabled',
  selected,
  theme,
  sx
}) => variant === 'contained' ? selected ? {
  '& .MuiPaper-root, & .MuiPaper-root:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main
  }
} : {
  '& .MuiPaper-root': {
    border: `4px ${theme.palette.primary.main}`,
    color: theme.palette.primary.main
  }
} : variant === 'enabled' ? selected ? {
  '&.MuiButtonBase-root, &.MuiButtonBase-root:hover': {
    opacity: 1,
    backgroundColor: "transparent"
  }
} : {
  '&.MuiButtonBase-root': {
    opacity: 0.4
  }
} : {});
var _default = exports.default = ToggleButton;