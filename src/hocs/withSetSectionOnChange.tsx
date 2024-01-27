import { ComponentType, PropsWithChildren, useCallback } from "react";
import { ToggleButtonProps } from "@mui/material";

import { useStepCheckpoint } from "../components/Step/StepCheckpointContext";
import { useSetSection } from "../components/Step/StepContext";

interface SetSectionOnChangeProps {
    index: number;
}; 

const withSetSectionOnChange = <T extends ToggleButtonProps>( WrappedComponent: ComponentType<T> ) => 
        ( { index, ...props }: PropsWithChildren<SetSectionOnChangeProps> & Omit<T, "onChange">) => {
    
    const { stepCheckpointList } = useStepCheckpoint();    
    const setSection = useSetSection();

    const handleChange = useCallback(()=>{
        if ( index as number < stepCheckpointList.current.length ){
            setSection(index as number); 
            window.scrollTo({ top: stepCheckpointList.current[index as number].offsetTop, behavior: "smooth"}); 
        }
        else {
            console.log(`useSection: warning: Section with index {${index}} is missing.`);
        }
    }, [ stepCheckpointList, index, setSection ]);

    return(
        <WrappedComponent {...{onChange : handleChange, ...props} as unknown as T} />
    );
}

export default withSetSectionOnChange;
