import { Paper, PaperProps, styled } from "@mui/material";
import withStepCheckpoint from "../Step/withStepCheckpoint";

// const SectionPaper = styled( Paper )<PaperProps>(({ theme }) => ({
//     width: "100%",
//     elevation: "3",
//     borderRadius: "16px",
//     padding: "16px",
//     marginTop: "52px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "16px",
// }));

const SectionPaper = ({ children }: PaperProps) =>
    <Paper
        square={ false }
        elevation={ 0 }
        className="body--padding-y section"
    >
        { children }
    </Paper>;

const SectionPaperWithStep = withStepCheckpoint(SectionPaper);

export default SectionPaper;
export { SectionPaperWithStep };
