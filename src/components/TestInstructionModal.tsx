import withTestAnswer, { WithTestAnswerProps } from "../hocs/withTestAnswer";
import { useStrings } from "../texts";

interface TestInstructionModalProps extends WithTestAnswerProps {

};

function TestInstructionModal({ testIndex, answer }: TestInstructionModalProps) {

    const strings = useStrings().public.contents.test.test;

    return (
        ( answer === undefined ) 
        ?
        <>
            <div className="backdrop"/>
            <div className="modal">
                <h4 className='test__instruction'>{strings[testIndex.index as keyof typeof strings].instruction}</h4>
            </div>
        </>
        :
        <></>

    );
}

export default withTestAnswer(TestInstructionModal);