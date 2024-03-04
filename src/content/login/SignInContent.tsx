// /* React */
// import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react";

// /* React Packages */

// import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
// import { useSelector } from "react-redux";
// /* Trip Chemistry */
// import useSetNickname from "../../hooks/useSetNickname";
// import { useUser } from "../../reducers/profileReducer";
// import { RootState } from "../../store";
// import TextFieldBlock from "./TextFieldBlock";
// import { Button, ButtonBase, Grid, IconButton, Link, Stack, Toolbar } from "@mui/material";
// import AppBarContext from "../../contexts/AppBarContext";
// import { Done, NavigateBefore, NavigateNext, PersonSearch, Share, VerifiedUser } from "@mui/icons-material";
// import { SWIPERPROPS_PAGE } from "../../common/swiperProps";
// import { useNavigate } from "react-router-dom";
// import useCreateChemistry from "../../hooks/useCreateChemistry";
// import StepPageContainer from "../chemistry/StepPageContainer";
// import { USER } from "../../common/app-const";

// interface SignInContentProps {
// };

// function SignInContent({
// }: SignInContentProps) {

//     /* Hooks */
//     const createChemistry = useCreateChemistry();
//     const navigate = useNavigate();

//     /* Reducers */

//     /* States */
//     const [nickname, setNickname] = useState("");
//     const [password, setPassword] = useState("");
//     const { setShow: setShowAppBar } = useContext(AppBarContext);
//     const isInputAllowed = nickname.length > 0

//     /* Event Handlers */

//     /* Close & Confirm */
//     const handleClose = () => {
//         navigate('/login');

//     }
//     const handleConfirm = () => {
//         navigate('/guest/:id/test');
//     }

//     /* TextFieldBlock */
//     /* @TODO Prevent Redundant Names? */
//     const isConfirmAllowed = true;

//     const getIsNicknameAllowed = useCallback((title: string) => (
//         title.length <= USER.maxNicknameLength
//     ), []);

//     const nicknameHelperText = useCallback((title: string) => (
//         `${title.length}/${USER.maxNicknameLength}`
//     ), []);

//     const getIsPasswordAllowed = useCallback((title: string) => (
//         title.length <= USER.maxPasswordLength
//     ), []);

//     const passwordHelperText = useCallback((title: string) => (
//         `${title.length}/${USER.maxPasswordLength}`
//     ), []);

//     /* Side Effects */
//     useEffect(() => {
//         setShowAppBar(false);
//         return (() => {
//             setShowAppBar(true);
//         })
//     }, []);

//     const doDisableNavigateNext = (activeIndex: number) => {
//         switch (activeIndex) {
//             case 0:
//                 return nickname.length < 1;
//             case 1:
//                 return password.length < 1;
//             default:
//                 return false;
//         }
//     }

//     return (
//         <StepPageContainer
//             handleClose={handleClose}
//             handleConfirm={handleConfirm}
//             doDisableNavigateNext={doDisableNavigateNext}
//         >
//             <SwiperSlide key={"nickname"} className=''>
//                 {
//                     ({ isActive }) => (
//                         <div className="block--with-margin-x">

//                             <TextFieldBlock
//                                 value={nickname}
//                                 setValue={setNickname}
//                                 getIsValueAllowed={getIsNicknameAllowed}
//                                 helperText={nicknameHelperText}
//                                 title={"사용할 이름을 입력해주세요."}
//                             />
//                         </div>
//                     )
//                 }
//             </SwiperSlide>

//         </StepPageContainer>
//     );
// }
// export default SignInContent;

// {/* <SwiperSlide key={"password"} className=''>
// <div className="block--with-margin-x">

//     <TextFieldBlock
//         value={password}
//         setValue={setPassword}
//         getIsValueAllowed={getIsPasswordAllowed}
//         helperText={passwordHelperText}
//         title={"비밀번호를 입력해주세요."}
//         note={"건너 뛰어도 되지만 답변을 수정하거나 새로운 여행에 참여할 수는 없어요."}
//     />
// </div>
// </SwiperSlide> */}
// // <SwiperSlide key={"0"} className=''>
// // <div className="block--with-margin-x block__body">
// //     <h2 className="typography-body">
// //         연결 방식을 선택해주세요.
// //     </h2>
// //     <Grid container>
// //         <Grid item xs={6}>
// //             <ButtonBase sx={{ width: "100%" }}>
// //                 <div className="block--with-margin-x">
// //                     <Share fontSize={"large"} />
// //                     <h2 className="typography-heading">
// //                         링크
// //                     </h2>
// //                     <p>
// //                         링크를 가진 누구나 간편하게 참여할 수 있어요.
// //                     </p>
// //                 </div>
// //             </ButtonBase>
// //         </Grid>
// //         <Grid item xs={6}>
// //             <ButtonBase sx={{ width: "100%" }}>
// //                 <div className="block--with-margin-x">
// //                     <PersonSearch fontSize={"large"} />
// //                     <h2 className="typography-heading">
// //                         친구 직접 추가하기
// //                     </h2>
// //                     <p>
// //                         친구들을 직접 선택해 참여를 요청할 수 있어요.
// //                     </p>
// //                 </div>
// //             </ButtonBase>
// //         </Grid>
// //     </Grid>
// // </div>
// // </SwiperSlide>