import { Card, CardProps, styled } from "@mui/material";
import { withExpandContext } from "../~Expand/ExpandContext";

const CardEffect = styled( "div" )<{ isActive?: boolean }>(({ isActive = false }) => ({
    overflow: 'visible',
    position: 'relative',
    elevation: "6",  
}));

export default CardEffect;