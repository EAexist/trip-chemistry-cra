import { ComponentType, PropsWithChildren, useCallback, useEffect } from "react";
import { ToggleButtonProps } from "@mui/material";

import { useScrollToCheckpoint, useStepCheckpoint } from "../components/Step/StepCheckpointContext";
import { useSetStep, useStepContext } from "../components/Step/StepContext";

interface SetStepOnChangeProps {
    index: number;
}; 

const withSetStepOnChange = <T extends ToggleButtonProps>( WrappedComponent: ComponentType<T> ) => 
        ( { index, className, ...props }: PropsWithChildren<SetStepOnChangeProps> & Omit<T, "onChange">) => {
    
    const scrollToCheckpoint = useScrollToCheckpoint();
    const { step } = useStepContext();

    const handleChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => scrollToCheckpoint(value);

    // useEffect(() => {
    //     console.log( `[withSetStepOnChange] ${stepCheckpointList.current.map((element)=>element.scrollTop)}` );
    // }, [ stepCheckpointList ])

    return(
        <WrappedComponent {...{onChange : handleChange, selected: step === index, className: `${className} scroll-target`,  ...props} as unknown as T} />
    );
}

export default withSetStepOnChange;
