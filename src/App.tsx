/* React Packages */
import { ThemeProvider } from '@mui/material';
import { lazy, Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';

/* App */
import { TEST } from './common/app-const';
import AppBar from './components/AppBar/AppBar';
import Page from './route/Page';
import { store } from './store';
import { theme } from './theme';

// import './index.css';
import './styles/index.css';

/* [Performance][Code Splitting]  */
/* 1. Static Import */
import AuthRequiredRoute from './route/AuthRequiredRoute';
import TestRequiredRoute from './route/TestRequiredRoute';
import GuestRoute from './route/GuestRoute';
import AuthRecommendedPage from './route/AuthRecommendedPage';

import HomeContent from './content/home/HomeContent';
import ChemistryContent from './content/chemistry/ChemistryContent';
import SearchAndInviteFriendContent from './content/chemistry/SearchAndInviteFriendContent';
import CityDetailContent from './content/city/CityDetailContent';
import TestContent from './content/test/TestContent';

import AuthContent from './content/login/AuthContent';
import InitializeNicknameContent from './content/login/InitializeNicknameContent';
import KakaoAuthRedirectPage from './content/login/KakaoAuthRedirectPage';

import UserContent from './content/user/UserContent';
import EditNicknameContent from './content/login/EditNicknameContent';
import ResultContent from './content/result/ResultContent';
import ChemistryListContent from './content/chemistry/ChemistryListContent';
import CreateChemistryContent from './content/chemistry/CreateChemistryContent';

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

function App() {

    const lazyLoadRoutes = false;
    const sessionRoute =
        lazyLoadRoutes
            ?
            /* Lazy Import of Route Elements */
            <Route element={<>
                <AppBar />
                <Outlet /></>
            }>
                <Route key={'home'} path={'home'} element={
                    <Suspense>
                        <HomeContent />
                    </Suspense>} />
                <Route key={'chemistry'} path={'chemistry/:chemistryId'} element={<Outlet />} >
                    <Route key={'index'} index element={
                        <Suspense>
                            <ChemistryContent />
                        </Suspense>} />
                    <Route key={'searchAndInviteFriend'} path={'searchAndInviteFriend'} element={
                        <Suspense>
                            <SearchAndInviteFriendContent />
                        </Suspense>} />
                </Route>
                <Route key={'city'} path={'city'} element={<Outlet />} >
                    {
                        Object.keys(TEST.city.subTests).map((cityClass) => (
                            <Route key={cityClass} path={cityClass} element={
                                <Suspense>
                                    <CityDetailContent cityClass={cityClass as keyof typeof TEST.city.subTests} />
                                </Suspense>} />
                        ))
                    }
                </Route>
                {/* [SEO, Authorization] Hide Contents by style={ display: 'none' } when unAuthorized. Content must be rendered yet is visible. */}
                <Route key={'authRecommended'} element={
                    <Suspense>
                        <AuthRecommendedPage />
                    </Suspense>}>
                    <Route key={'test'} path={'test'} element={
                        <Suspense>
                            <TestContent />
                        </Suspense>} />
                </Route>
                {/* [SEO, Authorization] Routes are excluded in robots.txt. URL Accesses are redirected to login page. */}
                <Route key={'authRequired'} element={
                    <Suspense>
                        <AuthRequiredRoute />
                    </Suspense>}>
                    <Route key={'user'} path={'user'} element={<Outlet />} >
                        <Route key={'index'} index element={
                            <Suspense>
                                <UserContent />
                            </Suspense>} />
                        <Route key={'setNickname'} path={'setNickname'} element={
                            <Suspense>
                                <EditNicknameContent />
                            </Suspense>} />
                    </Route>
                    <Route key={'testRequired'} element={
                        <Suspense>
                            <TestRequiredRoute />
                        </Suspense>}>
                        <Route key={'result'} path={'result'} element={
                            <Suspense>
                                <ResultContent />
                            </Suspense>} />
                    </Route>
                    <Route key={'myChemistry'} path={'myChemistry'} element={<Outlet />} >
                        <Route key={'myChemistry'} index element={
                            <Suspense>
                                <ChemistryListContent />
                            </Suspense>} />
                        <Route key={'new'} path={'new'} element={
                            <Suspense>
                                <CreateChemistryContent />
                            </Suspense>} />
                    </Route>
                </Route>
                {/* [SEO, Authorization] Routes are protected from access-by-URL. Can only be accessed by useNavigate Hook (/initializeNickname) or redirection from Kakao Auth API Page (/kakaoAuthRedirect). Routes are excluded in robots.txt. URL Accesses are redirected to login page. */}
                <Route key={'login'} path={'login'} element={
                    <Suspense>
                        <AuthContent />
                    </Suspense>} >
                    <Route key={'initializeNickname'} path={'initializeNickname'} element={
                        <Suspense>
                            <InitializeNicknameContent />
                        </Suspense>} />
                    <Route key={'redirectURI'} path={'kakaoAuthRedirect'} element={
                        <Suspense>
                            <KakaoAuthRedirectPage />
                        </Suspense>} />
                </Route>
            </Route>
            :
            /* Static Import of Route Elements */
            <Route element={<>
                <AppBar />
                <Outlet /></>
            }>
                <Route key={'home'} path={'home'} element={<HomeContent />} />
                <Route key={'chemistry'} path={'chemistry/:chemistryId'} element={<Outlet />} >
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
                <Route key={'login'} path={'login'} element={<AuthContent />} >
                    <Route key={'initializeNickname'} path={'initializeNickname'} element={<InitializeNicknameContent />} />
                    <Route key={'redirectURI'} path={'kakaoAuthRedirect'} element={<KakaoAuthRedirectPage />} />
                </Route>
            </Route>;

    // useEffect(()=>{
    //     console.log(JSON.stringify(process.env));
    // }, []);

    return (
        // <AnimatePresence>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                {/* <AppBarContextProvider> */}
                <Routes>
                    <Route path={'/'} element={<Page />} >
                        {/* Debug */}
                        {/* <Route element={<>
                            <AppBar />
                            <Outlet /></>
                        }>
                            <Route key={'home'} path={'home'} element={<HomeContent />} />
                        </Route> */}
                        <Route key={'index'} element={<Outlet />} >
                            {sessionRoute}
                        </Route>
                        <Route key={'guest'} path={'guest/:id'} element={<GuestRoute />}>
                            {sessionRoute}
                        </Route>
                    </Route>
                </Routes>
                {/* </AppBarContextProvider> */}
            </ThemeProvider>
        </Provider>
        // </AnimatePresence>
    );
}

export default App;