// import { useEffect } from "react";

// import { useUserId } from "../../reducers/authReducer";
// import AvatarProfile, { AvatarProfileProps } from "./AvatarProfile";

// interface UserAvatarProps extends Omit<AvatarProfileProps, "id"> {
// };

// function UserAvatar({ ...props }: UserAvatarProps) {

//     const userId = useUserId();

//     useEffect(()=>{
//         console.log(`[UserAvatar] id=${userId}`);
//     }, [ userId ])

//     return (
//         <AvatarProfile id={ userId } {...props}/>
//     );
// }
// export default UserAvatar;
// export type { UserAvatarProps };