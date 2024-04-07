"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
const PaginationDiv = (0, _material.styled)(_material.Box)(({
  theme
}) => ({
  marginTop: "16px",
  marginBottom: "16px",
  // width: "fit-content",
  display: "flex",
  /* justify-content: "center", */
  gap: "4px",
  zIndex: "1",
  "& .swiper-pagination-bullet-active": {
    backgroundColor: theme.palette.primary.main
  }
}));
var _default = exports.default = PaginationDiv;