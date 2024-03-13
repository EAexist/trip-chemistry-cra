import { ListSubheader, ListSubheaderProps } from "@mui/material";
import { MotionProps, motion } from "framer-motion";
import { VARIANTS_SLIDE_UP } from "../../motion/props";

const MotionListSubheaderComponent = motion(ListSubheader, { forwardMotionProps: true });

export const MotionListSubheader = (props : ListSubheaderProps & MotionProps) => 
    <MotionListSubheaderComponent {...props} {...{variants : VARIANTS_SLIDE_UP}} /> 