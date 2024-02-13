import { Badge } from "@mui/material";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { TestIndex } from "../../reducers/testAnswerReducer";
import { RootState } from "../../store";
import { Done } from "@mui/icons-material";

interface TestAnswerBadgeProps {
    testIndex: TestIndex;
};

function TestAnswerBadge({ testIndex, children }: PropsWithChildren<TestAnswerBadgeProps>) {

    const isAnswered = useSelector(( state: RootState )=>(state.testAnswer.data[testIndex.index][testIndex.subIndex]) !== undefined )

    return (
        <Badge invisible={isAnswered} >
            { children }
        </Badge>
    );
}
export default TestAnswerBadge;