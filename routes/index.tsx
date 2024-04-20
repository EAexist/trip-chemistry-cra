import { Route, Routes } from "react-router-dom"
import Page from "../route/Page"
import loadable from "@loadable/component";
import './styles/index.css';

/* 3. Loadable Components */
const AuthRequiredRoute = loadable(() => import('../route/AuthRequiredRoute'));
// const TestRequiredRoute = loadable(() => import('../route/TestRequiredRoute'));
// const GuestRoute = loadable(() => import('../route/GuestRoute'));
// const AuthRecommendedPage = loadable(() => import(/* webpackChunkName: "AuthRecommendedPage" */ '../route/AuthRecommendedPage'));

const HomeContent = loadable(() => import(/* webpackChunkName: "HomeContent" */ '../content/home/HomeContent'));
// const ChemistryContent = loadable(() => import('../content/chemistry/ChemistryContent'));
// const SearchAndInviteFriendContent = loadable(() => import('../content/chemistry/SearchAndInviteFriendContent'));
// const CityDetailContent = loadable(() => import('../content/city/CityDetailContent'));
const TestContent = loadable(() => import(/* webpackChunkName: "TestContent" */ '../content/test/TestContent'));

// const AuthContent = loadable(() => import('../content/login/AuthContent'));
// const InitializeNicknameContent = loadable(() => import('../content/login/InitializeNicknameContent'));
// const KakaoAuthRedirectPage = loadable(() => import('../content/login/KakaoAuthRedirectPage'));

// const UserContent = loadable(() => import('../content/user/UserContent'));
// const EditNicknameContent = loadable(() => import('../content/login/EditNicknameContent'));
// const ResultContent = loadable(() => import('../content/result/ResultContent'));
// const ChemistryListContent = loadable(() => import('../content/chemistry/ChemistryListContent'));
// const CreateChemistryContent = loadable(() => import('../content/chemistry/CreateChemistryContent'));

const routes =
        <Routes>
                <Route path={'/'} element={<Page />} >
                        {/* Debug */}
                        <Route key={'home'} path={'home'} element={<HomeContent />} />
                        <Route key={'testPreview'} path={'testPreview'} element={<TestContent />} />
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

export default routes;
// const lazyLoadRoutes = true;
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