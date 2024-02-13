import { Paper, PaperProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

const SectionPaper = forwardRef(({ children }: PaperProps, ref: ForwardedRef<HTMLDivElement>) =>
    <Paper
        square={true}
        elevation={0}
        className="block--with-padding"
        // ref={ref}
    >
        {/* <div className="block--with-margin"> */}
            {children}
        {/* </div> */}
    </Paper>
);

export default SectionPaper;
