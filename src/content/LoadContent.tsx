/* React */
import { PropsWithChildren, useEffect, useRef, useState } from "react";

/* React Packages */
import { Button, Toolbar, useScrollTrigger } from "@mui/material";

import { useStrings } from "../texts";
import { LoadStatus, IProfileId } from "../reducers";
import LoadStatusContext from "./LoadStatusContext";
import getImgSrc, { FORMATPNG } from "../utils/getImgSrc";
import LazyImage from "../components/LazyImage";
import { Visibility } from "@mui/icons-material";

interface LoadContentProps {
    status?: LoadStatus;
    setStatus: (loadStatus: LoadStatus) => void;
    handleSuccess?: () => void;
    handleFail?: () => void;
    handleMiss?: () => void;
    successText?: string;
    pendingText?: string;
    failText?: string;
    missText?: string;
    handleFailButtonText?: string
    handleMissButtonText?: string
};

function LoadContent({
    status = LoadStatus.FAIL,
    setStatus,
    children,
    successText = "",
    pendingText = "잠시만 기다려주세요.",
    failText = "지금 서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요.",
    missText = "정보를 찾을 수 없어요. 잠시 후 다시 시도해주세요.",
    handleFailButtonText = "확인",
    handleMissButtonText = "확인",
    handleSuccess,
    handleFail,
    handleMiss,
}: PropsWithChildren<LoadContentProps>) {

    const strings = useStrings().public.contents.test;

    /* States */
    const [delayedStatus, setDelayedStatus] = useState<LoadStatus>(status);
    const [isPending, setIsPending] = useState<boolean>(false);
    const minimumPendingTime = 1500;


    /* Store */
    useEffect(() => {
        switch (status) {
            case LoadStatus.REST:
                setDelayedStatus(LoadStatus.REST);
                break;
            case LoadStatus.SUCCESS:
                if (!isPending) {
                    setDelayedStatus(LoadStatus.SUCCESS);
                    handleSuccess ?
                    handleSuccess() :
                    setStatus( LoadStatus.REST )
                }
                break;
            case LoadStatus.PENDING:
                setDelayedStatus(LoadStatus.PENDING);
                setIsPending(true);
                setTimeout(() => {
                    setIsPending(false);
                }, minimumPendingTime);
                break;
            case LoadStatus.FAIL:
                if (!isPending) {
                    setDelayedStatus(LoadStatus.FAIL);
                }
                break;
            case LoadStatus.MISS:
                if (!isPending) {
                    setDelayedStatus(LoadStatus.MISS);
                }
                break;
            default:
                break;
        }
    }, [ status, isPending, setStatus, handleSuccess ])

    return (
        (delayedStatus === LoadStatus.REST)
            ? children
            :
            <div className="page fullscreen flex">
                <Toolbar />
                <div className='flex-grow body--centered'>
                    <LazyImage
                        alt={delayedStatus}
                        src={getImgSrc('/character', delayedStatus, FORMATPNG)}
                        containerClassName="load-content-item__image"
                        containerSx={{ height: "192px" }}
                    />
                    {
                        (() => {
                            switch (delayedStatus) {
                                case LoadStatus.SUCCESS:
                                    return (
                                        <p>{pendingText}</p>
                                    );
                                case LoadStatus.PENDING:
                                    return (
                                        <p>{pendingText}</p>
                                    );
                                case LoadStatus.FAIL:
                                    return (
                                        <p>{failText}</p>
                                    );
                                case LoadStatus.MISS:
                                    return (
                                        <p>{missText}</p>
                                    );
                                default:
                                    break;
                            }
                        })()
                    }
                </div>
                <div className="block__body">
                    {
                        <div className="block--with-margin-x flex">
                            <Button
                                onClick={
                                        ( delayedStatus === LoadStatus.FAIL ) && handleFail
                                        ? handleFail 
                                        : ( delayedStatus === LoadStatus.MISS ) && handleMiss 
                                        ? handleMiss
                                        : () => setStatus(LoadStatus.REST)
                                }
                                // disabled={( delayedStatus !== LoadStatus.FAIL )}
                                variant="contained"
                                style={{
                                    visibility: (delayedStatus === LoadStatus.FAIL) || (delayedStatus === LoadStatus.MISS)
                                        ? "visible"
                                        : "hidden"
                                }}
                            >
                                <p>
                                    {
                                        delayedStatus === LoadStatus.FAIL ?
                                            handleFailButtonText
                                            :
                                            delayedStatus === LoadStatus.MISS ?
                                                handleMissButtonText
                                                : undefined
                                    }
                                </p>
                            </Button>
                        </div>
                    }
                    <div />
                </div>
            </div>
    );
}
export default LoadContent;