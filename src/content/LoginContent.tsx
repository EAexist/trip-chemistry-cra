/* React */
import { useCallback, useEffect } from "react";

/* React Packages */
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ButtonBase, Toolbar } from "@mui/material";

/* Trip Chemistry */
import { AppDispatch } from "../store";
import { asyncLogin, authorize, useAuthLoadStatus, useUserId } from "../reducers/authReducer";
import LoadContent from "./LoadContent";
import { KAKAO_AUTH_URL } from "../auth";
import LazyImage from "../components/LazyImage";
import getImgSrc, { FORMATPNG } from "../utils/getImgSrc";
import { addProfile, asyncGetInfo, asyncGetProfile, asyncGetSampleProfiles, asyncGetTestAnswer, asyncGetTestResult, useProfileLoadStatus } from "../reducers/profileReducer";
import { LoadStatus, IProfileId } from "../reducers";

interface LoginContentProps {

};

function LoginContent({ }: LoginContentProps) {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    /* Reducers */
    const userId = useUserId();    
    const [ status, setStatus ] = useAuthLoadStatus();    
    const [ profileLoadStatus, setProfileLoadStatus ] = useProfileLoadStatus( userId );    

    useEffect(() => {
        if( code )
            dispatch(asyncLogin( code ));
    }, [ code ])

    const handleSuccess = useCallback(() => {
        // assert( userId );
        dispatch( authorize() );
        if ( userId ){
            console.log(`[LoginContent] handleSuccess userId=${userId}`)
            dispatch( addProfile( userId ) );
            dispatch( asyncGetProfile({ id: userId }) );
            // dispatch( asyncGetInfo({ id: userId }) );
            // dispatch( asyncGetTestResult( userId ) );
            // dispatch( asyncGetTestAnswer( userId ) );
            dispatch( asyncGetSampleProfiles() );
        }
    }, [ dispatch, userId ]);

    useEffect(()=>{
        console.log(`[LoginContent] profileLoadStatus=${profileLoadStatus}`);
        if( profileLoadStatus === LoadStatus.SUCCESS ){
            setProfileLoadStatus( LoadStatus.REST );
            setStatus( LoadStatus.REST );
        }
    }, [ profileLoadStatus, setProfileLoadStatus, setStatus ])

    const handleFail = () => {
        navigate('/auth');
    }

    useEffect(()=>{

    }, [])

    return (
        <LoadContent {...{ 
            status, 
            setStatus,
            handleSuccess,
            handleFail,
        }}>
            <div className="page fullscreen flex">
                <Toolbar />
                <div className="flex-grow body--centered">
                    <ButtonBase>
                        <a href={KAKAO_AUTH_URL} className="kakaobtn">
                            <LazyImage sx={{ height: "36px" }} src={getImgSrc("kakao", "kakao_login_large_narrow", FORMATPNG)} alt={"kakao_login"} />
                        </a>
                    </ButtonBase>
                </div>
            </div>
        </LoadContent>
    );
}
export default LoginContent;