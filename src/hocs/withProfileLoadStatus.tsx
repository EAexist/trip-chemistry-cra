// import { ComponentType, PropsWithChildren } from "react";
// import { useProfileLoadStatus } from "../reducers/profileReducer";
// import { LoadStatus } from "../reducers";
// import { useUserId } from "../reducers/authReducer";

// interface WithUserProfileLoadStatusProps { 
//     status?: LoadStatus;
//     setStatus: ( status: LoadStatus ) => void;
// };

// const withUserProfileLoadStatus = <T extends WithUserProfileLoadStatusProps>( WrappedComponent: ComponentType<T> ) =>
//     ( { ...props } : Omit<T, keyof WithUserProfileLoadStatusProps>) => {

//     const userId = useUserId();
//     const [ status, setStatus ] = useProfileLoadStatus(userId);

//     return (
//         <WrappedComponent
//             {...{
//                 status, 
//                 setStatus, 
//                 ...props
//             } as T}
//         />
//     );
// }

// export default withUserProfileLoadStatus;
// export type { WithUserProfileLoadStatusProps };