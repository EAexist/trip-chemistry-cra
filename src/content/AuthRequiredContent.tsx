/* React */
import { Navigate, Outlet, useLocation } from "react-router-dom";

/* React Packages */
import { useIsAuthorized } from "../reducers/authReducer";
import { useEffect } from "react";

interface AuthRequiredContentProps {

};

function AuthRequiredContent({ }: AuthRequiredContentProps) {

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