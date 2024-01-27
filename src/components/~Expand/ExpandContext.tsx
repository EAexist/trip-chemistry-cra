import { ComponentType, PropsWithChildren, createContext, useCallback, useContext, useState } from "react";

interface ExpandContextProps{
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
} 

const ExpandContext = createContext<ExpandContextProps>({} as ExpandContextProps);
const useExpandContext = () => useContext(ExpandContext);
const ExpandContextProvider = ({ children } : PropsWithChildren ) => {

    const [ isExpanded, setIsExpanded ] = useState<boolean>(false); 

    return(
        <ExpandContext.Provider value={{ isExpanded, setIsExpanded }}>
            { children }
        </ExpandContext.Provider>
    )
}

const withExpandContext = <T extends { isExpanded : boolean }>( WrappedComponent: ComponentType<T> ) => 
    ( props : Omit<T, "isExpanded"> ) => {

    const { isExpanded } = useExpandContext(); 

    return(
        <WrappedComponent {...{ isExpanded }} { ...props as T}/>
    )
}

export default ExpandContext;
export { useExpandContext, ExpandContextProvider, withExpandContext };