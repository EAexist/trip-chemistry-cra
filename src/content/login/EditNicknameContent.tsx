/* React */

/* React Packages */

/* App */
import { useNavigate } from "react-router-dom";
import SetNicknamePage from "./SetNicknamePage";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";

interface EditNicknameContentProps {
};

function EditNicknameContent({ }: EditNicknameContentProps) {

    /* Hooks */
    const navigate = useNavigate();

    /* Reducers */

    /* States */

    /* Event Handlers */
    const handleClose = () => {
        navigate('/user', { state: { navigateDirection: 'prev' }});
    }

    // const handleSuccess = () => {
    //     navigate('/user');
    // }

    return (
        <AuthLoadRequiredContent
            // handleFail={handleFail}
            handleSuccess={handleClose}
        >
            <SetNicknamePage
                handleClose={handleClose}
            />
        </AuthLoadRequiredContent>
    );
}
export default EditNicknameContent;