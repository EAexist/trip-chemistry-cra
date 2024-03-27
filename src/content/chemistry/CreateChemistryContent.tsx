/* React */
import { useCallback, useRef, useState } from "react";

/* React Packages */
import { Done, NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Button, IconButton, Toolbar } from "@mui/material";
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperRef, SwiperSlide, } from 'swiper/react';
import SwiperType from "swiper";

/* App */
import { useHideAppbar } from "../../components/AppBar/AppBarContext";
import TextFieldBlock from "../../components/Block/TextFieldBlock";
import useCreateChemistry from "../../hooks/useCreateChemistry";
import { SLIDEINLEFT } from "../../motion/props";
import { useGetProfile } from "../../reducers/authReducer";
import { useChemistryId, useChemistryLoadStatus } from "../../reducers/chemistryReducer";
import { SWIPERPROPS_PAGE } from "../../swiper/props";
import LoadRequiredContent, { AuthLoadRequiredContent } from "../LoadRequiredContent";

interface CreateChemistryContentProps {
};

function CreateChemistryContent({ }: CreateChemistryContentProps) {

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
    const [swiper, setSwiper] = useState<SwiperType>();
    const isInputAllowed = title.length > 0
    const swiperRef = useRef<SwiperRef>(null);

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
        <LoadRequiredContent
            {...{
                status,
                setStatus,
                handleSuccess: handleCreateChemistrySuccess
            }}
        >
            <AuthLoadRequiredContent
                handleSuccess={handleGetProfileSuccess}
            >
                {
                    isAppBarHidden &&
                    <LazyMotion features={domAnimation}>
                        <m.div {...SLIDEINLEFT} className="page fill-window">
                            {
                                <Toolbar>
                                    {
                                        <IconButton
                                            edge="start"
                                            aria-label="cancel"
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
                                className=""
                                onSwiper={(swiper) => setSwiper(swiper)}
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
                        </m.div>
                    </LazyMotion>
                }
            </AuthLoadRequiredContent>
        </LoadRequiredContent>
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