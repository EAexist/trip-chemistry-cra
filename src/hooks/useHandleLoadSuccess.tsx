import { useEffect, useState } from "react";
import { LoadStatus } from "../reducers";

interface useProfileLoadStatusProps {
    status: LoadStatus;
    setStatus: ( status: LoadStatus )=>void;
    handleSuccess?: ()=>void;
    delay?: number;
};
export const useHandleLoadSuccess = ({ status, handleSuccess, delay = 0 }: useProfileLoadStatusProps) => {

    const [ successToRestSecond, setSuccessToRestSecond ] = useState<number>(0);

    useEffect(()=>{        
        console.log(`Using [useHandleLoadSuccess]`);
    }, []);

    /* Handle Load Success */
    useEffect(()=>{        
        // console.log(`[useHandleLoadSuccess]: ( status, setStatus, delay ) updated\n status=${status} delay=${delay}`);
        const timeout = status === LoadStatus.SUCCESS 
            ? setTimeout(() => {
                handleSuccess && handleSuccess();
            }, delay) 
            : undefined;

        setSuccessToRestSecond( Math.floor(delay/1000) );
        return () => {
            console.log(`usAPisucess: Unmounting`); clearTimeout(timeout);
        };

    }, [ status ]);

    /* Run Timer */
    useEffect(()=>{
        // console.log(`[useHandleLoadSuccess]: ( successToRestSecond ) updated\n  successToRestSecond=${successToRestSecond}`);
        const interval = setInterval(() => setSuccessToRestSecond((prev)=>prev-1), 1000);
        if(successToRestSecond === 0) {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval)
        };   
    }, [ successToRestSecond ])

    return successToRestSecond;
}

export default useHandleLoadSuccess;