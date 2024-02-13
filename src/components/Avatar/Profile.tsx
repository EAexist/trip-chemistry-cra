import { Avatar, AvatarProps } from "@mui/material";
import { PropsWithChildren } from "react";

interface ProfileProps {
    label?: string;
    labelSize?: 'md' | 'lg';
    isActive?: boolean
};

function Profile({ label, labelSize = 'md', children, isActive = false }: PropsWithChildren<ProfileProps>) {

    return (
        <div className={`profile profile--label-${ labelSize } typography--profile-label ${ isActive ? "typography--profile-label--active" : "" }`}>
            { children }
            {
                ( label !== undefined )
                && <p>{ label }</p>
            }            
        </div>
    );
}
export default Profile;
export type { ProfileProps };