/* React */
import { useEffect, useRef, useState } from "react";

/* React Packages */

import { useNavigate } from "react-router-dom";
import { AppBar, Backdrop, Button, ButtonBase, Card, CardContent, CardMedia, Chip, Paper, Stack, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

/* Swiper */
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

/* App */
import '../../styles/index.css';
// import '../styles/Test.css';
// import '../styles/TopNav.css';

import { RootState } from "../../store";
import { CITY, NATION, SLIDERPROPS_TEST_BUDGET_FOOD, TEST, TEST_SECTIONS } from "../../common/app-const";
import { useStrings } from "../../texts";

import AnswerButtonGroup from "../../components/AnswerButtonGroup";
import { priceText } from "../../utils/priceText";
import AnswerSlider from "../../components/Slider/AnswerSlider";
import getImgSrc, { FORMATPNG, FORMATWEBP } from "../../utils/getImgSrc";
import PngIcon from "../../components/PngIcon";
import SectionButton from "../../components/Button/SectionButton";
import { SWIPERPROPS_STEPPER, SWIPERPROPS_CAROUSEL, SWIPERPROPS_FOODCARDCAROUSEL } from "../../common/swiperProps";
import ImageCard from "../../components/Card/ImageCard";
import GoogleMap from "../../components/GoogleMap/ui/GoogleMap";
import { OPTIONS_TEST_SCHEDULE } from "../../components/GoogleMap/common/options";
import GoogleMapMarker from "../../components/GoogleMap/ui/GoogleMapMarker";
import OptionCard from "../../components/Card/OptionCard";
import GoogleMapContext from "../../components/GoogleMap/common/GoogleMapContext";
import SectionButtonGroup from "../../components/Button/SectionButtonGroup";
import { NumericTestName, SetTestName, TestName, useSubmitAnswer, useTestAnswerStatus } from "../../reducers/testAnswerReducer";
import ScrollPageItem from "../../components/ScrollPage/ScrollPageItem";
import { StepCheckpointContextProvider } from "../../components/Step/StepCheckpointContext";
import StepContext, { StepContextProvider } from "../../components/Step/StepContext";
import LoadContent from "../LoadContent";
import TestAnswerBadge from "../../components/Button/TestAnswerBadge";
import TestSection from "../../components/TestSection";
import ScrollPageContainer from "../../components/ScrollPage/ScrollPageContainer";
import TagSetTestAnswerChip from "../../components/Chip/TagSetTestAnswerChip";
import { Warning } from "@mui/icons-material";
import TestInstruction from "../../components/TestInstruction";
import Stepper from "../../components/Step/Stepper";
import { asyncGetProfile, useProfileLoadStatus } from "../../reducers/profileReducer";
import { useUserId } from "../../reducers/authReducer";
import { LoadStatus } from "../../reducers";

interface TestContentProps {

};

const userId = "디클1234";

function TestContent({ }: TestContentProps) {

    const navigate = useNavigate();

    /* contentstrings */
    const contentstrings = useStrings().public.contents.test;
    const commonStrings = useStrings().public.common;
    const strings = useStrings().public;

    /* Store */
    const isAllTestAnswered = Object.values(useSelector((state: RootState) => state.testAnswer.data)).every(v => v !== undefined);

    const leadershipAnswer = useSelector((state: RootState) => state.testAnswer.data.leadership);
    const scheduleAnswer = useSelector((state: RootState) => state.testAnswer.data.schedule) as number;
    const foodAnswer = useSelector((state: RootState) => state.testAnswer.data.food) as number;

    const userId = useUserId();
    const submitAnswer = useSubmitAnswer();
    const [submitStatus, setSubmitStatus] = useTestAnswerStatus();
    const [loadStatus, setLoadStatus] = useProfileLoadStatus( userId );

    /* States */
    const foodCarouselSwiperRef = useRef<SwiperRef>(null);
    const [scheduleExampleMap, setScheduleExampleMap] = useState<google.maps.Map | null>();
    const [isConfirmTooltipOpen, setIsConfirmTooltipOpen] = useState(false);
    const [step, setStep] = useState(0);

    /* Event Handlers */
    const handleSubmitSuccess = () => {
        asyncGetProfile({ id: userId });
    }

    const handleLoadSuccess = () => {
        navigate('/result');
        setSubmitStatus( LoadStatus.REST );
        setLoadStatus( LoadStatus.REST );        
    }
    const handleFail = () => {
        navigate('/test');
    }

    const handleFoodCardClick = (foodId: string) => {

    };

    const handleCityCardClick = (key: string, cityIndex: number) => {
        navigate(`/city/${key}`, { state: { initialIndex: cityIndex } });
    };

    const handleConfirmTooltipOpen = () => {
        if (!isAllTestAnswered) {
            setIsConfirmTooltipOpen(true);
        }
    };

    const handleConfirmButtonClick = () => {
        submitAnswer();
    }

    /* Side Effects */

    /* Test Answer Side Effects */
    useEffect(() => {
        if (foodAnswer !== undefined) {
            foodCarouselSwiperRef.current?.swiper.slideTo(Object.keys(TEST.budget.subTests.food.examples).indexOf(String(foodAnswer)));
        }
    }, [foodAnswer])

    useEffect(() => {
        if (scheduleAnswer !== undefined) {
            if ((scheduleExampleMap !== undefined) && (scheduleExampleMap !== null)) {
                let { zoom, center } = TEST.schedule.subTests.schedule.examples[scheduleAnswer as keyof typeof TEST.schedule.subTests.schedule.examples];
                scheduleExampleMap.setZoom(zoom);
                scheduleExampleMap.panTo(center);
            }
        }
    }, [scheduleAnswer, scheduleExampleMap]);

    return (
        <LoadContent {...{
            status: submitStatus,
            setStatus: setSubmitStatus,
            handleSuccess: handleSubmitSuccess,
            handleFail,
        }}>
            <LoadContent {...{
                status: loadStatus,
                setStatus: setLoadStatus,
                handleSuccess: handleLoadSuccess,
                handleFail,
            }}>
                <div className="page">
                    <StepContext.Provider value={{ step, setStep }}>
                        <StepCheckpointContextProvider>
                            <div className="top-nav">
                                <Stepper>
                                    {
                                        Object.entries(TEST_SECTIONS).map(([testName, { icon }], index) =>
                                            <SwiperSlide key={testName} className="top-nav__swiper">
                                                <TestAnswerBadge testName={testName as TestName}>
                                                    <SectionButton
                                                        size={"small"}
                                                        value={index}
                                                        index={index}
                                                        label={contentstrings.subTest[testName as keyof typeof contentstrings.subTest].label}
                                                        sx={{ opacity: 0.4 }}
                                                    >
                                                        <PngIcon name={testName} />
                                                    </SectionButton>
                                                </TestAnswerBadge>
                                            </SwiperSlide>
                                        )
                                    }
                                </Stepper>
                            </div>
                            <ScrollPageContainer onPageChange={(page) => setStep(page)}>
                                {
                                    (["expectation", "activity"] as SetTestName[]).map((testName, index) => {
                                        return (
                                            <ScrollPageItem page={index} className="flex">
                                                <TestSection>
                                                    {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
                                                    <div className="flex-grow body--centered">
                                                        <div className="block--with-margin-x block__body">
                                                            <TestInstruction testName={testName as TestName} />
                                                            <Stack flexWrap={"wrap"} justifyContent={"center"}>
                                                                <TagSetTestAnswerChip testName={testName} />
                                                                <TagSetTestAnswerChip testName={testName} selected={false} />
                                                            </Stack>
                                                        </div>
                                                    </div>
                                                    <div className="block">
                                                        <div className="test__title">
                                                            <h2 className="test__title__heading typography-heading">{contentstrings.subTest[testName].title}</h2>
                                                        </div>
                                                        <div className="test__input">
                                                        </div>
                                                    </div>
                                                </TestSection>
                                            </ScrollPageItem>
                                        )
                                    })
                                }
                                <ScrollPageItem page={2} className="flex">
                                    <TestSection>
                                        <div className="modal__container flex-grow">
                                            {/* <TestInstructionModal testName="leadership" /> */}
                                            <Stack spacing={-4}>
                                                {
                                                    Object.entries(contentstrings.subTest.leadership.options).map(([value, { detail }]) => (
                                                        <OptionCard key={value} isActive={Number(value) === leadershipAnswer}>

                                                            {(Number(value) === leadershipAnswer) &&
                                                                <CardContent sx={{ textAlign: 'center' }}>
                                                                    <div className="text">
                                                                        <p>{detail}</p>
                                                                    </div>
                                                                </CardContent>}

                                                            <CardMedia
                                                                component="img"
                                                                alt={value}
                                                                height={"100%"}
                                                                image={getImgSrc("/test", `leadership_${value}`, FORMATPNG)}
                                                            />
                                                        </OptionCard>
                                                    ))
                                                }
                                            </Stack>
                                        </div>
                                        <div className="block block__body">
                                            <div className="test__title">
                                                <h2 className="test__title__heading typography-heading">{contentstrings.test.leadership.title}</h2>
                                            </div>
                                            <AnswerButtonGroup testName="leadership" />
                                            <div />
                                        </div>
                                    </TestSection>
                                </ScrollPageItem>
                                {/* <}
                    {/* <SectionPaperWithStep index={0} className="content__block"> */}
                                <ScrollPageItem page={3} className="flex">
                                    <TestSection >
                                        <div className="flex-grow body--centered">
                                            <Card className="test__google-map-container modal__container">
                                                {/* <TestInstructionModal testName="schedule" /> */}
                                                {/* <CardMedia> */}
                                                <GoogleMapContext.Provider value={{ map: scheduleExampleMap as google.maps.Map, setMap: setScheduleExampleMap }}>
                                                    <GoogleMap opts={OPTIONS_TEST_SCHEDULE}>
                                                        <GoogleMapMarker {...TEST.schedule.subTests.schedule.airportPlace} />
                                                        {
                                                            (scheduleAnswer !== undefined) &&
                                                            Object.entries(TEST.schedule.subTests.schedule.examples).map(([value, { places }]) => (
                                                                places.map((place) => (
                                                                    <GoogleMapMarker key={place.label} {...place} isActive={Number(value) <= scheduleAnswer} />
                                                                ))
                                                            ))
                                                        }
                                                    </GoogleMap>
                                                </GoogleMapContext.Provider>
                                                {/* </CardMedia> */}
                                            </Card>
                                        </div>
                                        <div className="block block__body">
                                            <div className="test__title">
                                                <h2 className="test__title__heading typography-heading">{contentstrings.test.schedule.title}</h2>
                                            </div>
                                            <AnswerButtonGroup testName="schedule" />
                                            <div />
                                        </div>
                                    </TestSection>
                                </ScrollPageItem>
                                {/* </SectionPaperWithStep> */}
                                {/* <SectionPaperWithStep index={0} sx={{ overflow: "hidden" }} className="content__block"> */}
                                <ScrollPageItem page={4} className="flex">
                                    <TestSection >
                                        {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
                                        <div className="flex-grow body--centered">
                                            <Swiper {...SWIPERPROPS_FOODCARDCAROUSEL} className="carousel__swiper carousel__swiper__food modal__container" ref={foodCarouselSwiperRef}>
                                                {/* <TestInstructionModal testName="food" /> */}
                                                {/* <div className="modal modal--withBackdrop body--centered"> */}
                                                <TestInstruction testName="food" showBackdrop={true} className="body--centered" />
                                                {/* </div> */}
                                                {
                                                    Object.values(TEST.budget.subTests.food.examples).map((foodId, index) => (
                                                        <SwiperSlide key={foodId} className="carousel__swiper carousel__swiper__food">
                                                            {({ isActive }) => (
                                                                <ButtonBase onClick={() => handleFoodCardClick(foodId)} disabled={!isActive} >
                                                                    <div>
                                                                        <ImageCard src={getImgSrc("/food", foodId, FORMATWEBP)} title={foodId} sx={{ width: "180px", height: "196px", borderRadius: "4px" }} className="food-carousel__coverflow" />
                                                                        <div className="carousel__escape-coverflow__container">
                                                                            <h3 className="typography-name card__title__text carousel__escape-coverflow"> {commonStrings.food[foodId as keyof typeof commonStrings.food].name}</h3>
                                                                        </div>
                                                                    </div>
                                                                </ButtonBase>
                                                            )}
                                                        </SwiperSlide>
                                                    ))
                                                }
                                            </Swiper>
                                        </div>
                                        <div className="block block__body">
                                            <div className="test__title">
                                                <h2 className="test__title__heading typography-heading">{contentstrings.subTest.food.title}</h2>
                                            </div>
                                            {
                                                foodAnswer !== undefined
                                                    ? <h4 className='test__answer'>
                                                        {priceText(foodAnswer)} {(foodAnswer === SLIDERPROPS_TEST_BUDGET_FOOD.max) ? '이상' : ''}
                                                    </h4>
                                                    // : <h4 className='test__answer'>? 원</h4>
                                                    : <></>
                                            }
                                            <div className="container--center">
                                                <AnswerSlider testName="food" {...SLIDERPROPS_TEST_BUDGET_FOOD} />
                                            </div>
                                            <div />
                                        </div>
                                    </TestSection>
                                </ScrollPageItem>
                                {/* </SectionPaperWithStep> */}
                                {
                                    Object.entries(TEST.city.subTests).map(([key, { examples }], index) => (
                                        // <SectionPaperWithStep key={key} index={0e="section">
                                        <ScrollPageItem page={5 + index} className="flex">
                                            <TestSection >
                                                <div className="flex-grow body--centered">
                                                    {/* <h4 className='carousel__title'>{contentstrings.subTest[key as keyof typeof contentstrings.subTest].title}</h4> */}
                                                    <Swiper {...SWIPERPROPS_CAROUSEL} className="carousel__swiper">
                                                        {
                                                            examples.map((cityId, index) => (
                                                                <SwiperSlide key={cityId} className="carousel__swiper">
                                                                    <ButtonBase onClick={() => handleCityCardClick(key, index)}>
                                                                        <div className="body--full">
                                                                            <ImageCard src={getImgSrc("/city", cityId, FORMATWEBP)} title={cityId} sx={{ width: "196px", height: "196px", borderRadius: "4px" }} />
                                                                            <Stack>
                                                                                <h3 className="typography-name">{commonStrings.city[cityId as keyof typeof commonStrings.city].name}</h3>
                                                                                {
                                                                                    NATION[CITY[cityId as keyof typeof CITY].nation as keyof typeof NATION].flag
                                                                                    && <span className={`fi fi-${CITY[cityId as keyof typeof CITY].nation}`}></span>
                                                                                }
                                                                            </Stack>
                                                                        </div>
                                                                    </ButtonBase>
                                                                </SwiperSlide>
                                                            ))
                                                        }
                                                    </Swiper>
                                                </div>
                                                <div className="block block__body">
                                                    <div className="test__title">
                                                        <h2 className="test__title__heading typography-heading">{contentstrings.test.city.titleTextList.map((text) => (
                                                            text === "/testName"
                                                                ? contentstrings.subTest[key as keyof typeof contentstrings.subTest].title
                                                                : (
                                                                    text === "/particle"
                                                                        ? contentstrings.subTest[key as keyof typeof contentstrings.subTest].particle
                                                                        : text
                                                                )
                                                        ))}</h2>
                                                    </div>
                                                    <AnswerButtonGroup testName={key as NumericTestName} />
                                                    <div />
                                                </div>
                                            </TestSection>
                                        </ScrollPageItem>
                                    ))
                                }
                            </ScrollPageContainer>
                            <Tooltip
                                open={isConfirmTooltipOpen}
                                onClose={() => setIsConfirmTooltipOpen(false)}
                                onOpen={handleConfirmTooltipOpen}
                                title={contentstrings.main.tooltip_completeTest}
                            >
                                <span className="block--with-margin-x flex">
                                    <Button
                                        onClick={handleConfirmButtonClick}
                                        disabled={!isAllTestAnswered}
                                        variant="contained"
                                    >
                                        <p>{contentstrings.main.confirmButton}</p>
                                    </Button>
                                </span>
                            </Tooltip>
                            <div className="block__body">
                                <div />
                            </div>
                        </StepCheckpointContextProvider>
                    </StepContext.Provider>
                </div >
            </LoadContent>
        </LoadContent>
    );
}
export default TestContent;