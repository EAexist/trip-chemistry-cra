import { ButtonBase } from "@mui/material";
import ProfileAvatar, { ProfileAvatarProps } from "./ProfileAvatar";

interface ProfileAvatarToggleButtonProps extends ProfileAvatarProps{
    selected: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

function ProfileAvatarToggleButton({ id, selected, onClick } : ProfileAvatarToggleButtonProps ){

    return(
        <span>
        <ProfileAvatar
            onClick={onClick}
            id={ id }
            sx={{
                opacity: selected? 1 : 0.4
            }}
        />
        </span>
    );
}

export default ProfileAvatarToggleButton;