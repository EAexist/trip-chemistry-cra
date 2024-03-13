/* React */
import { Navigate, Outlet, useLocation } from "react-router-dom";

/* React Packages */
import { IUserProfile } from "../../interfaces/IUserProfile";
import { useIsAuthorized, useUserProfile } from "../../reducers/authReducer";

interface AuthContentProps {

};

function AuthContent({ }: AuthContentProps) {

    /* Hooks */
    const { state } = useLocation();
    const isAuthorized = useIsAuthorized();

    /* Reducers */
    const { id: userId, authProvider } = useUserProfile() as IUserProfile;

    return (
        isAuthorized
            ?
            <Navigate to={`${((state !== null) && state.loginRedirectPath)
                    ? ((authProvider === 'GUEST') && !state.loginRedirectPath.includes('guest'))
                        ? `/guest/${userId}${state.loginRedirectPath}`
                        : state.loginRedirectPath
                    : "/home"}`} />
            :
            <Outlet />
        // <AnimatedOutlet />
    );
}
export default AuthContent;