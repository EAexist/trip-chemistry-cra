import { PropsWithChildren } from "react";

import { Badge, BadgeProps } from "@mui/material";

import { TestName, useIsTestAnswered } from "../../../reducers/testAnswerReducer";

interface TestAnswerBadgeProps extends BadgeProps{
    testName: TestName;
};

function TestAnswerBadge({ testName, children, ...props }: PropsWithChildren<TestAnswerBadgeProps>) {

    const isAnswered = useIsTestAnswered( testName );

    return (
        <Badge invisible={isAnswered} {...props} variant="dot" color="primary">
            { children }
        </Badge>
    );
}
export default TestAnswerBadge;