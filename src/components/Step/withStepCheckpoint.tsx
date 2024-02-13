import { ComponentType, ForwardedRef, PropsWithChildren, RefObject, forwardRef, useCallback, useEffect } from "react";
import { useSetStepCheckpoint } from "./StepCheckpointContext";
import { useStepContext } from "./StepContext";

interface WtihSectionProps{
    ref?: ( (instance: HTMLElement | null) => void ) | RefObject<HTMLElement> | ( (instance: HTMLDivElement | null) => void ) | RefObject<HTMLDivElement>  | null;
}

const withStepCheckpoint = <T extends WtihSectionProps>(WrappedComponent: ComponentType<T>) => forwardRef(
    ( { index, ...props }: Omit<T, keyof WtihSectionProps> & { index: number }, ref : ForwardedRef<HTMLDivElement> ) => {
    
    const { setStep } = useStepContext();
    const { setCheckpoint, removeCheckpoint } = useSetStepCheckpoint( index, useCallback(([ entry ] : IntersectionObserverEntry[])=>{
        if ( entry.isIntersecting ){
            console.log(`[withStepCheckpoint] isIntersecting index=${index}`);
            setStep(index)
        }
    }, [ index, setStep ]) );

    useEffect(()=>{
        console.log(`[withStepCheckpoint] Mounting. index=${index}`);
        return() => {
            console.log(`[withStepCheckpoint] Unmounting. index=${index}`);
            removeCheckpoint();
        }
    }, [])

    return(
        <WrappedComponent {...{ ref : setCheckpoint, ...props } as unknown as T} />
    );
})
// export default withStepCheckpoint;