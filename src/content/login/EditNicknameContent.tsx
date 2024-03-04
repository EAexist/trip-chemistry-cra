/* React */

/* React Packages */

/* Trip Chemistry */
import { useNavigate } from "react-router-dom";
import SetNicknamePage from "./SetNicknamePage";
import { AuthLoadContent } from "../LoadContent";

interface EditNicknameContentProps {
};

function EditNicknameContent({ }: EditNicknameContentProps) {

    /* Hooks */
    const navigate = useNavigate();

    /* Reducers */

    /* States */

    /* Event Handlers */
    const handleClose = () => {
        navigate('/user');
    }

    const handleSuccess = () => {
        navigate('/user');
    }

    return (
        <AuthLoadContent
            // handleFail={handleFail}
            handleSuccess={handleSuccess}
        >
            <SetNicknamePage
                handleClose={handleClose}
            />
        </AuthLoadContent>
    );
}
export default EditNicknameContent;