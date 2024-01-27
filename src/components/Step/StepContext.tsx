import { ComponentType, createContext, useCallback, useContext, useState } from "react";

type DynamicStep = [ step: number, isIncrementing: boolean ];

interface StepContextProps{
    section: number;
    setSection: React.Dispatch<React.SetStateAction<number>>;
    // section: DynamicStep;
    // setSection: React.Dispatch<React.SetStateAction<DynamicStep>>;
} 

const StepContext = createContext<StepContextProps>({} as StepContextProps);

const withStepContext = <T extends {}>( WrappedComponent: ComponentType<T> ) => ( props : T ) => {

    const [ section, setSection ] = useState<number>(0); 

    return(
        <StepContext.Provider value={ { section, setSection } }>
            <WrappedComponent {...props}/>
        </StepContext.Provider>
    )
}

const useSection = () => useContext(StepContext).section;
const useSetSection = () => useContext(StepContext).setSection;
const useStepContext = () => useContext(StepContext);

// const useSetSection = () => {
//     const { section, setSection } = useStepContext();

//     return(
//         useCallback(( newSection: number ) => {        
//             if( activeStep !== newSection ){
//                 setSection([ newSection, activeStep < newSection ]);
//             }
//         }, [ section, setSection ])
//     )
// }

export default StepContext;

export { withStepContext, useStepContext, useSection, useSetSection }
export type { DynamicStep };