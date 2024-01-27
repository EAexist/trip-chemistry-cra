import { IconButton, IconButtonProps, styled } from "@mui/material";

const NavigationButton = styled( IconButton )<IconButtonProps & { navigateTo? : 'prev' | 'next' }>(({ navigateTo = 'prev' }) => ({
    position: 'fixed', 
    top: "50%",
    left: navigateTo === 'prev' ? 0 : undefined,
    right: navigateTo === 'next' ? 0 : undefined,
    // translate:,
    zIndex: 10,
}));

export default NavigationButton;
