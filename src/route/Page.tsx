import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { AuthLoadRequiredContent } from "../content/LoadRequiredContent";
import { asyncKakaoLoginByAccessToken, disableAutoLogin, useAuthorize, useIsAutoLoginEnabled } from "../reducers/authReducer";
import { AppDispatch, store } from "../store";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { AppBarContextProvider } from "../components/AppBar/AppBarContext";
import HelmetWrapper from "../helmet/HelmetWrapper";
import { theme } from "../theme";

interface PageProps {

};

function Page({ }: PageProps) {

    /* Hooks */
    const dispatch = useDispatch<AppDispatch>();
    const authorize = useAuthorize();

    /* States */
    const isAutoLoginEnabaled = useIsAutoLoginEnabled();

    /* Event Handlers  */
    const handleSuccess = () => {
        dispatch(disableAutoLogin());
        authorize();
    }

    const handleFail = () => {
        window.localStorage.setItem("kakaoAccessToken", "");
        dispatch(disableAutoLogin());
    }

    /* Effects */
    useEffect(() => {
        if (isAutoLoginEnabaled) {
            const kakaoAccessToken = window.localStorage.getItem("kakaoAccessToken");
            console.log(`[Page] useEffect\n\tkakaoAccessToken=${kakaoAccessToken}`);

            /* 로컬 스토리지에 카카오 액세스 토큰이 남아 있을 경우 해당 정보를 이용해 로그인 */
            if (kakaoAccessToken) {
                dispatch(asyncKakaoLoginByAccessToken({ accessToken: kakaoAccessToken }));
            }
            else {
                dispatch(disableAutoLogin());
            }
        }
    }, [isAutoLoginEnabaled, dispatch]);

    return (
        <HelmetProvider>
        <AppBarContextProvider>
            <HelmetWrapper
                title={"여행 타입 테스트"}
                description={"여행 타입 테스트로 친구들과 함께 떠나는 여행 준비하기. 나의 여행 MBTI는 뭘까? 여행 계획, 여행 일정, 여행 예산, 그리고 여행지까지 서로 다른 취향을 맞춰봐!"}
                keywords={"여행, 여행 일정, 여행지, 여행 계획, 여행 예산, 국내여행, 해외여행, MBTI"}
                url={"https://eaexist.github.io/tripchemistry"}
                image={"/static/images/meta/social-meta-iamge.jpg"}
            />
            <AuthLoadRequiredContent
                isEnabled={isAutoLoginEnabaled}
                handleFail={handleFail}
                handleSuccess={handleSuccess}
                showHandleFailButton={false}
            >
                {
                    // ! isAutoLoginEnabaled
                    true
                    &&
                    <Outlet />
                }
                {/* https://reactrouter.com/en/main/components/scroll-restoration */}
                {/* <ScrollRestoration
                getKey={(location, matches) => {
                    const paths = ["/chemistry"];
                    console.log(`[ScrollRestoration] ${location.pathname}`)
                    // return location.pathname;
                    return paths.includes(location.pathname)
                        ? // restore by pathname
                        location.pathname
                        : // everything else by location like the browser
                        location.key;
                }}
            /> */}
            </AuthLoadRequiredContent>
        </AppBarContextProvider>
        </HelmetProvider>
    );
}
export default Page;