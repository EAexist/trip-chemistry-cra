import { Button, Paper, SxProps, ToggleButton, ToggleButtonProps, useTheme } from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";
import Profile from "../Avatar/Profile";
import ToggleButtonPaper from "./ToggleButtonPaper";
import { WithIsTestAnsweredProps } from "../../hocs/withIsTestAnswered";
import { Theme } from "@emotion/react";

interface ToggleProfileButtonProps extends ToggleButtonProps, WithIsTestAnsweredProps {
    label?: string;
    contained?: boolean;
    sx? : SxProps<Theme>;
};

const ToggleProfileButton = ({ label, children, onChange, size ="medium", value, selected, contained = false, sx }: PropsWithChildren<ToggleProfileButtonProps>) => {
    
    const [ elevated, setElevated ] = useState(false);

    const theme = useTheme();

    useEffect(()=>{
        if( selected !== undefined ){
            setElevated(selected);
        }
    }, [ selected ])

    return (
    <Button
        variant="base"
        onClick={(e) => {
            if (onChange)
                onChange(e, value);
        }}
        onMouseEnter={ selected ? undefined : ()=>setElevated(true)}
        onMouseLeave={ selected ? undefined : ()=>setElevated(false)}
    >
        <Profile
            label={label}
            labelSize="lg"
            isActive={selected}
        >
            <Paper                
                elevation={ elevated ? 5 : 0 }
                sx={{
                    ...(
                    ( selected ) ?
                    contained && {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText
                    }
                    :
                    {
                        border: `4px ${theme.palette.primary.main}`,
                        ...sx
                    }
                    )
                }}
                className={`toggle-profile-button__paper toggle-profile-button__paper--${size}`}
            >             
                {children}
            </Paper>   
        </Profile>
    </Button>
)}
export default ToggleProfileButton;