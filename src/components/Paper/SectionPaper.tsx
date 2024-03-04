import { Paper, PaperProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

const SectionPaper = forwardRef(({ className, square = true, children, ...props }: PaperProps, ref: ForwardedRef<HTMLDivElement>) =>
    <Paper
        square={square}
        elevation={0}
        className={`block--with-padding ${className}`}
        {...props}
    >
        {children}
    </Paper>
);

export default SectionPaper;
