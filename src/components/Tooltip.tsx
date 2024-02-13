import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material";
import styled from "styled-components";

const Tooltip = styled(({ className, sx, ...props }: TooltipProps) => (
    <MuiTooltip {...props} classes={{ popper: className }} sx={{ zIndex: 0, ...sx}} />
))`
    & .MuiTooltip-tooltip {
      background: transparent;
    }
`;

export default Tooltip; 