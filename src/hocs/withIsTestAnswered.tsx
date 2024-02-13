import { ComponentType } from "react";
import { useSelector } from "react-redux";

import { TestIndex } from "../reducers/testAnswerReducer";
import { RootState } from "../store";

interface WithIsTestAnsweredProps {
    isAnswered?: boolean;
};

const withIsTestAnswered = <T extends WithIsTestAnsweredProps>( WrappedComponent: ComponentType<T> ) =>
    ({ testIndex, ...props }: Omit<T, keyof WithIsTestAnsweredProps> & { testIndex: TestIndex }) => {

        const isAnswered = useSelector(( state:RootState )=>(state.testAnswer.data[testIndex.index][testIndex.subIndex]) !== undefined )

        return (
            <WrappedComponent
                {...{
                    testIndex,
                    isAnswered: isAnswered,
                }}
                {...props as unknown as T}
            />
        );
    }

export default withIsTestAnswered;
export type { WithIsTestAnsweredProps };
