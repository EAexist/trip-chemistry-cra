import { CardMedia, CardMediaProps, CardMediaTypeMap, styled } from "@mui/material";

import { withExpandContext } from "./ExpandContext";
import { OverridableComponent } from "@mui/material/OverridableComponent";

const CardMediaContainer = styled("div")(({ width, isExpanded } : { width?: string | number, isExpanded : boolean }) => ({
    width : isExpanded ? width : "100%",
    height: "100%"
}));

export default withExpandContext( CardMediaContainer );