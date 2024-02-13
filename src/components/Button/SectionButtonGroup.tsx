import { StepContext, ToggleButtonGroup } from "@mui/material";
import { PropsWithChildren, useCallback, useContext } from "react";
import { useStepContext } from "../Step/StepContext";
import { useStepCheckpoint } from "../Step/StepCheckpointContext";

interface SectionButtonGroupProps {

};

function SectionButtonGroup({ children }: PropsWithChildren<SectionButtonGroupProps>) {

    const { stepCheckpointList } = useStepCheckpoint();
    const { step, setStep } = useStepContext();

    const handleChange = useCallback((
        event: React.MouseEvent<HTMLElement>,
        newIndex: number,
    ) => {
        if (newIndex as number < stepCheckpointList.current.length) {
            setStep(newIndex as number);
            window.scrollTo({ top: stepCheckpointList.current[newIndex as number].offsetTop, behavior: "smooth" });
        }
        else {
            console.log(`useSTepsetStep: warning: STepsetStep with index {${newIndex}} is missing.`);
        }
    }, [ setStep, stepCheckpointList ]);

    return (
        <ToggleButtonGroup
            value={ step }
            exclusive
            onChange={ handleChange }
            aria-label="steps"
            sx={{ width: "100%" }}
        >
            {children}
        </ToggleButtonGroup>
    );
}
export default SectionButtonGroup;