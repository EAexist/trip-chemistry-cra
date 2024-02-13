import { PropsWithChildren, createContext, useContext } from "react";

type PageContextProps = number | undefined;
const PageContext = createContext<PageContextProps>( undefined );

const usePage = () => useContext(PageContext);

const PageContextProvider = ( { value, children }: PropsWithChildren<{ value : PageContextProps }> ) => {
    return(
        <PageContext.Provider value={ value }>
            { children }
        </PageContext.Provider>
    )
}

export default PageContext;
export { usePage, PageContextProvider }; 