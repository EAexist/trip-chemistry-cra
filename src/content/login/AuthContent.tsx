/* React */
import { Navigate, Outlet, useLocation } from "react-router-dom";

/* React Packages */
import { IUserProfile } from "../../interfaces/IUserProfile";
import { useIsAuthorized, useUserProfile } from "../../reducers/authReducer";
import { AnimatePresence } from "framer-motion";
import AnimatedOutlet from "../../motion/StatedOutlet";

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
            <Navigate to={`${((authProvider === 'GUEST') && !state.loginRedirectPath.includes('guest')) ? `/guest/${userId}` : ''}${((state !== null) && state.loginRedirectPath) ? state.loginRedirectPath : "/home"}`} />
            :
            <Outlet />
            // <AnimatedOutlet />
    );
}
export default AuthContent;