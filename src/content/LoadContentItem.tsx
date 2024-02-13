import { PropsWithChildren, createContext, useContext } from "react";
import { LoadStatus } from "../reducers";
import LoadStatusContext from "./LoadStatusContext";
import LazyImage from "../components/LazyImage";
import getImgSrc, { FORMATPNG } from "../utils/getImgSrc";

interface LoadContentItemProps{
    showOn: LoadStatus
    src?: string
}
function LoadContentItem({ children, showOn } : PropsWithChildren<LoadContentItemProps>) {

    const { status } = useContext( LoadStatusContext );

    return(
        ( status === showOn ) 
        && (
            children
            ? children
            : <>
                <LazyImage
                    alt={status}
                    src={getImgSrc('/character', status, FORMATPNG)}
                    containerClassName="load-content-item__image"
                    // containerSx={{ height: "192px" }}
                />
                <p></p>
            </>
        )
    );
}

export default LoadContentItem;