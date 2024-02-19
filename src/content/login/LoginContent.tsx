/* React */
import { useCallback, useEffect, useState } from "react";

/* React Packages */
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ButtonBase, Toolbar } from "@mui/material";

/* Trip Chemistry */
import { AppDispatch } from "../../store";
import { asyncLogin, authorize, useAuthLoadStatus, useIsAuthorized, useRedirectPath, useUserId } from "../../reducers/authReducer";
import LoadContent from "../LoadContent";
import { KAKAO_AUTH_URL } from "../../auth";
import LazyImage from "../../components/LazyImage";
import getImgSrc, { FORMATPNG } from "../../utils/getImgSrc";
import { addProfile, asyncGetProfile, asyncGetSampleProfiles, useProfileLoadStatus } from "../../reducers/profileReducer";
import { LoadStatus } from "../../reducers";

interface LoginContentProps {

};

function LoginContent({ }: LoginContentProps) {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    /* Reducers */
    const userId = useUserId();
    // const [ status, setStatus ] = useState<LoadStatus>();
    const [ authStatus, setAuthStatus ] = useAuthLoadStatus();
    const [ profileLoadStatus, setProfileLoadStatus ] = useProfileLoadStatus(userId);
    const isAuthorized = useIsAuthorized();
    const [redirectPath, setRedirectPath] = useRedirectPath();

    const handleFail = () => {
        navigate('/login');
        setAuthStatus(LoadStatus.REST);
    }

    useEffect(() => {
        if (code)
            dispatch(asyncLogin(code));
    }, [code, dispatch])

    const handleAuthSuccess = useCallback(() => {
        // assert( userId );
        dispatch(authorize());
        if (userId) {
            console.log(`[LoginContent] handleSuccess userId=${userId}`)
            dispatch(addProfile(userId));
            dispatch(asyncGetProfile({ id: userId }));
            dispatch(asyncGetSampleProfiles());
        }
        setAuthStatus(LoadStatus.REST);
    }, [ dispatch, userId, setAuthStatus ]);

    const handleProfileLoadSuccess = useCallback(() => {
        setProfileLoadStatus(LoadStatus.REST)
    }, [ setProfileLoadStatus ]);

    // useEffect(() => {
    //     console.log(`[LoginContent] profileLoadStatus=${profileLoadStatus}`);
    //     if ( profileLoadStatus !== LoadStatus.REST ) {
    //         setStatus( profileLoadStatus );
    //     }
    //     if ( profileLoadStatus === LoadStatus.SUCCESS ){
    //         setProfileLoadStatus(LoadStatus.REST);
    //     }
    // }, [ profileLoadStatus, setProfileLoadStatus, setAuthStatus ])

    // useEffect(() => {
    //     console.log(`[LoginContent] authStatus=${authStatus}`);
    //     if ( authStatus !== LoadStatus.REST ) {
    //         setStatus( authStatus );
    //     }
    // }, [ authStatus, setStatus ])

    useEffect(() => {
        if ((state !== null) && state.loginRedirectPath) {
            console.log(`[LoginContent] loginRedirectPath=${state.loginRedirectPath}`);
            setRedirectPath(state.loginRedirectPath);
        }
    }, [state, setRedirectPath]);

    return (
        <LoadContent {...{
            status: authStatus,
            setStatus: setAuthStatus,
            handleSuccess: handleAuthSuccess,
            handleFail,
        }}>
            <LoadContent {...{
                status: profileLoadStatus,
                setStatus: setProfileLoadStatus,
                handleSuccess: handleProfileLoadSuccess,
                handleFail,
            }}>
                {

                    isAuthorized
                        ?
                        <Navigate to={redirectPath} />
                        :
                        <div className="page fullscreen flex">
                            <Toolbar />
                            <div className="flex-grow body--centered">
                                <LazyImage
                                    alt={"login"}
                                    src={getImgSrc('/info', "login", FORMATPNG)}
                                    containerClassName="load-content-item__image"
                                    containerSx={{ height: "256px", width: "256px" }}
                                />
                                <div className="block__body">
                                    <ButtonBase>
                                        <a href={KAKAO_AUTH_URL}>
                                            <img height={'48px'} src={getImgSrc("kakao", "kakao_login_large_narrow", FORMATPNG)} alt={"kakao_login"} />
                                        </a>
                                    </ButtonBase>

                                </div>
                            </div>
                        </div>
                }
            </LoadContent>
        </LoadContent>
    );
}
export default LoginContent;