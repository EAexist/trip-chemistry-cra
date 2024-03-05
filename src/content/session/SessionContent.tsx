import { Outlet, useNavigate } from "react-router-dom";
import { useAuthorize, useGuestLogin, useIsAuthorized } from "../../reducers/authReducer";
import { AuthLoadContent } from "../LoadContent";

interface SessionContentProps {

};

function SessionContent({ }: SessionContentProps) {

    /* Hooks */
    /* Guest 접속 주소일 경우 주소의 id를 이용해 게스트로 로그인. */
    useGuestLogin();

    const navigate = useNavigate();
    const authorize = useAuthorize();

    /* Event Handler */
    const handleSuccess = authorize
    const handleFail = () => {
        navigate('/home');
    }

    return (
        <AuthLoadContent
            handleSuccess={handleSuccess}
            failText="페이지를 찾을 수 없어요."
            handleFail={handleFail}
            handleFailButtonText="홈 화면으로 돌아가기"
        >
            <Outlet />
        </AuthLoadContent>
    );
}
export default SessionContent;