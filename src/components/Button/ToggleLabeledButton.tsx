import { PropsWithChildren, useEffect, useState } from "react";

import { Button, Paper, SxProps, ToggleButtonProps, useTheme } from "@mui/material";
import { Theme } from "@emotion/react";
import Label from "../Label";

interface ToggleLabeledButtonProps extends ToggleButtonProps {
    label?: string;
    contained?: boolean;
    sx? : SxProps<Theme>;
    paperSx? : SxProps<Theme>;
    elevation? : number;
    labelSize? : 'medium' | 'large' | 'xlarge';
};

const ToggleLabeledButton = ({ label, children, onChange, size ="small", labelSize = 'medium', value, selected, contained = false, sx, paperSx, elevation = 0, className }: PropsWithChildren<ToggleLabeledButtonProps>) => {
    
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
        <Label
            label={label}
            labelSize={labelSize}
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
                className={`ToggleLabeledButton__paper ToggleLabeledButton__paper--${size}`}
            >             
                {children}
            </Paper>   
        </Label>
    </Button>
)}
export default ToggleLabeledButton;