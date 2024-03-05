import { Button, Paper, SxProps, ToggleButtonProps, useTheme } from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";
import Profile from "../Avatar/Profile";
import { WithIsTestAnsweredProps } from "../../hocs/withIsTestAnswered";
import { Theme } from "@emotion/react";

interface ToggleProfileButtonProps extends ToggleButtonProps, WithIsTestAnsweredProps {
    label?: string;
    contained?: boolean;
    sx? : SxProps<Theme>;
    paperSx? : SxProps<Theme>;
    elevation? : number;
};

const ToggleProfileButton = ({ label, children, onChange, size ="medium", value, selected, contained = false, sx, paperSx, elevation = 0, className }: PropsWithChildren<ToggleProfileButtonProps>) => {
    
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
        className={className}
        sx={sx}
    >
        <Profile
            label={label}
            labelSize="lg"
            isActive={selected}
        >
            <Paper                
                elevation={ elevated ? 5 : elevation }
                sx={{
                    ...(
                    ( selected ) 
                    ?
                    contained 
                    ? {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText
                    }
                    :{
                    }
                    :
                    {
                        // backgroundColor: theme.palette.secondary.dark,
                        ...paperSx
                    })
                }}
                className={`toggle-profile-button__paper toggle-profile-button__paper--${size}`}
            >             
                {children}
            </Paper>   
        </Profile>
    </Button>
)}
export default ToggleProfileButton;