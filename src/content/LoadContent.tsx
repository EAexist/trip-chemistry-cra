/* React */
import { PropsWithChildren, useEffect, useState } from "react";

/* React Packages */
import { Button, CircularProgress, Toolbar } from "@mui/material";

import { useStrings } from "../texts";
import { LoadStatus } from "../reducers";
import getImgSrc, { FORMATPNG } from "../utils/getImgSrc";
import LazyImage from "../components/LazyImage";
import withAuthLoadStatus, { WithLoadStatusProps } from "../hocs/withAuthLoadStatus";

interface LoadContentProps extends WithLoadStatusProps {
    handleSuccess?: () => void;
    handleFail?: () => void;
    handleMiss?: () => void;
    successText?: string;
    pendingText?: string;
    failText?: string;
    missText?: string;
    handleFailButtonText?: string
    handleMissButtonText?: string
    showHandleFailButton?: boolean
    isEnabled?: boolean
    doWait?: boolean
};

function LoadContent({
    status = LoadStatus.REST,
    setStatus,
    children,
    successText = "",
    pendingText = "잠시만 기다려주세요.",
    failText = "지금 서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요.",
    missText = "정보를 찾을 수 없어요. 잠시 후 다시 시도해주세요.",
    handleFailButtonText = "확인",
    handleMissButtonText = "확인",
    handleSuccess = () => {},
    handleFail = () => {},
    handleMiss = () => {},
    showHandleFailButton = true, /* false 일 경우 버튼 없이 FAIL을 즉시 처리. */
    isEnabled = true,
}: PropsWithChildren<LoadContentProps>) {

    /* States */
    const [delayedStatus, setDelayedStatus] = useState<LoadStatus>(status);
    const [isPending, setIsPending] = useState<boolean>(false);
    const minimumPendingTime = 500;

    /* Store */
    useEffect(() => {
        if( isEnabled ){
            switch (status) {
                case LoadStatus.REST:
                    setDelayedStatus(LoadStatus.REST);
                    break;
                case LoadStatus.SUCCESS:
                    if (!isPending) {
                        setDelayedStatus(LoadStatus.SUCCESS);
                        handleSuccess();
                        setStatus(LoadStatus.REST);
                    }
                    break;
                case LoadStatus.PENDING:
                    // if (isWaiting){
                    //     setIsWaiting(false);
                    // }
                    setDelayedStatus(LoadStatus.PENDING);
                    setIsPending(true);
                    setTimeout(() => {
                        setIsPending(false);
                    }, minimumPendingTime);
                    break;
                case LoadStatus.FAIL:
                    if (!isPending) {
                        setDelayedStatus(LoadStatus.FAIL);
                        /* 버튼 없이 FAIL을 바로 처리할 경우 */
                        if ( ! showHandleFailButton ){
                            handleFail();
                            setStatus(LoadStatus.REST);
                        }
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
        }
    }, [ status, isPending, handleSuccess, setStatus, isEnabled, handleFail, showHandleFailButton ])

    return (
        isEnabled ?
            (delayedStatus === LoadStatus.REST)
                ? children
                :
                <div className="page fullscreen flex">
                    <Toolbar />
                    <div className='flex-grow body--centered'>
                        {
                            ((delayedStatus === LoadStatus.PENDING)) 
                                ?
                                <div className='body--centered'>
                                    <CircularProgress />
                                </div>
                                :
                                <>
                                    <LazyImage
                                        alt={delayedStatus}
                                        src={getImgSrc('/info', delayedStatus, FORMATPNG)}
                                        containerClassName="load-content-item__image"
                                        containerSx={{ height: "256px", width: "256px" }}
                                    />
                                    {
                                        (() => {
                                            switch (delayedStatus) {
                                                case LoadStatus.SUCCESS:
                                                    return (
                                                        <p>{pendingText}</p>
                                                    );
                                                // case LoadStatus.PENDING:
                                                //     return (
                                                //         <p>{pendingText}</p>
                                                //     );
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
                                </>
                        }
                    </div>
                    {
                        (( (delayedStatus === LoadStatus.FAIL) && showHandleFailButton ) || (delayedStatus === LoadStatus.MISS))
                        &&
                        <div className="block__body">
                            <div className="block--with-margin-x flex">
                                {
                                    (delayedStatus === LoadStatus.FAIL)
                                        ?
                                        <Button
                                            onClick={() => {
                                                handleFail();
                                                setStatus(LoadStatus.REST);
                                            }}
                                            variant="contained"
                                            className="button--full"
                                        >
                                            {handleFailButtonText}
                                        </Button>
                                        :
                                        (delayedStatus === LoadStatus.MISS)
                                        &&
                                        <Button
                                            onClick={() => {
                                                handleMiss();
                                                setStatus(LoadStatus.REST);
                                            }}
                                            variant="contained"
                                            className="button--full"
                                        >
                                            {handleMissButtonText}
                                        </Button>
                                }
                            </div>
                            <div />
                        </div>
                    }
                </div>
            : children
    );
}
export default LoadContent;
const AuthLoadContent = withAuthLoadStatus(LoadContent);
export { AuthLoadContent };