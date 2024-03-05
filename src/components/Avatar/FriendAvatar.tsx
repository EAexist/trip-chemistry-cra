import { useEffect } from "react";
import { IProfile } from "../../interfaces/IProfile";
import { IProfileId } from "../../reducers";
import { useProfile } from "../../reducers/tripReducer";
import ProfileAvatar, { ProfileAvatarProps } from "./ProfileAvatar";

interface FriendAvatarProps extends ProfileAvatarProps {
    id : IProfileId;
};

function FriendAvatar({ id, ...props }: FriendAvatarProps) {

    const { testResult, nickname } =  useProfile( id ) as IProfile;
    const characterId = ( testResult && testResult.tripCharacter.id ) ? testResult.tripCharacter.id : "user"

    useEffect(()=>{
        console.log(`[FriendAvatar] characterId=${characterId}`)
    }, [])

    return (
        <ProfileAvatar characterId={characterId} nickname={ nickname } {...props}/>
    );
}
export default FriendAvatar;
