/* React */

/* React Packages */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, ButtonBase, Icon, IconButton, Stack, Toolbar } from "@mui/material";
import { Edit } from "@mui/icons-material";

/* Trip Chemistry */
import { AppDispatch } from "../../store";
import { asyncKakaoLogout, useHasAnsweredTest, useUserProfile } from "../../reducers/authReducer";
import { UserAvatarProfile } from "../../components/Avatar/AvatarProfile";
import { AuthProvider } from "../../interfaces/enums/AuthProvider";
import KakaoLoginButton from "../../components/KakaoLoginButton";

interface UserContentProps {

};

function UserContent({ }: UserContentProps) {

    /* Hooks */
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const hasAnsweredTest = useHasAnsweredTest();

    /* Reducers */
    const { id, authProvider, nickname } = useUserProfile();

    /* Event Handlers */
    const handleClickAvatar = () => {
        if( !hasAnsweredTest ){
            navigate('avatarGallery');
        } 
    };

    const handleLogout = () => {
        dispatch(asyncKakaoLogout(id));
    }

    const handleEdit = () => {
        navigate('setNickname');
    }

    return (
        <div className="page fullscreen flex" >
            <Toolbar />
            <div className='flex-grow body--centered block__body'>
                <ButtonBase onClick={handleClickAvatar}>
                    <UserAvatarProfile sx={{ height: "128px", width: "128px" }} showLabel={false} />
                </ButtonBase>
                <Toolbar>
                    <IconButton
                        edge="start"
                        onClick={handleEdit}
                        disabled
                    >
                        <Icon />
                    </IconButton>
                    <p className="typography-heading">{nickname}</p>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={handleEdit}
                    >
                        <Edit />
                    </IconButton>
                </Toolbar>
                {/* <p className="typography-light">{ getNameTag(user) }</p> */}
                <div>
                    <Stack direction={'column'}>
                        {
                            (AuthProvider[authProvider] === AuthProvider.GUEST)
                                ?
                                <KakaoLoginButton />
                                :
                                <Button onClick={handleLogout} variant="outlined">
                                    로그아웃
                                </Button>


                        }
                    </Stack>
                </div>
            </div>
        </div>
    );
}
export default UserContent;