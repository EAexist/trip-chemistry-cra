/* React */
import { useEffect } from "react";

/* React Packages */
import { Outlet, useNavigate } from "react-router-dom";

/* Trip Chemistry */
import { useHasAnsweredTest, useUserId } from "../reducers/authReducer";
import NoticeBlock from "./NoticeBlock";
import getImgSrc, { FORMATPNG } from "../utils/getImgSrc";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface TestRequiredContentProps {

};

function TestRequiredContent({ }: TestRequiredContentProps) {

    const navigate = useNavigate();

    /* Store */
    const nickname = useSelector((state: RootState) => state.auth.data.profile.nickname )
    const hasAnsweredTest = useHasAnsweredTest();

    /* Event Handlers */
    const handleHasNotAnsweredTest = () => {
        navigate('test');        
    }

    return (
        hasAnsweredTest 
        ?
        <Outlet />
        :
        <NoticeBlock
            alt={"miss"}
            src={ getImgSrc('/info', "MISS", FORMATPNG) }
            body={`${nickname} 님의 여행은 어떤 모습일까요?\n테스트를 완료하고 결과를 확인해보세요.`}
            buttonText={"테스트하러 가기"}
            handleClick={handleHasNotAnsweredTest}
        />
    );
}
export default TestRequiredContent;