import { Badge } from "@mui/material";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { TestName } from "../../reducers/testAnswerReducer";
import { RootState } from "../../store";

interface TestAnswerBadgeProps {
    testName: TestName;
};

function TestAnswerBadge({ testName, children }: PropsWithChildren<TestAnswerBadgeProps>) {

    const isAnswered = useSelector(( state: RootState )=>(state.testAnswer.data[testName]) !== undefined )

    return (
        <Badge invisible={isAnswered} >
            { children }
        </Badge>
    );
}
export default TestAnswerBadge;