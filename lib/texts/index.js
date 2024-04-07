"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregateTextProvider = AggregateTextProvider;
exports.ContentKey = void 0;
exports.useContentString = useContentString;
exports.useStrings = useStrings;
var _react = require("react");
var _stringTable_kr = _interopRequireDefault(require("./stringTable_kr"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

// type LangKey = "ko-kr";

const baseTextContext = /*#__PURE__*/(0, _react.createContext)(_stringTable_kr.default);
const TextProvidingWrapper = baseTextContext.Provider;
function AggregateTextProvider({
  children
}) {
  const [langStrings, setLangStrings] = (0, _react.useState)(_stringTable_kr.default);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TextProvidingWrapper, {
    value: langStrings,
    children: children
  });
}

/* https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking */
const ContentKey = exports.ContentKey = {
  Home: "home",
  Test: "test",
  Result: "result",
  Chemistry: "chemistry"
};
// type TestContentStrings = typeof 

// type TextKey = keyof (typeof baseLangStrings["public"]);

function useContentString(key) {
  const strings = (0, _react.useContext)(baseTextContext).public.contents[key];
  switch (key) {
    case "test":
      break;
    default:
      break;
  }

  // return strings as (typeof strings);
  return strings;
}

// interface useTestStringProps {
//     testName: ITestName;
//     subTestName?: SubTestName;
// };
// function useTestString({ testName, subTestName }: useTestStringProps) {

//     const baseStrings = usePageString('test')[testName as ITestName];

//     return(
//         subTestName ? baseStrings.subTests[subTestName as SubTestName] : baseStrings
//     );
// }

// function useString(key: TextKey) {
//     return Object(useContext(baseTextContext).public[key]);
// }

function useStrings() {
  const strings = (0, _react.useContext)(baseTextContext);
  return strings;
}

// function usePageAsset(page: Page) {
// return useContext(baseTextContext).public.assets[page];
// }