// import { Chip, Stack } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { SetTestName, TestName, addTagAnswer, useTagSetAnswer } from "../../reducers/testAnswerReducer";
// import { useStrings } from "../../texts";
// import TagSetTestAnswerChip from "./TagSetTestAnswerChip";
// import { TEST_SECTIONS } from "../../common/app-const";

// interface TagSetTestContentProps {
//     testName : SetTestName
// };

// const TagSetTestContent = ({ testName }: TagSetTestContentProps) => {

//     const selectedTagSet = useTagSetAnswer( testName );

//     return (
//         <>
//             <h3 className="typography-label">
//                 {strings.test[testName as SetTestName].title}
//             </h3>
//             <Stack flexWrap={"wrap"}>
//                 {
//                     selectedTagSet.map((tag) => (
//                         <TagSetTestAnswerChip testName={testName} tag={tag} selected={true} />
//                     ))
//                 }
//             </Stack>
//             <Stack flexWrap={"wrap"}>
//                 {
//                     selectedTagSet.map((tag) => (
//                         <TagSetTestAnswerChip testName={testName} tag={tag} selected={true} />
//                     ))
//                 }
//             </Stack>
//         </>
//     )
// };

// export default TagSetTestContent;
