/* React */
import { useEffect, useRef, useState } from "react";

/* React Packages */

import { Outlet, useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

/* App */
import '../../styles/index.css';

import { RootState } from "../../store";
import { useStrings } from "../../texts";
import { useSubmitAnswer, useTestAnswerStatus } from "../../reducers/testAnswerReducer";

interface TestContentProps {

};

const userId = "디클1234";

function TestContent({ }: TestContentProps) {

    const navigate = useNavigate();

    /* strings */
    const strings = useStrings().public.contents.test;

    /* Store */
    const isAllTestAnswered = Object.values(useSelector((state: RootState) => state.testAnswer.data)).map(object => (
        Object.values(object).every(v => v !== undefined)
    )
    ).every(v => v === true);

    const [testAnswerLoadStatus] = useTestAnswerStatus();
    const putAnswer = useSubmitAnswer();

    /* States */
    const [isConfirmTooltipOpen, setIsConfirmTooltipOpen] = useState(false);

    /* Event Handlers */
    const handleConfirmTooltipOpen = () => {
        if (!isAllTestAnswered) {
            setIsConfirmTooltipOpen(true);
        }
    };
    const handleConfirmButtonClick = () => {
        putAnswer();
        navigate('put');
        // .then(() => {
        //     testAnswerLoadStatus && navigate('/result');
        // });
    }

    return (
        <div className="page">
            <Outlet />
        </div >
    );
}
export default TestContent;