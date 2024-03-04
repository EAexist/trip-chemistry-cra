/* React */
import { Navigate, Outlet, useLocation } from "react-router-dom";

/* React Packages */
import { useIsAuthorized, useUserId } from "../../reducers/authReducer";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import { useEffect, useState } from "react";
import { log } from "console";

interface AuthContentProps {

};

function AuthContent({ }: AuthContentProps) {

    /* Hooks */
    const { state } = useLocation();
    const isAuthorized = useIsAuthorized();

    /* Reducers */
    const userId = useUserId();
    
    useKakaoLogin();

    useEffect(() => {
        console.log(`[AuthContent]\tstate=${state}`)

    }, [ state ]);

    return (
        isAuthorized 
        ?
        <Navigate to={ `/guest/${userId}${((state !== null) && state.loginRedirectPath) ? state.loginRedirectPath : "" }` } />
        : 
        <Outlet />
    );
}
export default AuthContent;