/* React Packages */
import { ThemeProvider } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Outlet, Route, RouteObject, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

/* App */
import { TEST } from './common/app-const';
import AppBar from './components/AppBar/AppBar';
import { AppBarContextProvider } from './components/AppBar/AppBarContext';
import ChemistryContent from './content/chemistry/ChemistryContent';
import ChemistryListContent from './content/chemistry/ChemistryListContent';
import CreateChemistryContent from './content/chemistry/CreateChemistryContent';
import SearchAndInviteFriendContent from './content/chemistry/SearchAndInviteFriendContent';
import CityDetailContent from './content/city/CityDetailContent';
import HomeContent from './content/home/HomeContent';
import AuthContent from './content/login/AuthContent';
import EditNicknameContent from './content/login/EditNicknameContent';
import InitializeNicknameContent from './content/login/InitializeNicknameContent';
import KakaoAuthRedirectPage from './content/login/KakaoAuthRedirectPage';
import ResultContent from './content/result/ResultContent';
import TestContent from './content/test/TestContent';
import UserContent from './content/user/UserContent';
import AuthRequiredRoute from './route/AuthRequiredRoute';
import Page from './route/Page';
import TestRequiredRoute from './route/TestRequiredRoute';
import { store } from './store';
import { theme } from './theme';

import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import HelmetWrapper from './helmet/HelmetWrapper';
import './index.css';
import AuthRecommendedPage from './route/AuthRecommendedPage';
import GuestRoute from './route/GuestRoute';
import './styles/index.css';

function App() {

    const sessionRoute =
        <Route element={<>
            <AppBar />
            <Outlet /></>
        }>
            <Route key={'index'} index element={<Navigate to={'home'} />} />
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

    return (
        // <AnimatePresence>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                    {/* <AppBarContextProvider> */}
                        <Routes>
                            <Route path={'/'} element={<Page />} >

                                {/* Debug */}
                                {/* <Route key={'page'} path={'page'} element={<Page />} />
                        <Route key={'home'} path={'home'} element={<><h1>HELLO HOME</h1></>} /> */}

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
