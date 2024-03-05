/* React Packages */
import { ThemeProvider } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

/* App */
import { TEST } from './common/app-const';
import CityDetailContent from './content/CityDetailContent';
import Page from './content/Page';
import TestRequiredContent from './content/TestRequiredContent';
import ChemistryListContent from './content/chemistry/ChemistryListContent';
import CreateChemistryContent from './content/chemistry/CreateChemistryContent';
import ChemistryContent from './content/chemistry/ChemistryContent';
import HomeContent from './content/home/HomeContent';
import AuthContent from './content/login/AuthContent';
import EditNicknameContent from './content/login/EditNicknameContent';
import InitializeNicknameContent from './content/login/InitializeNicknameContent';
import LoginContent from './content/login/LoginContent';
import ResultContent from './content/result/ResultContent';
import SessionContent from './content/session/SessionContent';
import TestContent from './content/test/TestContent';
import UserContent from './content/user/UserContent';
import { AppBarContextProvider } from './contexts/AppBarContext';
import './index.css';
import { store } from './store';
import { theme } from './theme';
import SearchAndInviteFriendContent from './content/chemistry/SearchAndInviteFriendContent';
import AppBar from './components/AppBar/AppBar';
import AuthRequiredContent from './content/AuthRequiredContent';
import KakaoAuthRedirectPage from './content/login/KakaoAuthRedirectPage';

function App() {

    const sessionRoute =
        <Route element={<>
            {/* <AppBar /> */}
            <Outlet /></>}>
            {/* <Route key={'index'} index element={<Navigate to={'login'} />} /> */}
            <Route key={'index'} index element={<Navigate to={'home'} />} />
            <Route key={'home'} path={'home'} element={<HomeContent />} />
            <Route key={'login'} path={'login'} element={<AuthContent />} >
                <Route key={'index'} index element={<LoginContent />} />
                <Route key={'initializeNickname'} path={'initializeNickname'} element={<InitializeNicknameContent />} />
                <Route key={'redirectURI'} path={'kakaoAuthRedirect'} element={<KakaoAuthRedirectPage />} />
            </Route>
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
            <Route key={'authRequired'} element={<AuthRequiredContent />}>
                <Route key={'user'} path={'user'} element={<Outlet />} >
                    <Route key={'index'} index element={<UserContent />} />
                    <Route key={'setNickname'} path={'setNickname'} element={<EditNicknameContent />} />
                </Route>
                <Route key={'test'} path={'test'} element={<TestContent />} />
                <Route key={'testRequired'} element={<TestRequiredContent />}>
                    <Route key={'result'} path={'result'} element={<ResultContent />} />
                </Route>
                <Route key={'myChemistry'} path={'myChemistry'} element={<Outlet />} >
                    <Route key={'myChemistry'} index element={<ChemistryListContent />} />
                    <Route key={'new'} path={'new'} element={<CreateChemistryContent />} />
                </Route>
            </Route>
        </Route>;

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path={'/*'} element={<Page />}>
                    <Route key={'index'} element={<Outlet />} >
                        {sessionRoute}
                    </Route>
                    <Route key={'guest'} path={'guest/:id'} element={<SessionContent />}>
                        {sessionRoute}
                    </Route>
                </Route>
            </>
        )
    );

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AppBarContextProvider>
                    <AnimatePresence>
                        <RouterProvider router={router} />
                    </AnimatePresence>
                    {/* </Content> */}
                </AppBarContextProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
