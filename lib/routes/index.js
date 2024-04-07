"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _Page = _interopRequireDefault(require("../route/Page"));
var _component = _interopRequireDefault(require("@loadable/component"));
require("./styles/index.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; } /* 3. Loadable Components */
const AuthRequiredRoute = (0, _component.default)({
  resolved: {},
  chunkName() {
    return "route-AuthRequiredRoute";
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
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "route-AuthRequiredRoute" */'../route/AuthRequiredRoute'))),
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
      return require.resolveWeak("../route/AuthRequiredRoute");
    }
    return eval('require.resolve')("../route/AuthRequiredRoute");
  }
});
// const TestRequiredRoute = loadable(() => import('../route/TestRequiredRoute'));
// const GuestRoute = loadable(() => import('../route/GuestRoute'));
// const AuthRecommendedPage = loadable(() => import(/* webpackChunkName: "AuthRecommendedPage" */ '../route/AuthRecommendedPage'));

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
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "HomeContent" */'../content/home/HomeContent'))),
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
      return require.resolveWeak("../content/home/HomeContent");
    }
    return eval('require.resolve')("../content/home/HomeContent");
  }
});
// const ChemistryContent = loadable(() => import('../content/chemistry/ChemistryContent'));
// const SearchAndInviteFriendContent = loadable(() => import('../content/chemistry/SearchAndInviteFriendContent'));
// const CityDetailContent = loadable(() => import('../content/city/CityDetailContent'));
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
  importAsync: () => Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "TestContent" */'../content/test/TestContent'))),
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
      return require.resolveWeak("../content/test/TestContent");
    }
    return eval('require.resolve')("../content/test/TestContent");
  }
});

// const AuthContent = loadable(() => import('../content/login/AuthContent'));
// const InitializeNicknameContent = loadable(() => import('../content/login/InitializeNicknameContent'));
// const KakaoAuthRedirectPage = loadable(() => import('../content/login/KakaoAuthRedirectPage'));

// const UserContent = loadable(() => import('../content/user/UserContent'));
// const EditNicknameContent = loadable(() => import('../content/login/EditNicknameContent'));
// const ResultContent = loadable(() => import('../content/result/ResultContent'));
// const ChemistryListContent = loadable(() => import('../content/chemistry/ChemistryListContent'));
// const CreateChemistryContent = loadable(() => import('../content/chemistry/CreateChemistryContent'));

