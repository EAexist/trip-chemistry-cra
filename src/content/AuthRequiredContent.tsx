/* React */
import { Navigate, Outlet, useLocation } from "react-router-dom";

/* React Packages */
import { useEffect } from "react";
import { useIsAuthorized } from "../reducers/authReducer";

interface AuthRequiredContentProps {

};

function AuthRequiredContent({ }: AuthRequiredContentProps) {

    /* Hooks */
    const { pathname }  = useLocation();

    const isAuthorized = useIsAuthorized();
    
    useEffect(() => {
        console.log(`[AuthRequiredContent] pathname=${pathname}`)
    }, [ pathname ])

    return (
        isAuthorized
        ?
        <Outlet />
        : 
        <Navigate to="/login" state={{ loginRedirectPath : pathname }} />
    );
}
export default AuthRequiredContent;