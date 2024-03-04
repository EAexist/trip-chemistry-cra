/* React */
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

/* React Packages */
import { useIsAuthorized } from "../reducers/authReducer";
import { useEffect } from "react";

interface AuthRequiredContentProps {

};

function AuthRequiredContent({ }: AuthRequiredContentProps) {

    /* Hooks */
    const { pathname }  = useLocation();
    const { id } = useParams();

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