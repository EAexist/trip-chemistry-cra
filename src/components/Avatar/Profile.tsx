
import { PropsWithChildren } from "react";

interface ProfileProps {
    label?: string;
    labelSize?: 'md' | 'lg' | 'xl';
    isActive?: boolean
};

function Profile({ label, labelSize = 'md', children, isActive = false }: PropsWithChildren<ProfileProps>) {

    return (
        <div className={"profile"}>
            { children }
            {
                ( label !== undefined )
                && <p className={`profile__label-${ labelSize } typography--profile-label ${ isActive ? "typography--profile-label--active" : "" }`}>
                    { label }
                </p>
            }            
        </div>
    );
}
export default Profile;
export type { ProfileProps };