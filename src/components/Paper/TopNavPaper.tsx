import { Paper, PaperProps, styled } from "@mui/material";
import withStepCheckpoint from "../Step/withStepCheckpoint";

const TopNavPaper = styled( Paper )<PaperProps>(({ theme }) => ({
    elevation: 6,
    borderRadius: 0,
    zIndex: "10",
    height: "100%",
    display: "flex",
    justifyContent: "stretch",
    alignItems: "center",
    backgroundColor: "aqua"
}));

// const TopNavPaperWithStep = withStepCheckpoint(TopNavPaper);

export default TopNavPaper;
// export { TopNavPaperWithStep };
