/* React */
import { useEffect, useState } from "react";

/* React Packages */
import { Button, Stack, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/* Trip Chemistry */
import { Help } from "@mui/icons-material";
import { KAKAO_AUTH_URL_BASE } from "../../auth";
import KakaoLoginButton from "../../components/KakaoLoginButton";
import RoutedMotionPage from "../../components/Motion/RoutedMotionPage";
import { asyncGuestSignIn, authorize } from "../../reducers/authReducer";
import { AppDispatch, RootState } from "../../store";
import { AuthLoadContent } from "../LoadContent";

interface LoginContentProps {

};

function LoginContent({ }: LoginContentProps) {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { state } = useLocation();

    const [url, setUrl] = useState<string>(KAKAO_AUTH_URL_BASE);

    /* Reducers */
    const doRequireInitialization = useSelector((state: RootState) => state.auth.data.doRequireInitialization);

    const handleAuthSuccess = () => {

        /* If user has logined before, fetch the profile. Else, component in path /setNickname handles the process. */
        if (!doRequireInitialization) {
            dispatch(authorize());
        }
        else {
            navigate('initializeNickname', { state });
        }
    }

    const handleGuestSignIn = () => {
        dispatch(asyncGuestSignIn());
    }

    useEffect(() => {
        if ((state !== null) && state.loginRedirectPath) {
            console.log(`[LoginContent] loginRedirectPath=${state.loginRedirectPath}`);

            const urlObject = new URL(url);
            urlObject.searchParams.set('state', state.loginRedirectPath);
            setUrl(urlObject.toString());
        }
    }, [state, url]);

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
        <AuthLoadContent {...{
            handleSuccess: handleAuthSuccess,
        }}>
            <RoutedMotionPage>
                <Toolbar />
                <div className="flex-grow body--centered-row block__body">
                    <div style={{ marginTop: "128px" }} />
                    <h2 className="typography-heading">
                        {
                            "로그인 방식을 선택해주세요."
                        }
                    </h2>
                    <div>
                        <Stack direction={"column"} spacing={2} alignItems={"stretch"}>
                            <KakaoLoginButton />
                            <Button
                                onClick={handleGuestSignIn}
                                variant="outlined"
                                sx={{ height: "48px" }}
                            >
                                로그인 없이 바로 시작하기
                            </Button>
                        </Stack>
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
        </AuthLoadContent>
    );
}
export default LoginContent;