/* React */

/* React Packages */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import { IUserProfile } from "../../interfaces/IUserProfile";
import { LoadStatus } from "../../interfaces/enums/LoadStatus";
import { disableAutoLogin, useAuthLoadStatus, useAuthorize, useUserProfile } from "../../reducers/authReducer";
import { AppDispatch } from "../../store";

interface KakaoAuthRedirectPageProps {

};

function KakaoAuthRedirectPage({ }: KakaoAuthRedirectPageProps) {

    /* Hooks */
    const dispatch = useDispatch<AppDispatch>();
    const authorize = useAuthorize();
    useKakaoLogin();
    const userProfile = useUserProfile() as IUserProfile;

    /* Reducers */
    const [ authLoadStatus, setAuthLoadStatus ] = useAuthLoadStatus();

    useEffect(() => {
        /* 카카오 로그인 성공시 권한 부여, 로컬 스토리지에 정보 저장 및 loadStatus 정리. */
        if( authLoadStatus === LoadStatus.SUCCESS ){
            console.log(`[KakaoAuthRedirectPage] kakaoAccessToken=${userProfile.kakaoAccessToken}`);
            window.localStorage.setItem("kakaoAccessToken", userProfile.kakaoAccessToken );
            authorize();
            setAuthLoadStatus( LoadStatus.REST );
        }
    }, [ authLoadStatus, authorize, setAuthLoadStatus, userProfile ]);

    useEffect(()=>{
        dispatch(disableAutoLogin());
    }, [ dispatch ])

    return (
        null
    );
}
export default KakaoAuthRedirectPage;