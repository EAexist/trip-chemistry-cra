import { Stack, StackProps } from "@mui/material";

interface AvatarGroupProps extends StackProps {
};

const AvatarGroup = ({ children, ...props } : AvatarGroupProps ) => (
    <Stack
        spacing={ 0 }
        className="avatar-group"
        {...props}
    >
        { children }
    </Stack>     
);

export default AvatarGroup;
export type { AvatarGroupProps };