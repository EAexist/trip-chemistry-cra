/* React */
import { useCallback, useEffect, useState } from "react";

/* React Packages */
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonBase, Stack, Toolbar } from "@mui/material";

/* Trip Chemistry */
import { AppDispatch, RootState } from "../../store";
import { asyncGuestSignIn, asyncKakaoLogin, authorize, useAuthLoadStatus, useIsAuthorized, useUserId } from "../../reducers/authReducer";
import LoadContent, { AuthLoadContent } from "../LoadContent";
import { KAKAO_AUTH_URL_BASE } from "../../auth";
import LazyImage from "../../components/LazyImage";
import getImgSrc, { FORMATPNG } from "../../utils/getImgSrc";
import { LoadStatus } from "../../reducers";
import KakaoLoginButton from "../../components/KakaoLoginButton";

interface LoginContentProps {

};

function LoginContent({ }: LoginContentProps) {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [searchParams] = useSearchParams();
    // const code = searchParams.get('code');

    const [url, setUrl] = useState<string>(KAKAO_AUTH_URL_BASE);

    /* Reducers */
    const userId = useUserId();
    const doRequireInitialization = useSelector((state: RootState) => state.auth.data.doRequireInitialization);

    const handleAuthSuccess = () => {
        // dispatch(addProfile(userId));

        /* If user has logined before, fetch the profile. Else, component in path /setNickname handles the process. */
        if (!doRequireInitialization) {
            dispatch(authorize());
            // dispatch(asyncGetProfile({ id: userId }));
        }
        else {
            navigate('initializeNickname', { state });
        }
        // navigate(
        //     ((state !== null) && state.loginRedirectPath) ? state.loginRedirectPath : "/home"
        // );
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

    // useEffect(() => {
    //     if (code)
    //         dispatch( asyncKakaoLogin(code) );
    // }, [ code, dispatch ])

    // const handleAuthSuccess = useCallback(() => {
    //     navigate('setNickname');
    //     // assert( userId );
    //     dispatch(authorize());
    //     if (userId) {
    //         console.log(`[LoginContent] handleSuccess userId=${userId}`)
    //         dispatch(addProfile(userId));
    //         dispatch(asyncGetProfile({ id: userId }));
    //         dispatch(asyncGetSampleProfiles());
    //     }
    //     setAuthStatus(LoadStatus.REST);
    // }, [ dispatch, userId, setAuthStatus ]);

    // const handleProfileLoadSuccess = useCallback(() => {
    //     setProfileLoadStatus(LoadStatus.REST);
    // }, [setProfileLoadStatus]);

    // useEffect(() => {
    //     console.log(`[LoginContent] profileLoadStatus=${profileLoadStatus}`);
    //     if ( profileLoadStatus !== LoadStatus.REST ) {
    //         setStatus( profileLoadStatus );
    //     }
    //     if ( profileLoadStatus === LoadStatus.SUCCESS ){
    //         setProfileLoadStatus(LoadStatus.REST);
    //     }
    // }, [ profileLoadStatus, setProfileLoadStatus, setAuthStatus ])

    // useEffect(() => {
    //     console.log(`[LoginContent] authStatus=${authStatus}`);
    //     if ( authStatus !== LoadStatus.REST ) {
    //         setStatus( authStatus );
    //     }
    // }, [ authStatus, setStatus ])

    return (
        <AuthLoadContent {...{
            handleSuccess: handleAuthSuccess,
        }}>
            <div className="page fullscreen flex">
                <Toolbar />
                <div className="flex-grow body--centered">
                    {/* <LazyImage
                        alt={"login"}
                        src={getImgSrc('/info', "login", FORMATPNG)}
                        containerClassName="load-content-item__image"
                        containerSx={{ height: "256px", width: "256px" }}
                    /> */}
                    <div className="block__body">
                        <div>
                            <Stack direction={"column"} spacing={4} alignItems={"stretch"}>
                            <KakaoLoginButton />
                                <Button
                                    onClick={handleGuestSignIn}
                                    variant="outlined"
                                    sx={{ height: "48px" }}
                                >
                                    로그인 없이 시작하기
                                </Button>
                            </Stack>
                        </div>

                    </div>
                </div>
            </div>
        </AuthLoadContent>
    );
}
export default LoginContent;