/* React Packages */
import { ThemeProvider } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

/* App */
import { TEST } from './common/app-const';
import AppBar from './components/AppBar/AppBar';
import Page from './route/Page';
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
import LoginContent from './content/login/LoginContent';
import ResultContent from './content/result/ResultContent';
import TestContent from './content/test/TestContent';
import UserContent from './content/user/UserContent';
import { AppBarContextProvider } from './components/AppBar/AppBarContext';
import AuthRequiredRoute from './route/AuthRequiredRoute';
import TestRequiredRoute from './route/TestRequiredRoute';
import { store } from './store';
import { theme } from './theme';

import './index.css';
import './styles/index.css';
import GuestRoute from './route/GuestRoute';
import { HelmetProvider } from 'react-helmet-async';
import HelmetWrapper from './helmet/HelmetWrapper';
import AuthRecommendedPage from './route/AuthRecommendedPage';


function App() {

    const helmetContext = {};

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

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path={'/*'} element={<Page />}>
                    <Route key={'index'} element={<Outlet />} >
                        {sessionRoute}
                    </Route>
                    <Route key={'guest'} path={'guest/:id'} element={<GuestRoute />}>
                        {sessionRoute}
                    </Route>
                </Route>
            </>
        )
    );

    return (
        <HelmetProvider context={helmetContext}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AppBarContextProvider>
                        <HelmetWrapper
                            title={"여행 타입 테스트"}
                            description={"여행 타입 테스트로 친구들과 함께 떠나는 여행 준비하기. 나의 여행 MBTI는 뭘까? 여행 계획, 여행 일정, 여행 예산, 그리고 여행지까지 서로 다른 취향을 맞춰봐!"}
                            keywords={"여행, 여행 일정, 여행지, 여행 계획, 여행 예산, 국내여행, 해외여행, MBTI"}
                            url={"https://eaexist.github.io/tripchemistry"}
                            image={"/static/images/meta/social-meta-iamge.jpg"}
                        />
                        <AnimatePresence>
                            <RouterProvider router={router} />
                        </AnimatePresence>
                        {/* </Content> */}
                    </AppBarContextProvider>
                </ThemeProvider>
            </Provider>
        </HelmetProvider>
    );
}

export default App;
