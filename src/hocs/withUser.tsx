import { ComponentType } from "react";
import { IProfile, useProfile } from "../reducers/profileReducer";
import { IProfileId } from "../reducers";

interface WithUserProps extends IProfile { };

const withUser = <T extends Partial<WithUserProps>>( WrappedComponent: ComponentType<T> ) =>
    ({ id, ...props }: Omit<T, keyof WithUserProps> & { id : IProfileId }) => {

    const profile = useProfile( id );
    return (
        <WrappedComponent
            {...profile}
            {...props as unknown as T}
        />
    );
}

export default withUser;
export type { WithUserProps };