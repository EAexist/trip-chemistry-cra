import { Avatar, AvatarProps } from "@mui/material";
import Profile, { ProfileProps } from "./Profile";
import getImgSrc, { FORMATPNG } from "../../utils/getImgSrc";
import withFriendProfile from "../../hocs/withFriendProfile";
import withUserProfile from "../../hocs/withUserProfile";
import { IProfile } from "../../interfaces/IProfile";

interface AvatarProfileProps extends AvatarProps, Pick<ProfileProps, "labelSize">, Pick<IProfile, 'testResult' | 'nickname'>{
    showLabel?: boolean
    tripCharacter_id? : string
};

function AvatarProfile({ tripCharacter_id, showLabel = true, labelSize, className, nickname, testResult, ...props }: AvatarProfileProps) {

    const imageId = tripCharacter_id ? tripCharacter_id : testResult ? testResult.tripCharacter.id :  undefined

    return (
        <Profile
            labelSize={labelSize}
            label={showLabel ? nickname : undefined}
        >
            <Avatar
                alt={nickname}
                src={ imageId ? getImgSrc('/character', imageId, FORMATPNG) : undefined }
                className={`profile__avatar ${className}`}
                {...props as AvatarProps}
            />
        </Profile>
    );
}
export default withFriendProfile(AvatarProfile);
const UserAvatarProfile = withUserProfile(AvatarProfile);
export { UserAvatarProfile };