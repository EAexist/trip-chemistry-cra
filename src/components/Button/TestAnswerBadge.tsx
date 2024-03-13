import { PropsWithChildren, useEffect } from "react";

import { Badge, BadgeProps } from "@mui/material";

import { TestName, useIsTestAnswered } from "../../reducers/testAnswerReducer";

interface TestAnswerBadgeProps extends BadgeProps{
    testName: TestName;
};

function TestAnswerBadge({ testName, children, ...props }: PropsWithChildren<TestAnswerBadgeProps>) {

    const isAnswered = useIsTestAnswered( testName );

    useEffect(()=>{
        console.log(`[TestAnswerBadge] testName=${testName} isAnswered=${isAnswered}`);
    }, []);

    return (
        <Badge invisible={isAnswered} {...props} variant="dot" color="primary">
            { children }
        </Badge>
    );
}
export default TestAnswerBadge;