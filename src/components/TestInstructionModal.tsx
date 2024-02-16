// import { TEST_SECTIONS } from "../common/app-const";
// import { WithIsTestAnsweredProps } from "../hocs/withIsTestAnswered";
// import withTestAnswer, { WithTestAnswerProps } from "../hocs/withTestAnswer";
// import { NumericTestName, TestName, useIsTestAnswered } from "../reducers/testAnswerReducer";
// import { useStrings } from "../texts";

// interface TestInstructionModalProps extends WithIsTestAnsweredProps {
// };

// function TestInstructionModal({ isAnswered }: TestInstructionModalProps) {

//     return (
//         !isAnswered
//         ?
//         <>
//             <div className="backdrop"/>
//             <div className="modal">
//                 <h4 className='test__instruction typography-note'>{ instruction }</h4>
//             </div>
//         </>
//         :
//         <></>

//     );
// }

// export default withIsTestAnswered(TestInstructionModal);