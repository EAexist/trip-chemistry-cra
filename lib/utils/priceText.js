"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.priceText = void 0;
const priceText = value => {
  return `${value < 10000 ? value.toString() : `${value / 10000}만`}원`;
};
exports.priceText = priceText;