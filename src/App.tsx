// /* Externals */
// // import { lazy, Suspense } from 'react';
// // import { Provider } from 'react-redux';
// import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider, Routes } from 'react-router-dom';

// /* App */
// import Page from './route/Page';
// // import { store } from './store';

// import { TEST } from './common/app-const';

// import './styles/index.css';
// // import './styles/pretendard-subset.css';
// /* [Performance][Code Splitting]  */
// /* 1. Static Import */
// // import AuthRequiredRoute from './route/AuthRequiredRoute';
// // import TestRequiredRoute from './route/TestRequiredRoute';
// // import GuestRoute from './route/GuestRoute';
// // import AuthRecommendedPage from './route/AuthRecommendedPage';

// // import HomeContent from './content/home/HomeContent';
// // import ChemistryContent from './content/chemistry/ChemistryContent';
// // import SearchAndInviteFriendContent from './content/chemistry/SearchAndInviteFriendContent';
// // import CityDetailContent from './content/city/CityDetailContent';
// // import TestContent from './content/test/TestContent';

// // import AuthContent from './content/login/AuthContent';
// // import InitializeNicknameContent from './content/login/InitializeNicknameContent';
// // import KakaoAuthRedirectPage from './content/login/KakaoAuthRedirectPage';

// // import UserContent from './content/user/UserContent';
// // import EditNicknameContent from './content/login/EditNicknameContent';
// // import ResultContent from './content/result/ResultContent';
// // import ChemistryListContent from './content/chemistry/ChemistryListContent';
// // import CreateChemistryContent from './content/chemistry/CreateChemistryContent';

// /* 2. Lzay Import */
// // const AuthRequiredRoute = lazy(() => import('./route/AuthRequiredRoute'));
// // const TestRequiredRoute = lazy(() => import('./route/TestRequiredRoute'));
// // const GuestRoute = lazy(() => import('./route/GuestRoute'));
// // const AuthRecommendedPage = lazy(() => import('./route/AuthRecommendedPage'));

// // const HomeContent = lazy(() => import('./content/home/HomeContent'));
// // const ChemistryContent = lazy(() => import('./content/chemistry/ChemistryContent'));
// // const SearchAndInviteFriendContent = lazy(() => import('./content/chemistry/SearchAndInviteFriendContent'));
// // const CityDetailContent = lazy(() => import('./content/city/CityDetailContent'));
// // const TestContent = lazy(() => import('./content/test/TestContent'));

// // const AuthContent = lazy(() => import('./content/login/AuthContent'));
// // const InitializeNicknameContent = lazy(() => import('./content/login/InitializeNicknameContent'));
// // const KakaoAuthRedirectPage = lazy(() => import('./content/login/KakaoAuthRedirectPage'));

// // const UserContent = lazy(() => import('./content/user/UserContent'));
// // const EditNicknameContent = lazy(() => import('./content/login/EditNicknameContent'));
// // const ResultContent = lazy(() => import('./content/result/ResultContent'));
// // const ChemistryListContent = lazy(() => import('./content/chemistry/ChemistryListContent'));
// // const CreateChemistryContent = lazy(() => import('./content/chemistry/CreateChemistryContent'));

// /* 3. Loadable Components */
// import loadable from '@loadable/component';
// import { Provider } from 'react-redux';
// import { store } from './store';
// const AuthRequiredRoute = loadable(() => import(/* webpackChunkName: "AuthRequiredRoute" */ './route/AuthRequiredRoute'));
// const TestRequiredRoute = loadable(() => import( /* webpackChunkName: "TestRequiredRoute" */'./route/TestRequiredRoute'));
// // const GuestRoute = loadable(() => import( /* webpackChunkName: "GuestRoute" */'./route/GuestRoute'));
// const AuthRecommendedPage = loadable(() => import(/* webpackChunkName: "AuthRecommendedPage" */ './route/AuthRecommendedPage'));
// const ChemistryReducerProvider = loadable(() => import(/* webpackChunkName: "ChemistryReducerProvider" */ './reducers/ChemistryReducerProvider'));
// // import ChemistryReducerProvider from './reducers/ChemistryReducerProvider';

// const HomeContent = loadable(() => import(/* webpackChunkName: "HomeContent" */ './content/home/HomeContent'));
// const ChemistryContent = loadable(() => import( /* webpackChunkName: "ChemistryContent" */'./content/chemistry/ChemistryContent'));
// // const SearchAndInviteFriendContent = loadable(() => import( /* webpackChunkName: "SearchAndInviteFriendContent" */'./content/chemistry/SearchAndInviteFriendContent'));
// const CityDetailContent = loadable(() => import( /* webpackChunkName: "CityDetailContent" */'./content/city/CityDetailContent'));
// const TestContent = loadable(() => import(/* webpackChunkName: "TestContent" */ './content/test/TestContent'));

// const LoginContent = loadable(() => import( /* webpackChunkName: "LoginContent" */'./content/login/LoginContent'));
// const InitializeNicknameContent = loadable(() => import( /* webpackChunkName: "InitializeNicknameContent" */'./content/login/InitializeNicknameContent'));
// const KakaoAuthRedirectPage = loadable(() => import( /* webpackChunkName: "KakaoAuthRedirectPage" */'./content/login/KakaoAuthRedirectPage'));

// const UserContent = loadable(() => import( /* webpackChunkName: "UserContent" */'./content/user/UserContent'));
// const EditNicknameContent = loadable(() => import( /* webpackChunkName: "EditNicknameContent" */'./content/login/EditNicknameContent'));
// const ResultContent = loadable(() => import( /* webpackChunkName: "ResultContent" */'./content/result/ResultContent'));
// const ChemistryListContent = loadable(() => import( /* webpackChunkName: "ChemistryListContent" */'./content/chemistry/ChemistryListContent'));
// const CreateChemistryContent = loadable(() => import( /* webpackChunkName: "CreateChemistryContent" */'./content/chemistry/CreateChemistryContent'));


// /*  React Router - Routers - Picking A Router. Remix Software, Inc.
//     ( https://reactrouter.com/en/main/routers/picking-a-router#using-v64-data-apis ) */
// const router = createBrowserRouter(
//     createRoutesFromElements(route)
// );

// function App() {

//     return (
//         // <AnimatePresence>
//         // <ThemeProvider theme={theme}>
//             <RouterProvider router={router} />
//         </Provider>
//         // </ThemeProvider>
//         // </AnimatePresence>
//     );
// }

// export default App;