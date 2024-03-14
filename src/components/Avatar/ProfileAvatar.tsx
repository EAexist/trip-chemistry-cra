import { Avatar, AvatarProps, Stack, useTheme } from "@mui/material";
import getImgSrc, { FORMATPNG } from "../../utils/getImgSrc";
import { ProfileProps } from "./Profile";
import { IProfile } from "../../interfaces/IProfile";
import { useEffect } from "react";

interface ProfileAvatarProps extends AvatarProps, Pick<ProfileProps, "labelSize">, Pick<Partial<IProfile>, 'testResult' | 'nickname'> {
    characterId?: string
    showLabel?: boolean
};

function ProfileAvatar({ characterId, showLabel = true, labelSize, nickname, testResult, className, ...props }: ProfileAvatarProps) {

    const imageId = characterId ? characterId : testResult ? testResult.tripCharacter.id : ""
    const theme = useTheme();

    useEffect(()=>{
        console.log(`[ProfileAvatar] imageId=${imageId}`)
    }, [])

    return (
        <Stack
            spacing={0.75}
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
                style={{ backgroundColor: theme.palette.primary.light }}
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
export type { ProfileAvatarProps };
// const FriendAvatar = withFriendProfile(ProfileAvatar);
// const UserAvatar = withUserProfile(ProfileAvatar);
// export { FriendAvatar, UserAvatar };
