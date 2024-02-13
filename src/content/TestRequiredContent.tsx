/* React */
import { useEffect } from "react";

/* React Packages */
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

/* Trip Chemistry */
import LoadContent from "./LoadContent";
import { useProfileLoadStatus, useUser } from "../reducers/profileReducer";
import { useUserId } from "../reducers/authReducer";
import { AppDispatch } from "../store";

interface TestRequiredContentProps {

};

function TestRequiredContent({ }: TestRequiredContentProps) {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    /* Store */
    const userId = useUserId();
    const { nickname } = useUser();
    const [ status, setStatus ] = useProfileLoadStatus( userId, 'testResult');

    const handleFail = () => {
        navigate('/test');        
    }    

    const handleMiss = () => {
        navigate('/test');        
    }

    useEffect(() => {
        console.log(`[TestRequiredContent] status=${status}`);
    }, [ status ])

    return (
        <LoadContent {...{
            status,
            setStatus,
            handleFail,
            handleMiss,
            missText: `${nickname}님의 여행은 어떤 모습일까요?\n테스트를 완료하고 결과를 확인해보세요.`,
            handleMissButtonText: `테스트하러 가기`,
        }}>
            <Outlet />
        </LoadContent>
    );
}
export default TestRequiredContent;