const routes = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Routes, {
  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Route, {
    path: '/',
    element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Page.default, {}),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      path: 'home',
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(HomeContent, {})
    }, 'home'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
      path: 'testPreview',
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(TestContent, {})
    }, 'testPreview')]
  })
});
var _default = exports.default = routes; // const lazyLoadRoutes = true;
// const sessionRoute =
// lazyLoadRoutes ?
//         <Route element={<>
//             <AppBar />
//             <Outlet /></>
//         }>
//             <Route key={'home'} path={'home'} element={
//                 <Suspense>
//                     <HomeContent />
//                 </Suspense>} />
//             <Route key={'chemistry'} path={'chemistry/:chemistryId'} element={<Outlet />} >
//                 <Route key={'index'} index element={
//                     <Suspense>
//                         <ChemistryContent />
//                     </Suspense>} />
//                 <Route key={'searchAndInviteFriend'} path={'searchAndInviteFriend'} element={
//                     <Suspense>
//                         <SearchAndInviteFriendContent />
//                     </Suspense>} />
//             </Route>
//             <Route key={'city'} path={'city'} element={<Outlet />} >
//                 {
//                     Object.keys(TEST.city.subTests).map((cityClass) => (
//                         <Route key={cityClass} path={cityClass} element={
//                             <Suspense>
//                                 <CityDetailContent cityClass={cityClass as keyof typeof TEST.city.subTests} />
//                             </Suspense>} />
//                     ))
//                 }
//             </Route>
//             {/* [SEO, Authorization] Hide Contents by style={ display: 'none' } when unAuthorized. Content must be rendered yet is visible. */}
//             <Route key={'authRecommended'} element={
//                 <Suspense>
//                     <AuthRecommendedPage />
//                 </Suspense>}>
//                 <Route key={'test'} path={'test'} element={
//                     <Suspense>
//                         <TestContent />
//                     </Suspense>} />
//             </Route>
//             {/* [SEO, Authorization] Routes are excluded in robots.txt. URL Accesses are redirected to login page. */}
//             <Route key={'authRequired'} element={
//                 <Suspense>
//                     <AuthRequiredRoute />
//                 </Suspense>}>
//                 <Route key={'user'} path={'user'} element={<Outlet />} >
//                     <Route key={'index'} index element={
//                         <Suspense>
//                             <UserContent />
//                         </Suspense>} />
//                     <Route key={'setNickname'} path={'setNickname'} element={
//                         <Suspense>
//                             <EditNicknameContent />
//                         </Suspense>} />
//                 </Route>
//                 <Route key={'testRequired'} element={
//                     <Suspense>
//                         <TestRequiredRoute />
//                     </Suspense>}>
//                     <Route key={'result'} path={'result'} element={
//                         <Suspense>
//                             <ResultContent />
//                         </Suspense>} />
//                 </Route>
//                 <Route key={'myChemistry'} path={'myChemistry'} element={<Outlet />} >
//                     <Route key={'myChemistry'} index element={
//                         <Suspense>
//                             <ChemistryListContent />
//                         </Suspense>} />
//                     <Route key={'new'} path={'new'} element={
//                         <Suspense>
//                             <CreateChemistryContent />
//                         </Suspense>} />
//                 </Route>
//             </Route>
//             {/* [SEO, Authorization] Routes are protected from access-by-URL. Can only be accessed by useNavigate Hook (/initializeNickname) or redirection from Kakao Auth API Page (/kakaoAuthRedirect). Routes are excluded in robots.txt. URL Accesses are redirected to login page. */}
//             <Route key={'login'} path={'login'} element={
//                 <Suspense>
//                     <AuthContent />
//                 </Suspense>} >
//                 <Route key={'initializeNickname'} path={'initializeNickname'} element={
//                     <Suspense>
//                         <InitializeNicknameContent />
//                     </Suspense>} />
//                 <Route key={'redirectURI'} path={'kakaoAuthRedirect'} element={
//                     <Suspense>
//                         <KakaoAuthRedirectPage />
//                     </Suspense>} />
//             </Route>
//         </Route>
//     :
//     /* Static Import of Route Elements */
//     <Route element={<>
//         <AppBar />
//         <Outlet /></>
//     }>
//         <Route key={'home'} path={'home'} element={<HomeContent />} />
//         <Route key={'chemistry'} path={'chemistry/:chemistryId'} element={<Outlet />} >
//             <Route key={'index'} index element={<ChemistryContent />} />
//             <Route key={'searchAndInviteFriend'} path={'searchAndInviteFriend'} element={<SearchAndInviteFriendContent />} />
//         </Route>
// <Route key={'city'} path={'city'} element={<Outlet />} >
//     {
//         Object.keys(TEST.city.subTests).map((cityClass) => (
//             <Route key={cityClass} path={cityClass} element={<CityDetailContent cityClass={cityClass as keyof typeof TEST.city.subTests} />} />
//         ))
//     }
// </Route>
//         {/* [SEO, Authorization] Hide Contents by style={ display: 'none' } when unAuthorized. Content must be rendered yet is visible. */}
//         <Route key={'authRecommended'} element={<AuthRecommendedPage />}>
//             <Route key={'test'} path={'test'} element={<TestContent />} />
//         </Route>
//         {/* [SEO, Authorization] Routes are excluded in robots.txt. URL Accesses are redirected to login page. */}
//         <Route key={'authRequired'} element={<AuthRequiredRoute />}>
//             <Route key={'user'} path={'user'} element={<Outlet />} >
//                 <Route key={'index'} index element={<UserContent />} />
//                 <Route key={'setNickname'} path={'setNickname'} element={<EditNicknameContent />} />
//             </Route>
//             <Route key={'testRequired'} element={<TestRequiredRoute />}>
//                 <Route key={'result'} path={'result'} element={<ResultContent />} />
//             </Route>
//             <Route key={'myChemistry'} path={'myChemistry'} element={<Outlet />} >
//                 <Route key={'myChemistry'} index element={<ChemistryListContent />} />
//                 <Route key={'new'} path={'new'} element={<CreateChemistryContent />} />
//             </Route>
//         </Route>
//         {/* [SEO, Authorization] Routes are protected from access-by-URL. Can only be accessed by useNavigate Hook (/initializeNickname) or redirection from Kakao Auth API Page (/kakaoAuthRedirect). Routes are excluded in robots.txt. URL Accesses are redirected to login page. */}
//         <Route key={'login'} path={'login'} element={<AuthContent />} >
//             <Route key={'initializeNickname'} path={'initializeNickname'} element={<InitializeNicknameContent />} />
//             <Route key={'redirectURI'} path={'kakaoAuthRedirect'} element={<KakaoAuthRedirectPage />} />
//         </Route>
//     </Route>;