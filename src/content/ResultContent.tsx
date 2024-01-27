import { Button } from "@mui/material";
import { RESULT } from "../common/app-const";
import StepContainer from "../components/Step/StepContainer";
import { useStrings } from "../texts";
import { useNavigate } from "react-router-dom";

interface ResultContentProps {

};

function ResultContent({ }: ResultContentProps) {

    const sectionIdToIndex = Object.fromEntries(RESULT.sections.map((value, index) => [value, index]));
    const strings = useStrings().public.contents.result;

    const navigate = useNavigate();

    /* Event Handlers */
    const handleChemistryButtonClick = () => {
        navigate('/chemistry');
    }

    return (
        <div className="page">
            <StepContainer idToIndex={sectionIdToIndex}>
                <div className="content__body content__body--gray">
                    <div className="body">
                        <Button
                            onClick={handleChemistryButtonClick}
                            variant="contained"
                        >
                            {strings.navigateToChemistryButton}
                        </Button>
                    </div>
                </div>
            </StepContainer>
        </div>
    );
}
export default ResultContent;