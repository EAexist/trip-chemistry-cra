import { ComponentType } from "react";
import { TestIndex, useTestAnswer } from "../reducers/testAnswerReducer";
// import { BudgetResponse, SubTestName, TestAnswer, TestName } from "../interface/interfaces";

interface WithTestAnswerProps{
    testIndex: TestIndex,
    answer: number; 
    setAnswer: ( value: number ) => void;      
};

// interface WithTestAnswerHOCProps extends testIndex{
// };

/* HOC WithTestAnswer
    컴포넌트에 테스트 섹션 정보와 해당 정보에 대응하는 testAnswer 리듀서 state 와 setter 함수를 연결.   */
const withTestAnswer = <T extends WithTestAnswerProps>(WrappedComponent: ComponentType<T>) => 
    ( { testIndex, ...props }: Omit<T, keyof WithTestAnswerProps> & { testIndex: TestIndex }) => {
    
    const [ answer, setAnswer ] = useTestAnswer( testIndex as TestIndex );
    
    return (
        <WrappedComponent 
        {...{
            testIndex,
            answer,
            setAnswer: ( value: number ) => {
                console.log(`WithTestAnswer-value=${value}`); 
                setAnswer({
                    ...testIndex as TestIndex,
                    value,
            })}
        }}
            {...props as T}
        />
    );
}

export default withTestAnswer;
export type { WithTestAnswerProps };
