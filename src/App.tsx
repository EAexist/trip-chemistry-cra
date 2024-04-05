/* React Packages */
// import { lazy, Suspense } from 'react';
// import { Provider } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

/* App */
import Page from './route/Page';
// import { store } from './store';

import { TEST } from './common/app-const';

/* [Performance][Code Splitting]  */
/* 1. Static Import */
// import AuthRequiredRoute from './route/AuthRequiredRoute';
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

/* 2. Lzay Import */
// const AuthRequiredRoute = lazy(() => import('./route/AuthRequiredRoute'));
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
import loadable from '@loadable/component';
const AuthRequiredRoute = loadable(() => import(/* webpackChunkName: "AuthRequiredRoute" */ './route/AuthRequiredRoute'));
const TestRequiredRoute = loadable(() => import( /* webpackChunkName: "TestRequiredRoute" */'./route/TestRequiredRoute'));
// const GuestRoute = loadable(() => import( /* webpackChunkName: "GuestRoute" */'./route/GuestRoute'));
const AuthRecommendedPage = loadable(() => import(/* webpackChunkName: "AuthRecommendedPage" */ './route/AuthRecommendedPage'));
const ChemistryReducerProvider = loadable(() => import(/* webpackChunkName: "ChemistryReducerProvider" */ './reducers/ChemistryReducerProvider'));
// import ChemistryReducerProvider from './reducers/ChemistryReducerProvider';

const HomeContent = loadable(() => import(/* webpackChunkName: "HomeContent" */ './content/home/HomeContent'));
const ChemistryContent = loadable(() => import( /* webpackChunkName: "ChemistryContent" */'./content/chemistry/ChemistryContent'));
const SearchAndInviteFriendContent = loadable(() => import( /* webpackChunkName: "SearchAndInviteFriendContent" */'./content/chemistry/SearchAndInviteFriendContent'));
const CityDetailContent = loadable(() => import( /* webpackChunkName: "CityDetailContent" */'./content/city/CityDetailContent'));
const TestContent = loadable(() => import(/* webpackChunkName: "TestContent" */ './content/test/TestContent'));

// const AuthContent = loadable(() => import( /* webpackChunkName: "AuthContent" */'./content/login/AuthContent'));
const InitializeNicknameContent = loadable(() => import( /* webpackChunkName: "InitializeNicknameContent" */'./content/login/InitializeNicknameContent'));
const KakaoAuthRedirectPage = loadable(() => import( /* webpackChunkName: "KakaoAuthRedirectPage" */'./content/login/KakaoAuthRedirectPage'));

const UserContent = loadable(() => import( /* webpackChunkName: "UserContent" */'./content/user/UserContent'));
const EditNicknameContent = loadable(() => import( /* webpackChunkName: "EditNicknameContent" */'./content/login/EditNicknameContent'));
const ResultContent = loadable(() => import( /* webpackChunkName: "ResultContent" */'./content/result/ResultContent'));
const ChemistryListContent = loadable(() => import( /* webpackChunkName: "ChemistryListContent" */'./content/chemistry/ChemistryListContent'));
const CreateChemistryContent = loadable(() => import( /* webpackChunkName: "CreateChemistryContent" */'./content/chemistry/CreateChemistryContent'));

const sessionRoute =
    <>
        <Route path="/" element={<Navigate to="home" />} />
        <Route key={'home'} index path={'home'} element={<HomeContent />} />
        <Route key={'chemistry'} path={'chemistry/:chemistryId'} element={<ChemistryReducerProvider />} >
            <Route key={'index'} index element={<ChemistryContent />} />
            <Route key={'searchAndInviteFriend'} path={'searchAndInviteFriend'} element={<SearchAndInviteFriendContent />} />
        </Route>
        <Route key={'city'} path={'city'} element={<Outlet />} >
            {
                Object.keys(TEST.city.subTests).map((cityClass) => (
                    <Route key={cityClass} path={cityClass} element={<CityDetailContent cityClass={cityClass as keyof typeof TEST.city.subTests} />} />
                ))
            }
        </Route>
        {/* [SEO, Authorization] Hide Contents by style={ display: 'none' } when unAuthorized. Content must be rendered yet is visible. */}
        <Route key={'authRecommended'} element={<AuthRecommendedPage />}>
            <Route key={'test'} path={'test'} element={<TestContent />} />
        </Route>
        {/* [SEO, Authorization] Routes are excluded in robots.txt. URL Accesses are redirected to login page. */}
        <Route key={'authRequired'} element={<AuthRequiredRoute />}>
            <Route key={'user'} path={'user'} element={<Outlet />} >
                <Route key={'index'} index element={<UserContent />} />
                <Route key={'setNickname'} path={'setNickname'} element={<EditNicknameContent />} />
            </Route>
            <Route key={'testRequired'} element={<TestRequiredRoute />}>
                <Route key={'result'} path={'result'} element={<ResultContent />} />
            </Route>
            <Route key={'myChemistry'} path={'myChemistry'} element={<Outlet />} >
                <Route key={'myChemistry'} index element={<ChemistryListContent />} />
                <Route key={'new'} path={'new'} element={<CreateChemistryContent />} />
            </Route>
        </Route>
        {/* [SEO, Authorization] Routes are protected from access-by-URL. Can only be accessed by useNavigate Hook (/initializeNickname) or redirection from Kakao Auth API Page (/kakaoAuthRedirect). Routes are excluded in robots.txt. URL Accesses are redirected to login page. */}
        <Route key={'login'} path={'login'} element={<Outlet />} >
            <Route key={'initializeNickname'} path={'initializeNickname'} element={<InitializeNicknameContent />} />
            <Route key={'redirectURI'} path={'kakaoAuthRedirect'} element={<KakaoAuthRedirectPage />} />
        </Route>
    </>;

function App() {

    return (
        // <AnimatePresence>
        // <ThemeProvider theme={theme}>
        // <Provider store={store}>
        <Routes>
            <Route path={'/'} element={<Page />} >
                {/* Debug */}
                {/* <Route key={'home'} path={'home'} element={<HomeContent />} />
                        <Route key={'testPreview'} path={'testPreview'} element={<TestContent />} />
                        <Route key={'authRequired'} element={<AuthRequiredRoute />}>
                                <Route key={'test'} path={'test'} element={<TestContent />} />
                            </Route>
                            <Route key={'city'} path={'city'} element={<Outlet />} >
                                {
                                    Object.keys(TEST.city.subTests).map((cityClass) => (
                                        <Route key={cityClass} path={cityClass} element={<CityDetailContent cityClass={cityClass as keyof typeof TEST.city.subTests} />} />
                                    ))
                                }
                            </Route> */}
                <Route key={'index'} element={<Outlet />} >
                    <Route key={'testPreview'} path={'testPreview'} element={<TestContent />} />
                    {sessionRoute}
                </Route>
                {/* [ Deprecated ] 
                    게스트 로그인 사용자를 위한 route 를  구분된 path로 관리 e.g. domain/guest/{guestId}/{pathname}
                    -> 통합된 path 에서 query parameter 를통해 관리 e.g. domain/{pathname}?guestId={guestId}                
                */}
                {/* <Route key={'guest'} path={'guest/:id'} element={<GuestRoute />}>
                    {sessionRoute}
                </Route> */}
            </Route>
        </Routes>
        // </Provider>
        // </ThemeProvider>
        // </AnimatePresence>
    );
}

export default App;