/* React */
import { useEffect, useState } from "react";

/* React Packages */
import { Button, Grid, Stack, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/* App */
import { Help } from "@mui/icons-material";
import { KAKAO_AUTH_URL_BASE } from "../../common/auth";
import KakaoLoginButton from "../../components/Button/KakaoLoginButton";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import { asyncGuestSignIn, authorize } from "../../reducers/authReducer";
import { AppDispatch, RootState } from "../../store";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";

interface LoginContentProps {

};

function LoginContent({ }: LoginContentProps) {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [url, setUrl] = useState<string>(KAKAO_AUTH_URL_BASE);

    /* Reducers */
    const doRequireInitialization = useSelector((state: RootState) => state.auth.data.doRequireInitialization);

    const handleAuthSuccess = () => {

        /* If user has logined before, fetch the profile. Else, InitializeNicknameContent (/initializeNickname) handles the process. */
        if (!doRequireInitialization) {
            dispatch(authorize());
        }
        else {
            navigate('/login/initializeNickname', { state: { loginRedirectPath: pathname } });
        }
    }

    const handleGuestSignIn = () => {
        dispatch(asyncGuestSignIn());
    }

    useEffect(() => {
        console.log(`[LoginContent] pathname=${pathname}`);
        const urlObject = new URL(url);
        urlObject.searchParams.set('state', pathname);
        setUrl(urlObject.toString());
    }, [url, pathname]);

    useEffect(() => {
        const urlObject = new URL(url);
        urlObject.searchParams.set('client_id', `${process.env.REACT_APP_KAKAO_REST_API_KEY}`);
        urlObject.searchParams.set('redirect_uri', `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`);
        urlObject.searchParams.set('response_type', 'code');
        setUrl(urlObject.toString());
    }, []);

    useEffect(() => {
        console.log(`[LoginContent]\n\turl=${url}`);
    }, [url])

    return (
        <AuthLoadRequiredContent {...{
            handleSuccess: handleAuthSuccess,
        }}>
            <RoutedMotionPage>
                <Toolbar />
                <div className="flex-grow block--centered-row block__body">
                    <div style={{ marginTop: "128px" }} />
                    <h2 className="typography-heading">
                        {
                            "로그인 방식을 선택해주세요."
                        }
                    </h2>
                    <div>
                        {/* <Stack direction={"column"} spacing={2} alignItems={"stretch"} width={"200px"}> */}
                            <Grid container direction={"column"} rowSpacing={2}>
                                <Grid item>
                                    <KakaoLoginButton />
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={handleGuestSignIn}
                                        variant="outlined"
                                        sx={{ width: '183px', height: '45px' }}
                                    >
                                        로그인 없이 시작하기
                                    </Button>
                                </Grid>
                            </Grid>
                        {/* </Stack> */}
                    </div>
                    <div style={{ marginTop: "128px" }} />
                    <div>
                        <p className="typography-note">
                            <Help fontSize="inherit" />
                            {
                                "카카오 로그인을 이용하면\n링크를 잃어버려도 테스트 결과를 안전하게 불러올 수 있어요."
                            }
                        </p>
                    </div>
                </div>
            </RoutedMotionPage>
        </AuthLoadRequiredContent>
    );
}
export default LoginContent;