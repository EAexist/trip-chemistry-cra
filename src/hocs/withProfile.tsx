import { ComponentType, useEffect } from "react";
import { IProfile, useProfile } from "../reducers/profileReducer";
import { IProfileId } from "../reducers";

interface WithProfileProps extends IProfile { };

const withProfile = <T extends Partial<WithProfileProps>>( WrappedComponent: ComponentType<T> ) =>
    ({ id, ...props }: Omit<T, keyof WithProfileProps> & { id? : IProfileId }) => {

    const profile = useProfile( id );

    return (
        <WrappedComponent
            {...profile}
            {...props as unknown as T}
        />
    );
}

export default withProfile;
export type { WithProfileProps };