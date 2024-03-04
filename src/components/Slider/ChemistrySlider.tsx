import { Slider, SliderOwnProps, Stack } from "@mui/material";

import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import useProfileIdListByAnswer from "../../hooks/useProfileIdListByAnswer";
import AvatarProfile from "../Avatar/AvatarProfile";
import AvatarGroup from "../Avatar/AvatarGroup";
import { TestName } from "../../reducers/testAnswerReducer";
import { FriendProfileAvatar } from "../Avatar/ProfileAvatar";

interface ChemistrySliderProps extends SliderOwnProps {
    testName: TestName
    min: number
    max: number
    step: number
};

const SliderValueLabel = ({ testName, value }: { testName: TestName, value: number }) => {

    const { userList } = useProfileIdListByAnswer(testName, value);

    return (
        userList.length > 0
            ? <Stack className="slider__value" >
                <h2 className="typography-label">{value}</h2>
                <Stack spacing={-0.25}>
                    {
                        userList.map((id) => (
                            <FriendProfileAvatar id={id} />
                        ))
                    }
                </Stack>
            </Stack>
            : <div className="slider__value" />
    );
}

function ChemistrySlider({ testName, ...sliderOwnProps }: ChemistrySliderProps) {

    const budgetAnswerToProfiles = useValueToProfileIdList(testName);

    const marks = Array.from(
        { length: (sliderOwnProps.max - sliderOwnProps.min) / sliderOwnProps.step + 1 },
        (value, index) => sliderOwnProps.max - index * sliderOwnProps.step
    )

    return (
        <Stack alignItems={'stretch'}>
            <Stack alignItems={'stretch'} className="slider">
                {/* <div className="flex" >
                    {
                        marks.slice(0, marks.length-1).map((value) => (
                            <h6 className="typography-marks body--centered" 
                                style={{ 
                                    flexGrow: 1, 
                                    transform: "translateY(-50%)", 
                                    visibility: (
                                            (value % 10000 === 0) 
                                            // && !Object.keys(budgetAnswerToProfiles).includes(value.toString())
                                        )
                                        ? 'visible' : 'hidden' 
                                }}>
                                {(value)}
                            </h6>))
                    }
                </div> */}
                <Slider
                    sx={{
                        '& input[type="range"]': {
                            WebkitAppearance: 'slider-vertical',
                        },
                        height: 300,
                        zIndex: 1,
                    }}
                    // disabled
                    orientation="vertical"
                    size="small"
                    value={Object.keys(budgetAnswerToProfiles).map((answer) => Number(answer))}
                    marks
                    {...sliderOwnProps}
                />
            </Stack>
            <div className="flex">
                {
                    marks.map((value) => (
                        <SliderValueLabel testName={testName} value={value} />
                    ))
                }
            </div>
        </Stack>
    );
}

export default ChemistrySlider;
export type { ChemistrySliderProps };


// interface ValueLabelComponentProps extends SliderValueLabelProps {
//     testName: TestName;
// }

// const valueLabelComponent_ = (testName: TestName) => ({ value, children }: SliderValueLabelProps) => {

//     const { userList, ascendingOrder } = useProfileIdListByAnswer(testName, value);
//     const isEven = ascendingOrder % 2 === 0;

//     return (
//         <Tooltip open={true} placement={isEven ? "left" : "right"} className="slider__value-label" title={
//             <Stack flexDirection={isEven ? "row-reverse" : "row"}>
//                 <h2 className="typography-label">{value}</h2>
//                 <Stack>
//                     {
//                         userList.map((id) => (
//                             <AvatarProfile id={id} />
//                         ))
//                     }
//                 </Stack>
//             </Stack>
//         }
//         >
//             {children}
//         </Tooltip>
//     );
// }
