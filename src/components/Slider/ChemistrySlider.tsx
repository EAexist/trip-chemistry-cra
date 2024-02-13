import { Avatar, Popper, Slider, SliderOwnProps, SliderValueLabelProps, Stack, } from "@mui/material";
import { priceText } from "../../utils/priceText";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { TestIndex } from "../../reducers/testAnswerReducer";
import useProfileIdListByAnswer from "../../hooks/useProfileIdListByAnswer";
import ProfileAvatar from "../Avatar/ProfileAvatar";
import { useEffect, useRef } from "react";
import Tooltip from "../Tooltip";
import AvatarGroup from "../Avatar/AvatarGroup";

interface ChemistrySliderProps extends SliderOwnProps {
    testIndex: TestIndex
    min: number
    max: number
    step: number
};

interface ValueLabelComponentProps extends SliderValueLabelProps {
    testIndex: TestIndex;
}

const valueLabelComponent_ = (testIndex: TestIndex) => ({ value, children }: SliderValueLabelProps) => {

    const { userList, ascendingOrder } = useProfileIdListByAnswer(testIndex, value);
    const isEven = ascendingOrder % 2 === 0;

    return (
        <Tooltip open={true} placement={isEven ? "left" : "right"} className="slider__value-label" title={
            <Stack flexDirection={isEven ? "row-reverse" : "row"}>
                <h2 className="typography-label">{value}</h2>
                <AvatarGroup>
                    {
                        userList.map((id) => (
                            <ProfileAvatar id={id} />
                        ))
                    }
                </AvatarGroup>
            </Stack>
        }
        >
            {children}
        </Tooltip>
    );
}

const SliderValueLabel = ({ testIndex, value }: { testIndex: TestIndex, value: number }) => {

    const { userList } = useProfileIdListByAnswer(testIndex, value);

    return (
        userList.length > 0
            ? <Stack className="slider__value" >
                <h2 className="typography-label">{value}</h2>
                <AvatarGroup>
                    {
                        userList.map((id) => (
                            <ProfileAvatar id={id} />
                        ))
                    }
                </AvatarGroup>
            </Stack>
            : <div className="slider__value" />
    );
}

function ChemistrySlider({ testIndex, ...sliderOwnProps }: ChemistrySliderProps) {

    const budgetAnswerToProfiles = useValueToProfileIdList(testIndex);

    const marks = Array.from(
        { length: (sliderOwnProps.max - sliderOwnProps.min) / sliderOwnProps.step },
        (value, index) => sliderOwnProps.max - index * sliderOwnProps.step
    )

    return (
        <Stack alignItems={'stretch'}>
            <Stack alignItems={'stretch'} className="slider">
                <div className="flex" >
                    {
                        marks.map((value) => (
                            <h6 className="typography-marks body--centered" style={{ flexGrow: 1, transform: "translateY(-50%)", visibility: ((value % 10000 === 0) && !Object.keys(budgetAnswerToProfiles).includes(value.toString())) ? 'visible' : 'hidden' }}>
                                {(value)}
                            </h6>))
                    }
                </div>
                <Slider
                    sx={{
                        '& input[type="range"]': {
                            WebkitAppearance: 'slider-vertical',
                        },
                        height: 300,
                        zIndex: 1,
                    }}
                    disabled
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
                        <SliderValueLabel testIndex={testIndex} value={value} />
                    ))
                }
            </div>
        </Stack>
    );
}


export default ChemistrySlider;
export type { ChemistrySliderProps };