import { StepContext, ToggleButtonGroup } from "@mui/material";
import { PropsWithChildren, useCallback, useContext } from "react";
import { useStepContext } from "../Step/StepContext";
import { useStepCheckpoint } from "../Step/StepCheckpointContext";

interface SectionButtonGroupProps {

};

function SectionButtonGroup({ children }: PropsWithChildren<SectionButtonGroupProps>) {

    const { stepCheckpointList } = useStepCheckpoint();
    const { section, setSection } = useStepContext();

    const handleChange = useCallback((
        event: React.MouseEvent<HTMLElement>,
        newIndex: number,
    ) => {
        if (newIndex as number < stepCheckpointList.current.length) {
            setSection(newIndex as number);
            window.scrollTo({ top: stepCheckpointList.current[newIndex as number].offsetTop, behavior: "smooth" });
        }
        else {
            console.log(`useSection: warning: Section with index {${newIndex}} is missing.`);
        }
    }, [ setSection, stepCheckpointList ]);

    return (
        <ToggleButtonGroup
            value={ section }
            exclusive
            onChange={ handleChange }
            aria-label="sections"
            sx={{ width: "100%" }}
        >
            {children}
        </ToggleButtonGroup>
    );
}
export default SectionButtonGroup;