"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHelmetAsync = require("react-helmet-async");
var _jsxRuntime = require("react/jsx-runtime");
// import { Helmet } from "react-helmet";

const HelmetWrapper = props => {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactHelmetAsync.Helmet, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
      children: props.title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      name: "description",
      content: props.description
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      name: "keywords",
      content: props.keywords
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      name: "author",
      content: "Hyeon"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      property: "og:type",
      content: "website"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      property: "og:site_name",
      content: "여행 타입 테스트"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      property: "og:title",
      content: props.title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      property: "og:description",
      content: props.ogDescription ? props.ogDescription : props.description
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      property: "og:url",
      content: props.url
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("meta", {
      property: "og:image",
      content: props.image
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("link", {
      rel: "canonical",
      href: props.url
    })]
  });
};
var _default = exports.default = HelmetWrapper;