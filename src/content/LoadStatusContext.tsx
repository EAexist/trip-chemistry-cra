import { PropsWithChildren, createContext, useContext } from "react";
import { LoadStatus } from "../reducers";

interface LoadStatusContextProps{
    status: LoadStatus;
    setStatus: ( status: LoadStatus) => void;
}

const LoadStatusContext = createContext<LoadStatusContextProps>( {} as LoadStatusContextProps );

export default LoadStatusContext;