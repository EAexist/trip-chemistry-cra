/* React */
/* React Packages */
import { ButtonBase, Toolbar } from "@mui/material";
import { useIsAuthorized } from "../reducers/authReducer";
import { KAKAO_AUTH_URL } from "../auth";
import getImgSrc, { FORMATPNG } from "../utils/getImgSrc";
import LazyImage from "../components/LazyImage";
import { Outlet } from "react-router-dom";

interface AuthRequiredContentProps {

};

function AuthRequiredContent({ }: AuthRequiredContentProps) {

    const isAuthorized = useIsAuthorized();

    return (
        isAuthorized 
        ?
        <Outlet />
        : 
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
    );
}
export default AuthRequiredContent;