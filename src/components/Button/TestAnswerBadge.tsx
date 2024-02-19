import { PropsWithChildren } from "react";

import { Badge } from "@mui/material";

import { TestName, useIsTestAnswered } from "../../reducers/testAnswerReducer";

interface TestAnswerBadgeProps {
    testName: TestName;
};

function TestAnswerBadge({ testName, children }: PropsWithChildren<TestAnswerBadgeProps>) {

    const isAnswered = useIsTestAnswered( testName );

    return (
        <Badge invisible={isAnswered} >
            { children }
        </Badge>
    );
}
export default TestAnswerBadge;