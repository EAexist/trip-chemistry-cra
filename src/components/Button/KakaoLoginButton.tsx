/* React */
import { useEffect, useState } from "react";

/* React Packages */
import { ButtonBase } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/* App */
import { KAKAO_AUTH_URL_BASE } from "../../common/auth";
import { AppDispatch } from "../../store";
import getImgSrc, { FORMATWEBP } from "../../utils/getImgSrc";

interface KakaoLoginButtonProps {

};

function KakaoLoginButton({ }: KakaoLoginButtonProps) {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { state, pathname } = useLocation();
    const [url, setUrl] = useState<string>(KAKAO_AUTH_URL_BASE);

    /* Reducers */
    useEffect(() => {

        const urlObject = new URL(url);

        if ((state !== null) && state.loginRedirectPath) {
            console.log(`[KakaoLoginButton] loginRedirectPath=${state.loginRedirectPath}`);
            urlObject.searchParams.set('state', state.loginRedirectPath);
        }
        else {
            console.log(`[KakaoLoginButton] pathname=${pathname}`);
            urlObject.searchParams.set('state', pathname);
        }
        setUrl(urlObject.toString());
    }, [state, pathname, url]);

    useEffect(() => {
        const urlObject = new URL(url);
        urlObject.searchParams.set('client_id', `${process.env.REACT_APP_KAKAO_REST_API_KEY}`);
        urlObject.searchParams.set('redirect_uri', `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`);
        urlObject.searchParams.set('response_type', 'code');
        setUrl(urlObject.toString());
    }, []);

    useEffect(() => {
        console.log(`[KakaoLoginButton]\n\turl=${url}`);
    }, [url])

    return (
        <a href={url}>
            <ButtonBase>
                <img height={'48px'} width={'96px'} src={getImgSrc("/kakao", "kakao_login_large_narrow", FORMATWEBP)} alt={"kakao_login"} />
            </ButtonBase>
        </a>
    );
}
export default KakaoLoginButton;