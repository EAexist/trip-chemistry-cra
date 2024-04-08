"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _Page = _interopRequireDefault(require("./route/Page"));
var _appConst = require("./common/app-const");
var _component = _interopRequireDefault(require("@loadable/component"));
var _reactRedux = require("react-redux");
var _store = require("./store");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; } /* React Packages */ // import { lazy, Suspense } from 'react';
// import { Provider } from 'react-redux';
/* App */ // import { store } from './store';
/* [Performance][Code Splitting]  */ /* 1. Static Import */ // import AuthRequiredRoute from './route/AuthRequiredRoute';
// import TestRequiredRoute from './route/TestRequiredRoute';
// import GuestRoute from './route/GuestRoute';
// import AuthRecommendedPage from './route/AuthRecommendedPage';
// import HomeContent from './content/home/HomeContent';
// import ChemistryContent from './content/chemistry/ChemistryContent';
// import SearchAndInviteFriendContent from './content/chemistry/SearchAndInviteFriendContent';
// import CityDetailContent from './content/city/CityDetailContent';
// import TestContent from './content/test/TestContent';
// import AuthContent from './content/login/AuthContent';
// import InitializeNicknameContent from './content/login/InitializeNicknameContent';
// import KakaoAuthRedirectPage from './content/login/KakaoAuthRedirectPage';
// import UserContent from './content/user/UserContent';
// import EditNicknameContent from './content/login/EditNicknameContent';
// import ResultContent from './content/result/ResultContent';
// import ChemistryListContent from './content/chemistry/ChemistryListContent';
// import CreateChemistryContent from './content/chemistry/CreateChemistryContent';
/* 2. Lzay Import */ // const AuthRequiredRoute = lazy(() => import('./route/AuthRequiredRoute'));
// const TestRequiredRoute = lazy(() => import('./route/TestRequiredRoute'));
// const GuestRoute = lazy(() => import('./route/GuestRoute'));
// const AuthRecommendedPage = lazy(() => import('./route/AuthRecommendedPage'));
// const HomeContent = lazy(() => import('./content/home/HomeContent'));
// const ChemistryContent = lazy(() => import('./content/chemistry/ChemistryContent'));
// const SearchAndInviteFriendContent = lazy(() => import('./content/chemistry/SearchAndInviteFriendContent'));
// const CityDetailContent = lazy(() => import('./content/city/CityDetailContent'));
// const TestContent = lazy(() => import('./content/test/TestContent'));
// const AuthContent = lazy(() => import('./content/login/AuthContent'));
// const InitializeNicknameContent = lazy(() => import('./content/login/InitializeNicknameContent'));
// const KakaoAuthRedirectPage = lazy(() => import('./content/login/KakaoAuthRedirectPage'));
// const UserContent = lazy(() => import('./content/user/UserContent'));
// const EditNicknameContent = lazy(() => import('./content/login/EditNicknameContent'));
// const ResultContent = lazy(() => import('./content/result/ResultContent'));
// const ChemistryListContent = lazy(() => import('./content/chemistry/ChemistryListContent'));
// const CreateChemistryContent = lazy(() => import('./content/chemistry/CreateChemistryContent'));
/* 3. Loadable Components */
const AuthRequiredRoute = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "AuthRequiredRoute";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "AuthRequiredRoute" */'./route/AuthRequiredRoute'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./route/AuthRequiredRoute");
    }
    return eval('require.resolve')("./route/AuthRequiredRoute");
  }
});
const TestRequiredRoute = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "TestRequiredRoute";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "TestRequiredRoute" */'./route/TestRequiredRoute'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./route/TestRequiredRoute");
    }
    return eval('require.resolve')("./route/TestRequiredRoute");
  }
});
// const GuestRoute = loadable(() => import( /* webpackChunkName: "GuestRoute" */'./route/GuestRoute'));
const AuthRecommendedPage = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "AuthRecommendedPage";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "AuthRecommendedPage" */'./route/AuthRecommendedPage'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./route/AuthRecommendedPage");
    }
    return eval('require.resolve')("./route/AuthRecommendedPage");
  }
});
const ChemistryReducerProvider = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "ChemistryReducerProvider";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "ChemistryReducerProvider" */'./reducers/ChemistryReducerProvider'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./reducers/ChemistryReducerProvider");
    }
    return eval('require.resolve')("./reducers/ChemistryReducerProvider");
  }
});
// import ChemistryReducerProvider from './reducers/ChemistryReducerProvider';

const HomeContent = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "HomeContent";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "HomeContent" */'./content/home/HomeContent'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./content/home/HomeContent");
    }
    return eval('require.resolve')("./content/home/HomeContent");
  }
});
const ChemistryContent = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "ChemistryContent";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "ChemistryContent" */'./content/chemistry/ChemistryContent'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./content/chemistry/ChemistryContent");
    }
    return eval('require.resolve')("./content/chemistry/ChemistryContent");
  }
});
const SearchAndInviteFriendContent = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "SearchAndInviteFriendContent";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "SearchAndInviteFriendContent" */'./content/chemistry/SearchAndInviteFriendContent'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./content/chemistry/SearchAndInviteFriendContent");
    }
    return eval('require.resolve')("./content/chemistry/SearchAndInviteFriendContent");
  }
});
const CityDetailContent = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "CityDetailContent";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "CityDetailContent" */'./content/city/CityDetailContent'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./content/city/CityDetailContent");
    }
    return eval('require.resolve')("./content/city/CityDetailContent");
  }
});
const TestContent = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "TestContent";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "TestContent" */'./content/test/TestContent'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./content/test/TestContent");
    }
    return eval('require.resolve')("./content/test/TestContent");
  }
});

