import { PropsWithChildren, createContext, useContext, useState } from "react";

interface AppBarContextProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppBarContext = createContext<AppBarContextProps>({} as AppBarContextProps);

const AppBarContextProvider = ({ children }: PropsWithChildren ) => {

    const [ showAppBar, setShowAppBar ] = useState(true);

    return (
        <AppBarContext.Provider value={{ show: showAppBar, setShow: setShowAppBar }}>
            {children}
        </AppBarContext.Provider>
    )
}

const useAppBar = () => useContext(AppBarContext).show;
const useSetAppBar = () => useContext(AppBarContext).setShow;

export default AppBarContext;
export { useAppBar, useSetAppBar, AppBarContextProvider };