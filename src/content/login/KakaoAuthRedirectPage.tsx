/* React */
import { Navigate, useLocation } from "react-router-dom";

/* React Packages */
import { useEffect } from "react";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import { useIsAuthorized, useUserId } from "../../reducers/authReducer";
import InitializeNicknameContent from "./InitializeNicknameContent";

interface KakaoAuthRedirectPageProps {

};

function KakaoAuthRedirectPage({ }: KakaoAuthRedirectPageProps) {

    /* Hooks */
    const { state } = useLocation();
    const isAuthorized = useIsAuthorized();

    /* Reducers */
    const userId = useUserId();
    
    useKakaoLogin();

    useEffect(() => {
        console.log(`[KakaoAuthRedirectPage]\tstate=${state}`)
    }, [ state ]);

    return (
        null
    );
}
export default KakaoAuthRedirectPage;