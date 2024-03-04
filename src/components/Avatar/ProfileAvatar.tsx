import { Avatar, AvatarProps, Stack } from "@mui/material";
import getImgSrc, { FORMATPNG } from "../../utils/getImgSrc";
import { ProfileProps } from "./Profile";
import { IProfile } from "../../interfaces/IProfile";
import withFriendProfile from "../../hocs/withFriendProfile";
import withUserProfile from "../../hocs/withUserProfile";

interface ProfileAvatarProps extends AvatarProps, Pick<ProfileProps, "labelSize">, Pick<Partial<IProfile>, 'testResult' | 'nickname'> {
    characterId?: string
    showLabel?: boolean
};

function ProfileAvatar({ characterId, showLabel = true, labelSize, nickname, testResult, className, ...props }: ProfileAvatarProps) {

    const imageId = characterId ? characterId : testResult ? testResult.tripCharacter.id :  ""

    return (
        <Stack
            spacing={0}
            direction={"column"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"fit-content"}
        >
        {/* {
            showLabel &&
            <p className={`profile__label typography--profile-label`}/>
        } */}
            <Avatar
                alt={nickname}
                src={getImgSrc('/character', imageId, FORMATPNG)}
                className={`profile__avatar ${className}`}
                {...props as AvatarProps}
            />
            {
                showLabel &&
                <p className={`profile__label profile__label-${labelSize} typography--profile-label`}>
                    { nickname }
                </p>
            }
        </Stack>
    );
}
export default ProfileAvatar;
const FriendProfileAvatar = withFriendProfile(ProfileAvatar);
const UserProfileAvatar = withUserProfile(ProfileAvatar);
export { FriendProfileAvatar, UserProfileAvatar };
