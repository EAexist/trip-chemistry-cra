import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { AuthLoadRequiredContent } from "../content/LoadRequiredContent";
import { asyncKakaoLoginByAccessToken, disableAutoLogin, useAuthorize, useIsAutoLoginEnabled } from "../reducers/authReducer";
import { AppDispatch } from "../store";

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
        if ( isAutoLoginEnabaled ){
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
    }, [ isAutoLoginEnabaled, dispatch ]);

    return (
        <AuthLoadRequiredContent
            isEnabled={isAutoLoginEnabaled}
            handleFail={handleFail}
            handleSuccess={handleSuccess}
            showHandleFailButton={false}
        >
            {
                !isAutoLoginEnabaled
                &&
                <Outlet />
            }
            {/* https://reactrouter.com/en/main/components/scroll-restoration */}
            <ScrollRestoration
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
            />
        </AuthLoadRequiredContent>
    );
}
export default Page;