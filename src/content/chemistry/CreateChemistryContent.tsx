/* React */
import { useCallback, useContext, useEffect, useRef, useState } from "react";

/* React Packages */
import { motion } from 'framer-motion';
import { Button, IconButton, Toolbar } from "@mui/material";
import { Done, NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Swiper, SwiperRef, SwiperSlide, } from 'swiper/react';
import { useNavigate } from "react-router-dom";
import SwiperCore from 'swiper';

/* Trip Chemistry */
import { SWIPERPROPS_PAGE } from "../../common/swiperProps";
import { useHideAppbar } from "../../contexts/AppBarContext";
import useCreateChemistry from "../../hooks/useCreateChemistry";
import { useChemistryId, useChemistryLoadStatus } from "../../reducers/tripReducer";
import LoadContent, { AuthLoadContent } from "../LoadContent";
import TextFieldBlock from "../login/TextFieldBlock";
import { useGetProfile } from "../../reducers/authReducer";
import { SLIDEINLEFT } from "../../motion/props";

interface CreateChemistryContentProps {
};

function CreateChemistryContent({
}: CreateChemistryContentProps) {

    /* Constants */
    const maxTitleLength = 20;

    /* Hooks */
    const createChemistry = useCreateChemistry();
    const navigate = useNavigate();
    const isAppBarHidden = useHideAppbar();

    /* Reducers */
    const [status, setStatus] = useChemistryLoadStatus();
    const chemistryId = useChemistryId();
    const getProfile = useGetProfile();

    /* States */
    const [title, setTItle] = useState("친구들과의 일본 우정 여행");
    const [ swiper, setSwiper ] = useState<SwiperCore>();
    const isInputAllowed = title.length > 0
    const swiperRef = useRef<SwiperRef>(null);
    // const [activeIndex, setActiveIndex] = useState<number>(0);

    /* Event Handlers */
    /* Swiper Navigation */
    const handleNavigatePrev = () => swiper?.slidePrev();
    const handleNavigateNext = () => swiper?.slideNext();

    /* Close & Confirm */
    const handleClose = () => {
        navigate('../../myChemistry', { state: { navigateDirection: 'prev' } });

    }
    const handleConfirm = () => {
        createChemistry(title);
    }

    const handleCreateChemistrySuccess = () => {
        getProfile();
    }

    const handleGetProfileSuccess = () => {
        navigate(`../../chemistry/${chemistryId}`);
    }

    /* TextFieldBlock */
    /* @TODO Prevent Redundant Names? */
    const isConfirmAllowed = true;

    const getIsValueAllowed = useCallback((title: string) => (
        title.length <= maxTitleLength
    ), [maxTitleLength]);

    const helperText = useCallback((title: string) => (
        `${title.length}/${maxTitleLength}`
    ), [maxTitleLength]);

    /* Side Effects */

    return (
        <LoadContent
            {...{
                status,
                setStatus,
                handleSuccess: handleCreateChemistrySuccess
            }}
        >
            <AuthLoadContent
                handleSuccess={handleGetProfileSuccess}
            >
                {
                    isAppBarHidden &&
                    <motion.div {...SLIDEINLEFT} className="page fullscreen">
                        {
                            // swiperRef.current && swiperRef.current.swiper &&
                            <Toolbar>
                                {
                                    <IconButton
                                        edge="start"
                                        aria-label="cancel"
                                        // onClick={swiperRef.current?.swiper.isBeginning ? handleClose : handleNavigatePrev}
                                        onClick={swiper?.isBeginning ? handleClose : handleNavigatePrev}
                                    >
                                        <NavigateBefore />
                                    </IconButton>

                                }
                                {
                                    swiper?.isEnd
                                        ? <Button
                                            disabled={!isInputAllowed || !isConfirmAllowed}
                                            onClick={handleConfirm}
                                            variant='text'
                                            aria-label="next"
                                            startIcon={<Done />}
                                        >
                                            확인
                                        </Button>
                                        :
                                        <IconButton
                                            edge="end"
                                            aria-label="next"
                                            onClick={handleNavigateNext}
                                        >
                                            <NavigateNext />
                                        </IconButton>

                                }
                            </Toolbar>
                        }
                        <Swiper
                            {...SWIPERPROPS_PAGE}
                            ref={swiperRef}
                            className="page__swiper"
                            onSwiper={(swiper)=>setSwiper(swiper)}
                        >
                            <SwiperSlide key={"title"} className=''>
                                {
                                    ({ isActive }) => (
                                        <div className="block--with-margin-x">
                                            <TextFieldBlock
                                                value={title}
                                                setValue={setTItle}
                                                getIsValueAllowed={getIsValueAllowed}
                                                helperText={helperText}
                                                title={"여행 제목을 입력해주세요."}
                                                autoFocus={isActive}
                                            />
                                        </div>
                                    )
                                }
                            </SwiperSlide>
                        </Swiper>
                    </motion.div>
                }
            </AuthLoadContent>
        </LoadContent>
    );
}
export default CreateChemistryContent;

// <SwiperSlide key={"0"} className=''>
// <div className="block--with-margin-x block__body">
//     <h2 className="typography-body">
//         연결 방식을 선택해주세요.
//     </h2>
//     <Grid container>
//         <Grid item xs={6}>
//             <ButtonBase sx={{ width: "100%" }}>
//                 <div className="block--with-margin-x">
//                     <Share fontSize={"large"} />
//                     <h2 className="typography-heading">
//                         링크
//                     </h2>
//                     <p>
//                         링크를 가진 누구나 간편하게 참여할 수 있어요.
//                     </p>
//                 </div>
//             </ButtonBase>
//         </Grid>
//         <Grid item xs={6}>
//             <ButtonBase sx={{ width: "100%" }}>
//                 <div className="block--with-margin-x">
//                     <PersonSearch fontSize={"large"} />
//                     <h2 className="typography-heading">
//                         친구 직접 추가하기
//                     </h2>
//                     <p>
//                         친구들을 직접 선택해 참여를 요청할 수 있어요.
//                     </p>
//                 </div>
//             </ButtonBase>
//         </Grid>
//     </Grid>
// </div>
// </SwiperSlide>