// const AuthContent = loadable(() => import( /* webpackChunkName: "AuthContent" */'./content/login/AuthContent'));
const InitializeNicknameContent = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "InitializeNicknameContent";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "InitializeNicknameContent" */'./content/login/InitializeNicknameContent'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./content/login/InitializeNicknameContent");
    }
    return eval('require.resolve')("./content/login/InitializeNicknameContent");
  }
});
const KakaoAuthRedirectPage = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "KakaoAuthRedirectPage";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "KakaoAuthRedirectPage" */'./content/login/KakaoAuthRedirectPage'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./content/login/KakaoAuthRedirectPage");
    }
    return eval('require.resolve')("./content/login/KakaoAuthRedirectPage");
  }
});
const UserContent = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "UserContent";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "UserContent" */'./content/user/UserContent'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./content/user/UserContent");
    }
    return eval('require.resolve')("./content/user/UserContent");
  }
});
const EditNicknameContent = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "EditNicknameContent";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "EditNicknameContent" */'./content/login/EditNicknameContent'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./content/login/EditNicknameContent");
    }
    return eval('require.resolve')("./content/login/EditNicknameContent");
  }
});
const ResultContent = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "ResultContent";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "ResultContent" */'./content/result/ResultContent'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./content/result/ResultContent");
    }
    return eval('require.resolve')("./content/result/ResultContent");
  }
});
const ChemistryListContent = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "ChemistryListContent";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "ChemistryListContent" */'./content/chemistry/ChemistryListContent'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./content/chemistry/ChemistryListContent");
    }
    return eval('require.resolve')("./content/chemistry/ChemistryListContent");
  }
});
const CreateChemistryContent = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "CreateChemistryContent";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!__webpack_modules__[key];
    }
    return false;
  },
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "CreateChemistryContent" */'./content/chemistry/CreateChemistryContent'))),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id);
    }
    return eval('module.require')(id);
  },
  resolve() {
    if (require.resolveWeak) {
      return require.resolveWeak("./content/chemistry/CreateChemistryContent");
    }
    return eval('require.resolve')("./content/chemistry/CreateChemistryContent");
  }
});
const sessionRoute = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
    path: "/",
    element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Navigate, {
      to: "home"
    })
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
    index: true,
    path: 'home',
    element: /*#__PURE__*/(0, _jsxRuntime.jsx)(HomeContent, {})
  }, 'home'), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Route, {
    path: 'chemistry/:chemistryId',
    element: /*#__PURE__*/(0, _jsxRuntime.jsx)(ChemistryReducerProvider, {}),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      index: true,
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(ChemistryContent, {})
    }, 'index'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      path: 'searchAndInviteFriend',
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(SearchAndInviteFriendContent, {})
    }, 'searchAndInviteFriend')]
  }, 'chemistry'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
    path: 'city',
    element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Outlet, {}),
    children: Object.keys(_appConst.TEST.city.subTests).map(cityClass => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      path: cityClass,
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(CityDetailContent, {
        cityClass: cityClass
      })
    }, cityClass))
  }, 'city'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
    element: /*#__PURE__*/(0, _jsxRuntime.jsx)(AuthRecommendedPage, {}),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      path: 'test',
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(TestContent, {})
    }, 'test')
  }, 'authRecommended'), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Route, {
    element: /*#__PURE__*/(0, _jsxRuntime.jsx)(AuthRequiredRoute, {}),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Route, {
      path: 'user',
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Outlet, {}),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
        index: true,
        element: /*#__PURE__*/(0, _jsxRuntime.jsx)(UserContent, {})
      }, 'index'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
        path: 'setNickname',
        element: /*#__PURE__*/(0, _jsxRuntime.jsx)(EditNicknameContent, {})
      }, 'setNickname')]
    }, 'user'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(TestRequiredRoute, {}),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
        path: 'result',
        element: /*#__PURE__*/(0, _jsxRuntime.jsx)(ResultContent, {})
      }, 'result')
    }, 'testRequired'), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Route, {
      path: 'myChemistry',
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Outlet, {}),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
        index: true,
        element: /*#__PURE__*/(0, _jsxRuntime.jsx)(ChemistryListContent, {})
      }, 'myChemistry'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
        path: 'new',
        element: /*#__PURE__*/(0, _jsxRuntime.jsx)(CreateChemistryContent, {})
      }, 'new')]
    }, 'myChemistry')]
  }, 'authRequired'), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Route, {
    path: 'login',
    element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Outlet, {}),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      path: 'initializeNickname',
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(InitializeNicknameContent, {})
    }, 'initializeNickname'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      path: 'kakaoAuthRedirect',
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(KakaoAuthRedirectPage, {})
    }, 'redirectURI')]
  }, 'login')]
});
function App() {
  return (
    /*#__PURE__*/
    // <AnimatePresence>
    // <ThemeProvider theme={theme}>
    (0, _jsxRuntime.jsx)(_reactRedux.Provider, {
      store: _store.store,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Routes, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
          path: '/',
          element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Page.default, {}),
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Route, {
            element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Outlet, {}),
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
              path: 'testPreview',
              element: /*#__PURE__*/(0, _jsxRuntime.jsx)(TestContent, {})
            }, 'testPreview'), sessionRoute]
          }, 'index')
        })
      })
    })
    // </ThemeProvider>
    // </AnimatePresence>
  );
}
var _default = exports.default = App;