/* React Packages */
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

/* App */
import AppBar from './components/AppBar/AppBar';
// import Page from './route/Page';
import { store } from './store';

import { TEST } from './common/app-const';
import CityDetailContent from './content/city/CityDetailContent';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material';

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
const Page = loadable(() => import(/* webpackChunkName: "Page" */ './route/Page'));
const AuthRequiredRoute = loadable(() => import(/* webpackChunkName: "AuthRequiredRoute" */ './route/AuthRequiredRoute'));
// const TestRequiredRoute = loadable(() => import('./route/TestRequiredRoute'));
// const GuestRoute = loadable(() => import('./route/GuestRoute'));
// const AuthRecommendedPage = loadable(() => import(/* webpackChunkName: "AuthRecommendedPage" */ './route/AuthRecommendedPage'));

const HomeContent = loadable(() => import(/* webpackChunkName: "HomeContent" */ './content/home/HomeContent'));
// const ChemistryContent = loadable(() => import('./content/chemistry/ChemistryContent'));
// const SearchAndInviteFriendContent = loadable(() => import('./content/chemistry/SearchAndInviteFriendContent'));
// const CityDetailContent = loadable(() => import('./content/city/CityDetailContent'));
const TestContent = loadable(() => import(/* webpackChunkName: "TestContent" */ './content/test/TestContent'));

// const AuthContent = loadable(() => import('./content/login/AuthContent'));
// const InitializeNicknameContent = loadable(() => import('./content/login/InitializeNicknameContent'));
// const KakaoAuthRedirectPage = loadable(() => import('./content/login/KakaoAuthRedirectPage'));

// const UserContent = loadable(() => import('./content/user/UserContent'));
// const EditNicknameContent = loadable(() => import('./content/login/EditNicknameContent'));
// const ResultContent = loadable(() => import('./content/result/ResultContent'));
// const ChemistryListContent = loadable(() => import('./content/chemistry/ChemistryListContent'));
// const CreateChemistryContent = loadable(() => import('./content/chemistry/CreateChemistryContent'));

function App() {

    return (
        // <AnimatePresence>
        // <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Routes>
                    <Route path={'/'} element={<Page />} >
                        {/* Debug */}
                        <Route key={'home'} path={'home'} element={<HomeContent />} />
                        {/* <Route key={'testPreview'} path={'testPreview'} element={<TestContent />} /> */}
                        {/* <Route key={'authRequired'} element={<AuthRequiredRoute />}>
                                <Route key={'test'} path={'test'} element={<TestContent />} />
                            </Route>
                            <Route key={'city'} path={'city'} element={<Outlet />} >
                                {
                                    Object.keys(TEST.city.subTests).map((cityClass) => (
                                        <Route key={cityClass} path={cityClass} element={<CityDetailContent cityClass={cityClass as keyof typeof TEST.city.subTests} />} />
                                    ))
                                }
                            </Route> */}
                        {/* <Route key={'index'} element={<Outlet />} >
                            {sessionRoute}
                        </Route>
                        <Route key={'guest'} path={'guest/:id'} element={<GuestRoute />}>
                            {sessionRoute}
                        </Route> */}
                    </Route>
                </Routes>
            </Provider>
        // </ThemeProvider>
        // </AnimatePresence>
    );
}

export default App;