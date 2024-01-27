import { ComponentType, PropsWithChildren, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type IdToIndex = { [key: string] : number };

interface StepCheckpointContextProps{
    idToIndex: IdToIndex;
    setIdToIndex: ( idToIndex: IdToIndex ) => void;
    stepCheckpointList: React.MutableRefObject<HTMLDivElement[]>;
} 

const StepCheckpointContext = createContext<StepCheckpointContextProps>({} as StepCheckpointContextProps);

function StepCheckpointContextProvider({ children }: PropsWithChildren) {

    const [ idToIndex, setIdToIndex ] = useState<IdToIndex>({} as IdToIndex) 
    const stepCheckpointList = useRef<HTMLDivElement[]>([]); 

    return (
        <StepCheckpointContext.Provider value={ { idToIndex : idToIndex, setIdToIndex : setIdToIndex, stepCheckpointList : stepCheckpointList } }>
            {children}
        </StepCheckpointContext.Provider>
    );
}

/**** Custom Hooks ****/

const useStepCheckpoint = () => useContext( StepCheckpointContext );

const useSetStepCheckpoint = ( id: string ) => {

    const { idToIndex, stepCheckpointList } = useStepCheckpoint();

    return({
        setCheckpoint: useCallback((element: HTMLDivElement) => {
            if (element) stepCheckpointList.current[ idToIndex[ id ] ] = element;
        }, [ idToIndex, stepCheckpointList, id ]),
        removeCheckpoint: useCallback(() => {
            stepCheckpointList.current = stepCheckpointList.current.splice(idToIndex[ id ], 1);
        }, [ idToIndex, stepCheckpointList, id ]),    
    });
}

const useSetIdToIndex = ( idToIndex: IdToIndex ) => {
    
    const { setIdToIndex } = useStepCheckpoint();

    useEffect(()=>{
        setIdToIndex( idToIndex );
    }, [ idToIndex ])
};

/**** HOCs ****/
const withStepCheckpointContext = <T extends {}>( WrappedComponent: ComponentType<T> ) => ( props : T ) => {

    const [ idToIndex, setIdToIndex ] = useState<IdToIndex>({} as IdToIndex) 
    const stepCheckpointList = useRef<HTMLDivElement[]>([]); 

    return(
        <StepCheckpointContext.Provider value={ { idToIndex, setIdToIndex, stepCheckpointList } }>
            <WrappedComponent {...props}/>
        </StepCheckpointContext.Provider>
    )
}

export default StepCheckpointContext;

export { StepCheckpointContextProvider }
export { useStepCheckpoint, useSetStepCheckpoint, useSetIdToIndex };
export { withStepCheckpointContext };

export type { IdToIndex };