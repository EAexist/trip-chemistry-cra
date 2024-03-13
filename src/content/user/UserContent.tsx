/* React */

/* React Packages */
import { Edit, Help } from "@mui/icons-material";
import { Button, ButtonBase, Icon, IconButton, Stack, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/* Trip Chemistry */
import UserAvatar from "../../components/Avatar/UserAvatar";
import KakaoLoginButton from "../../components/KakaoLoginButton";
import { IUserProfile } from "../../interfaces/IUserProfile";
import { AuthProvider } from "../../interfaces/enums/AuthProvider";
import { asyncKakaoLogout, useHasAnsweredTest, useUserProfile } from "../../reducers/authReducer";
import { AppDispatch } from "../../store";
import { AuthLoadContent } from "../LoadContent";
import RoutedMotionPage from "../../components/Motion/RoutedMotionPage";

interface UserContentProps {

};

function UserContent({ }: UserContentProps) {

    /* Hooks */
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const hasAnsweredTest = useHasAnsweredTest();

    /* Reducers */
    const { id, authProvider, nickname } = useUserProfile() as IUserProfile;

    /* Event Handlers */
    const handleClickAvatar = () => {
        // if (!hasAnsweredTest) {
        //     navigate('avatarGallery');
        // }
    };

    const handleLogout = () => {
        dispatch(asyncKakaoLogout(id));
    }

    const handleLogoutSuccess = () => {
        window.localStorage.setItem("kakaoAccessToken", "" );
    }

    const handleEdit = () => {
        navigate('setNickname', { state: { navigateDirection: 'next' }});
    }


    return (
        <AuthLoadContent
            handleSuccess={handleLogoutSuccess}
        >
        <RoutedMotionPage className="flex fill-window">
            <Toolbar />
            <div className='flex-grow body--centered block__body'>
                <div>
                <ButtonBase onClick={handleClickAvatar}>
                    <UserAvatar sx={{ height: "128px", width: "128px" }} showLabel={false} />
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
                </div>
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
                        {
                            (AuthProvider[authProvider] === AuthProvider.GUEST)
                            &&
                            <div>
                                <p className="typography-note">
                                    <Help fontSize="inherit"/>
                                    {
                                        "카카오 로그인을 이용하면\n링크를 잃어버려도 내 테스트 결과를 안전하게 불러올 수 있어요."
                                    }
                                </p>
                            </div>
                        }
            </div>
        </RoutedMotionPage>
        </AuthLoadContent>
    );
}
export default UserContent;