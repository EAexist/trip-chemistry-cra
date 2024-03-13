// /* React */
// import { PropsWithChildren, useContext, useEffect, useRef, useState } from "react";

// /* React Packages */

// import { Swiper, SwiperRef } from 'swiper/react';
// /* Trip Chemistry */
// import { Done, NavigateBefore, NavigateNext } from "@mui/icons-material";
// import { Button, IconButton, Toolbar } from "@mui/material";
// import { SWIPERPROPS_PAGE } from "../../common/swiperProps";
// import AppBarContext, { useHideAppbar } from "../../contexts/AppBarContext";

// interface StepPageContainerProps {
//     handleClose: () => void;
//     handleConfirm: () => void;
//     doDisableNavigateNext: ( activeIndex : number ) => boolean;
// };

// function StepPageContainer({
//     handleClose,
//     handleConfirm,
//     children,
//     doDisableNavigateNext
// }: PropsWithChildren<StepPageContainerProps>) {

//     /* Hooks */
//     const isAppBarHidden = useHideAppbar();

//     /* States */
//     const swiperRef = useRef<SwiperRef>(null);
//     const [ activeIndex, setActiveIndex ] = useState(0);

//     /* Event Handlers */
//     /* Swiper Navigation */
//     const handleNavigatePrev = () => swiperRef.current?.swiper.slidePrev();
//     const handleNavigateNext = () => swiperRef.current?.swiper.slideNext();

//     /* Side Effects */

//     return (
//         isAppBarHidden &&
//         <div className="page fill-window">
//             <Toolbar>
//                 {
//                     swiperRef.current?.swiper.isBeginning
//                         ? <Button
//                             onClick={handleClose}
//                         >
//                             취소
//                         </Button>
//                         :
//                         <IconButton
//                             onClick={handleNavigatePrev}
//                             edge="start"
//                             aria-label="menu"
//                         >
//                             <NavigateBefore />
//                         </IconButton>

//                 }
//                 {
//                     swiperRef.current?.swiper.isEnd
//                         ? <Button
//                             disabled={doDisableNavigateNext(activeIndex)}
//                             onClick={handleConfirm}
//                             variant='text'
//                             className=""
//                             startIcon={<Done />}
//                         >
//                             확인
//                         </Button>
//                         :
//                         <IconButton
//                             disabled={doDisableNavigateNext(activeIndex)}
//                             onClick={handleNavigateNext}
//                             edge="end"
//                             aria-label="menu"
//                         >
//                             <NavigateNext />
//                         </IconButton>

//                 }
//             </Toolbar>
//             <Swiper
//                 {...SWIPERPROPS_PAGE}
//                 ref={swiperRef}
//                 onActiveIndexChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//                 className="page__swiper"
//             >
//                 {
//                     children
//                 }
//             </Swiper>
//         </div>
//     );
// }
// export default StepPageContainer;