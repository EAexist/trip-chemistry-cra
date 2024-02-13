import { MotionValue } from "framer-motion";
import { PropsWithChildren, createContext, useContext } from "react";

type ScrollContextProps =  MotionValue<number>;
const ScrollContext = createContext<ScrollContextProps>({} as MotionValue<number>);

const useScroll = () => useContext(ScrollContext);

const ScrollContextProvider = ( { value, children }: PropsWithChildren<{ value : ScrollContextProps }> ) => {
    return(
        <ScrollContext.Provider value={ value }>
            { children }
        </ScrollContext.Provider>
    )
}

export default ScrollContext;
export { useScroll, ScrollContextProvider }; 