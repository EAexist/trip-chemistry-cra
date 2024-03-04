import { Outlet } from "react-router-dom";
import { useAuthorize, useGuestLogin, useIsAuthorized } from "../../reducers/authReducer";
import { AuthLoadContent } from "../LoadContent";

interface SessionContentProps {

};

function SessionContent({ }: SessionContentProps) {

    /* Hooks */
    /* Guest 접속 주소일 경우 주소의 id를 이용해 게스트로 로그인. */
    useGuestLogin();
    const authorize = useAuthorize();

    const handleSuccess = authorize

    return (
        <AuthLoadContent
            handleSuccess={handleSuccess}
        >
            <Outlet />
        </AuthLoadContent>
    );
}
export default SessionContent;