import { Avatar, AvatarProps } from "@mui/material";
import Profile, { ProfileProps } from "./Profile";
import { IProfile } from "../../reducers/profileReducer";
import withProfile from "../../hocs/withProfile";
import getImgSrc, { FORMATPNG } from "../../utils/getImgSrc";

interface ProfileAvatarProps extends AvatarProps, ProfileProps, Partial<IProfile> {
    showLabel?: boolean
    tripCharacter_id? : string
};

function ProfileAvatar({ nickname, tripCharacter_id, testResult, showLabel = true, labelSize, ...props }: ProfileAvatarProps) {

    const imageId = testResult ? testResult.data.tripCharacter.id : tripCharacter_id ? tripCharacter_id : undefined

    return (
        <Profile
            labelSize={labelSize}
            label={showLabel ? nickname : undefined}
        >
            <Avatar
                alt={nickname}
                src={ imageId ? getImgSrc('/character', imageId, FORMATPNG) : undefined }
                className={`profile__avatar`}
            />
        </Profile>
    );
}
export default withProfile( ProfileAvatar );
export { ProfileAvatar };
export type { ProfileAvatarProps };