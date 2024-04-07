"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enumFromList = void 0;
const enumFromList = list => Object.fromEntries(list.map((key, index) => [key, index]));
exports.enumFromList = enumFromList;