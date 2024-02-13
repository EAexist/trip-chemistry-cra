import { AvatarProps } from "@mui/material";
import { ProfileProps } from "./Profile";
import { useUserId } from "../../reducers/authReducer";
import ProfileAvatar, { ProfileAvatarProps } from "./ProfileAvatar";
import { useEffect } from "react";

interface UserAvatarProps extends ProfileAvatarProps {
};

function UserAvatar({ ...props }: UserAvatarProps) {

    const id = useUserId();

    useEffect(()=>{
        console.log(`[UserAvatar] id=${id}`);
    }, [ id ])

    return (
        <ProfileAvatar id={ id } {...props}/>
    );
}
export default UserAvatar;
export type { UserAvatarProps };