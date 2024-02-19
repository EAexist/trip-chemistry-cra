import { PropsWithChildren, useCallback, useEffect } from "react";
import { useSetStepCheckpoint } from "./StepCheckpointContext";
import { useStepContext } from "./StepContext";

interface scrollCheckpointProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    index: number;
};

function Step({ index, children, ...props } : PropsWithChildren<scrollCheckpointProps>){

    const { setStep } = useStepContext();
    const { setCheckpoint } = useSetStepCheckpoint( index, useCallback(([ entry ] : IntersectionObserverEntry[])=>{
        if ( entry.isIntersecting ){
            console.log(`[Step] isIntersecting index=${index}`);
            setStep(index)
        }
    }, [ index, setStep ]) );

    useEffect(()=>{
        console.log(`[Step] Mmounting. id=${index}`)
        return() => {
            console.log(`[Step] Unmounting. id=${index}`)
        }
    }, [])

    return(
        <div ref={setCheckpoint} {...props}>
            { children }
        </div>
    );
}
export default Step;