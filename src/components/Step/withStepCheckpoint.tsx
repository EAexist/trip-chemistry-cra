import { ComponentType, PropsWithChildren, RefObject, useEffect } from "react";
import { useSetStepCheckpoint } from "./StepCheckpointContext";

interface WtihSectionProps{
    ref?: ( (instance: HTMLElement | null) => void ) | RefObject<HTMLElement> | ( (instance: HTMLDivElement | null) => void ) | RefObject<HTMLDivElement>  | null;
}

const withStepCheckpoint = <T extends WtihSectionProps>(WrappedComponent: ComponentType<T>) => 
    ( { id, ...props }: Omit<T, keyof WtihSectionProps> & { id: string }) => {
    
    const { setCheckpoint, removeCheckpoint } = useSetStepCheckpoint( id );

    useEffect(()=>{
        return() => {
            console.log(`[Section] Unmounting. id=${id}`)
            removeCheckpoint();
        }
    }, [])

    return(
        <WrappedComponent {...{ref : setCheckpoint, ...props} as unknown as T} />
    );
}
export default withStepCheckpoint;