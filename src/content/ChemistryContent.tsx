import { CHEMISTRY } from "../common/app-const";
import StepContainer from "../components/Step/StepContainer";
import { useStrings } from "../texts";

interface ChemistryContentProps{

};

function ChemistryContent( {} : ChemistryContentProps ){

    const sectionIdToIndex = Object.fromEntries(CHEMISTRY.sections.map((value, index) => [value, index]));
    const strings = useStrings().public.contents.chemistry;

    /* Event Handlers */
    return (
        <div className="page">
            <StepContainer idToIndex={sectionIdToIndex}>
                <div className="content__body content__body--gray">
                    <div className="body">
                    </div>
                </div>
            </StepContainer>
        </div>
    );
}
export default ChemistryContent;