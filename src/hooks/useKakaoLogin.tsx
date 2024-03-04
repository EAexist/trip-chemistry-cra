import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { asyncKakaoLogin } from "../reducers/authReducer";
import { AppDispatch } from "../store";

const useKakaoLogin = ( ) => {

    /* Hooks */
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const dispatch = useDispatch<AppDispatch>();

    /* Try login when access code is generated. */
    useEffect(() => {
        if (code)
            dispatch( asyncKakaoLogin(code) );
    }, [ code, dispatch ])

}

export default useKakaoLogin;