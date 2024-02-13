import { IconButton, IconButtonProps, styled } from "@mui/material";

const NavigationButton = styled( IconButton )<IconButtonProps & { position? : 'fixed' | 'absolute', navigateTo? : 'prev' | 'next' }>(({ position = 'absolute', navigateTo = 'prev' }) => ({
    position: position, 
    top: "50%",
    left: navigateTo === 'prev' ? 0 : undefined,
    right: navigateTo === 'next' ? 0 : undefined,
    // translate:,
    zIndex: 10,
}));

export default NavigationButton;
