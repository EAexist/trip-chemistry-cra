import { ComponentType } from "react";

import { TestName, useIsTestAnswered } from "../reducers/testAnswerReducer";

interface WithIsTestAnsweredProps {
    testName?: string;
    isAnswered?: boolean;
};

const withIsTestAnswered = <T extends WithIsTestAnsweredProps>( WrappedComponent: ComponentType<T> ) =>
    ({ testName, ...props }: Omit<T, keyof WithIsTestAnsweredProps> & { testName: TestName }) => {

        const isAnswered = useIsTestAnswered( testName );

        return (
            <WrappedComponent
                {...{
                    testName,
                    isAnswered: isAnswered,
                }}
                {...props as unknown as T}
            />
        );
    }

export default withIsTestAnswered;
export type { WithIsTestAnsweredProps };
