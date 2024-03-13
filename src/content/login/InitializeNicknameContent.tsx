/* React */
import { useState } from "react";

/* React Packages */
import { Close, Done } from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';

/* Trip Chemistry */
import { useLocation, useNavigate } from "react-router-dom";
import { authorize, setIsInitialized } from "../../reducers/authReducer";
import { AppDispatch, RootState } from "../../store";
import { AuthLoadContent } from "../LoadContent";
import SetNicknamePage from "./SetNicknamePage";
import { SLIDEINLEFT, SLIDEINUPINVIEW } from "../../motion/props";

interface InitializeNicknameContentProps {
};

function InitializeNicknameContent({ }: InitializeNicknameContentProps) {

    /* Hooks */
    const { state } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    /* Reducers */
    const doRequireInitialization = useSelector((state: RootState) => state.auth.data.doRequireInitialization);

    /* States */
    const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] = useState(false);

    /* Event Handlers */
    const handleClose = () => {
        setIsConfirmCancelModalOpen(true);
    }

    const handleCancelLogin = () => {
        navigate(`/${((state !== null) && state.cancelRedirectPath) ? state.cancelRedirectPath : ""}`, { state: { navigateDirection: 'prev' }});
    }

    const handleCloseConfirmCancelModal = () => {
        setIsConfirmCancelModalOpen(false);
    }

    const handleSuccess = () => {
        // dispatch(asyncGetSampleProfiles());
        dispatch(setIsInitialized());
        dispatch(authorize());
    }

    return (
        <AuthLoadContent
            // handleFail={handleFail}
            handleSuccess={handleSuccess}
        >
            {
                // doRequireInitialization ?
                    <>
                        {
                            isConfirmCancelModalOpen
                            &&
                            <motion.div {...SLIDEINUPINVIEW} className="page fill-window flex">
                                <div className='block--with-margin-lg block__body body--centered flex-grow'>
                                    <h3 className='typography-label'>
                                        {`닉네임을 설정 중이에요.\n취소하고 처음으로 돌아갈까요?`}
                                    </h3>
                                        <Grid container columnSpacing={4}>
                                            <Grid item xs={6}>
                                                <Button onClick={handleCloseConfirmCancelModal} startIcon={<Close />}>
                                                    로그인 계속하기
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6} display={"flex"} justifyContent={"center"} >
                                                <Button onClick={handleCancelLogin} startIcon={<Done />}>
                                                    확인
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                            </motion.div>
                        }
                        <SetNicknamePage
                            handleClose={handleClose}
                            doRequireInitialization={true}
                        />
                    </>
                    // : <></>
            }
        </AuthLoadContent>
    );
}
export default InitializeNicknameContent;