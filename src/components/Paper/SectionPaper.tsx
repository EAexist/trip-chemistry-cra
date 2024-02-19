import { Paper, PaperProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

const SectionPaper = forwardRef(({ className, children }: PaperProps, ref: ForwardedRef<HTMLDivElement>) =>
    <Paper
        square={true}
        elevation={0}
        className={`block--with-padding ${className}`}
    >
        {children}
    </Paper>
);

export default SectionPaper;
