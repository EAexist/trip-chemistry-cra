"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _jsxRuntime = require("react/jsx-runtime");
/* React */

/* React Packages */

;
function TextFieldBlock({
  value,
  setValue,
  getIsValueAllowed,
  helperText,
  title,
  note,
  autoFocus,
  className
}) {
  /* Event Handlers */
  const handleClickDeleteAll = () => {
    setValue("");
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `block__body--large flex ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      className: "typography-body",
      children: title
    }), note && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "typography-note",
      children: note
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
        variant: "standard",
        value: value,
        autoFocus: autoFocus,
        onChange: event => {
          if (getIsValueAllowed(event.target.value)) {
            setValue(event.target.value);
          }
        }
        // placeholder={strings.searchFormPlaceholder}
        ,
        InputProps: {
          endAdornment: value.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.InputAdornment, {
            position: "end",
            sx: {
              position: "absolute",
              right: 0
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
              "aria-label": "delete all input",
              onClick: handleClickDeleteAll,
              edge: "end",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Close, {})
            })
          }),
          sx: {
            textAlign: 'center'
          },
          className: "typography-label"
        },
        fullWidth: true,
        helperText: typeof helperText === 'string' ? helperText : helperText(value),
        FormHelperTextProps: {
          sx: {
            textAlign: 'center'
          }
        }
      })
    })]
  });
}
var _default = exports.default = TextFieldBlock;