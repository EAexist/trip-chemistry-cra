import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { IconButton, IconButtonProps, styled } from "@mui/material";

interface NavigationButtonProps extends IconButtonProps{ 
    position? : 'fixed' | 'absolute'
    navigateTo? : 'prev' | 'next'
};

const NavigationButton = (({ position = 'absolute', navigateTo = 'prev', ...props } : NavigationButtonProps ) => {

    const sx = {
        position: position, 
        top: "50%",
        left: navigateTo === 'prev' ? 0 : undefined,
        right: navigateTo === 'next' ? 0 : undefined,
        zIndex: 10,
    };

    return(
        <IconButton sx={{ ...sx, ...props.sx}} {...props}>
            {
                navigateTo === 'prev' 
                ? <NavigateBefore /> 
                : <NavigateNext />
            }
        </IconButton>
    )

});

export default NavigationButton;
