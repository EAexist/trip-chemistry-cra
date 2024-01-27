/* React */
import { useEffect, useRef, useState } from "react";

/* React Packages */

import { useNavigate } from "react-router-dom";
import { AppBar, Backdrop, Button, ButtonBase, Card, CardContent, CardMedia, Paper, Stack, ToggleButtonGroup, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

/* (Swiper) */
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

/* App */
import '../styles/index.css';
// import '../styles/Test.css';
// import '../styles/TopNav.css';

import { RootState } from "../store";
import { CITY, NATION, SLIDERPROPS_BUDGET_FOOD, TEST } from "../common/app-const";
import { useStrings } from "../texts";

import AnswerButtonGroup from "../components/AnswerButtonGroup";
import { priceText } from "../utils/priceText";
import AnswerSlider from "../components/AnswerSlider";
import getImgSrc, { FORMATPNG, FORMATWEBP } from "../utils/getImgSrc";
import StepContainer from "../components/Step/StepContainer";
import PngIcon from "../components/PngIcon";
import SectionButton from "../components/Button/SectionButton";
import { SWIPERPROPS_TOPNAV, SWIPERPROPS_CAROUSEL, SWIPERPROPS_FOODCARDCAROUSEL } from "../common/swiperProps";
import { SectionPaperWithStep } from "../components/Paper/SectionPaper";
import ImageCard from "../components/Card/ImageCard";
import GoogleMap from "../components/GoogleMap/ui/GoogleMap";
import { OPTIONS_TEST_SCHEDULE } from "../components/GoogleMap/common/options";
import TestInstructionModal from "../components/TestInstructionModal";
import GoogleMapMarker from "../components/GoogleMap/ui/GoogleMapMarker";
import OptionCard from "../components/Card/OptionCard";
import GoogleMapContext from "../components/GoogleMap/common/GoogleMapContext";
import SectionButtonGroup from "../components/Button/SectionButtonGroup";
import { usePutResponse, useTestAnswerStatus } from "../reducers/testAnswerReducer";

interface TestContentProps {

};

const userName ="디클1234";

function TestContent({ }: TestContentProps) {

    const navigate = useNavigate();
    
    /* Swiper */
    const autoPlayDelay = 2000;

    const sectionIdToIndex = Object.fromEntries(Object.values(TEST).map(({ subTests }) => Object.keys(subTests)).flat().map((value, index) => [value, index]));

    /* strings */
    const strings = useStrings().public.contents.test;
    const commonStrings = useStrings().public.common;

    /* Store */
    const isAllTestAnswered = Object.values(useSelector((state: RootState) => state.testAnswer.data)).map(object => (
        Object.values(object).every(v => v !== undefined)
    )
    ).every(v => v === true);

    const leadershipAnswer = useSelector((state: RootState) => state.testAnswer.data.leadership.leadership);
    const scheduleAnswer = useSelector((state: RootState) => state.testAnswer.data.schedule.schedule);
    const foodAnswer = useSelector((state: RootState) => state.testAnswer.data.budget.food);
    
    const [ testAnswerLoadStatus ] = useTestAnswerStatus(); 
    const putResponse = usePutResponse();

    /* States */
    const foodCarouselSwiperRef = useRef<SwiperRef>(null);
    const [scheduleExampleMap, setScheduleExampleMap] = useState<google.maps.Map | null>();
    const [isConfirmTooltipOpen, setIsConfirmTooltipOpen] = useState(false);


    /* Event Handlers */
    const handleFoodCardClick = (foodId: string) => {

    };
    const handleCityCardClick = (key: string, cityIndex: number) => {
        navigate(`/test/city/${key}`, { state: { initialIndex: cityIndex } });
    };
    const handleConfirmTooltipOpen = () => {
        if (!isAllTestAnswered) {
            setIsConfirmTooltipOpen(true);
        }
    };
    const handleConfirmButtonClick = () => {
        putResponse(userName)
            .then(()=>{                
                testAnswerLoadStatus && navigate('/result');
            });
    }

    /* Side Effects */
    useEffect(() => {
        if (foodAnswer !== undefined) {
            foodCarouselSwiperRef.current?.swiper.slideTo(Object.keys(TEST.budget.subTests.food.examples).indexOf(String(foodAnswer)));
        }
    }, [foodAnswer])

    /* Test Answer Side Effects */
    useEffect(() => {
        if (scheduleAnswer !== undefined) {
            if ((scheduleExampleMap !== undefined) && (scheduleExampleMap !== null)) {
                let { zoom, center } = TEST.schedule.subTests.schedule.examples[scheduleAnswer as keyof typeof TEST.schedule.subTests.schedule.examples];
                scheduleExampleMap.setZoom(zoom);
                scheduleExampleMap.panTo(center);
            }
        }
    }, [scheduleAnswer, scheduleExampleMap])


    return (
        <div className="page">
            <StepContainer idToIndex={sectionIdToIndex}>
                <div className="top-nav">
                    <SectionButtonGroup>
                        <Swiper {...SWIPERPROPS_TOPNAV} className="top-nav__swiper">
                            {
                                Object.entries(TEST).map(([_, { subTests }], index) =>
                                    <>
                                        {
                                            Object.entries(subTests).map(([subIndex, { icon, sectionIndex }], index) =>
                                                <SwiperSlide key={subIndex} className="top-nav__swiper">
                                                    <SectionButton value={sectionIndex} index={sectionIndex} label={strings.subTest[subIndex as keyof typeof strings.subTest].label}>
                                                        <PngIcon name={subIndex} />
                                                    </SectionButton>
                                                </SwiperSlide>
                                            )
                                        }
                                    </>
                                )
                            }
                        </Swiper>
                    </SectionButtonGroup>
                </div>
                <div className="top-nav__placeholder"/>
                <div className="content__body content__body--gray">
                    <SectionPaperWithStep id={"leadership"}>
                        <div className="modal__container">
                            <TestInstructionModal testIndex={{ index: "leadership", subIndex: "leadership" }} />
                            <Stack spacing={-4}>
                                {
                                    Object.entries(strings.subTest.leadership.options).map(([value, { detail }]) => (
                                        <OptionCard isActive={Number(value) === leadershipAnswer}>

                                            {(Number(value) === leadershipAnswer) &&
                                                <CardContent sx={{ textAlign: 'center' }}>
                                                    <p className="detail-text">{ detail }</p>
                                                </CardContent>}

                                            <CardMedia
                                                component="img"
                                                alt={value}
                                                height={"100%"}
                                                image={getImgSrc("/character", `leadership_${value}`, FORMATPNG)}
                                            />
                                        </OptionCard>
                                    ))
                                }
                            </Stack>
                        </div>
                        <div className="test__title">
                            <h3 className="test__title__text">{strings.test.leadership.title}</h3>
                        </div>
                        <AnswerButtonGroup testIndex={{ index: "leadership", subIndex: "leadership" }} />
                    </SectionPaperWithStep>
                    <SectionPaperWithStep id={"schedule"}>
                        <Card className="test__google-map-container modal__container">
                            <TestInstructionModal testIndex={{ index: "schedule", subIndex: "schedule" }} />
                            {/* <CardMedia> */}
                            <GoogleMapContext.Provider value={{ map: scheduleExampleMap as google.maps.Map, setMap: setScheduleExampleMap }}>
                                <GoogleMap opts={OPTIONS_TEST_SCHEDULE}>
                                    <GoogleMapMarker {...TEST.schedule.subTests.schedule.airportPlace} />
                                    {
                                        (scheduleAnswer !== undefined) &&
                                        Object.entries(TEST.schedule.subTests.schedule.examples).map(([value, { places }]) => (
                                            places.map((place) => (
                                                <GoogleMapMarker {...place} isActive={Number(value) <= scheduleAnswer} />
                                            ))
                                        ))
                                    }
                                </GoogleMap>
                            </GoogleMapContext.Provider>
                            {/* </CardMedia> */}
                        </Card>
                        <div className="test__title">
                            <h3 className="test__title__text">{strings.test.schedule.title}</h3>
                        </div>
                        <AnswerButtonGroup testIndex={{ index: "schedule", subIndex: "schedule" }} />
                    </SectionPaperWithStep>
                    <SectionPaperWithStep id={"food"} sx={{ overflow: "hidden" }}>
                        {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
                        <div className="food-carousel">
                            <Swiper {...SWIPERPROPS_FOODCARDCAROUSEL} className="food-carousel__swiper modal__container" ref={foodCarouselSwiperRef}>
                                <TestInstructionModal testIndex={{ index: "budget", subIndex: "food" }} />
                                {
                                    Object.values(TEST.budget.subTests.food.examples).map((foodId, index) => (
                                        <SwiperSlide key={foodId} className="food-carousel__swiper">
                                            {({ isActive }) => (
                                                <ButtonBase onClick={() => handleFoodCardClick(foodId)} disabled={!isActive} >
                                                    <div>
                                                        <ImageCard sx={{ width: "180px", height: "196px", borderRadius: "4px" }} className="food-carousel__coverflow">
                                                            <CardMedia
                                                                component="img"
                                                                alt={foodId}
                                                                height={"100%"}
                                                                image={getImgSrc("/food", foodId, FORMATWEBP)}
                                                            />
                                                        </ImageCard>
                                                        <div className="food-carousel__escape-coverflow__container">
                                                            <h3 className="card__title__text food-carousel__escape-coverflow"> {commonStrings.food[foodId as keyof typeof commonStrings.food].name}</h3>
                                                        </div>
                                                    </div>
                                                </ButtonBase>
                                            )}
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                        <div className="test__title">
                            <h3 className="test__title__text">{strings.subTest.food.title}</h3>
                        </div>
                        {
                            foodAnswer !== undefined
                                ? <h4 className='test__answer'>
                                    {priceText(foodAnswer)} {(foodAnswer === SLIDERPROPS_BUDGET_FOOD.max) ? '이상' : ''}
                                </h4>
                                : <h4 className='test__answer'>? 원</h4>
                        }
                        <div className="container--center">
                            <AnswerSlider testIndex={{ index: "budget", subIndex: "food" }} {...SLIDERPROPS_BUDGET_FOOD} />
                        </div>
                    </SectionPaperWithStep>
                    {
                        Object.entries(TEST.city.subTests).map(([key, { examples }]) => (
                            <SectionPaperWithStep key={key} id={key} className="section">
                                {/* <h4 className='carousel__title'>{strings.subTest[key as keyof typeof strings.subTest].title}</h4> */}
                                <Swiper {...SWIPERPROPS_CAROUSEL} className="carousel__swiper">
                                    {
                                        examples.map((cityId, index) => (
                                            <SwiperSlide key={cityId} className="carousel__swiper">
                                                <ButtonBase onClick={() => handleCityCardClick(key, index)}>
                                                    <div className="body--full">
                                                        <ImageCard sx={{ width: "196px", height: "196px", borderRadius: "4px" }}>
                                                            <CardMedia
                                                                component="img"
                                                                alt={cityId}
                                                                height={"100%"}
                                                                image={getImgSrc("/city", cityId, FORMATWEBP)}
                                                            />
                                                        </ImageCard>
                                                        <Stack>
                                                            <h3 className="card__title">{commonStrings.city[cityId as keyof typeof commonStrings.city].name}</h3>
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
                                <div className="test__title">
                                    <h3 className="test__title__text">{strings.test.city.titleTextList.map((text) => (
                                        text === "/subIndex"
                                            ? strings.subTest[key as keyof typeof strings.subTest].title
                                            : (
                                                text === "/particle"
                                                    ? strings.subTest[key as keyof typeof strings.subTest].particle
                                                    : text
                                            )
                                    ))}</h3>
                                </div>
                                <AnswerButtonGroup testIndex={{ index: "city", subIndex: key }} />
                            </SectionPaperWithStep>
                        ))
                    }
                    <Tooltip
                        open={isConfirmTooltipOpen}
                        onClose={() => setIsConfirmTooltipOpen(false)}
                        onOpen={handleConfirmTooltipOpen}
                        title={strings.main.tooltip_completeTest}
                    >
                        <span className="body">
                            <Button
                                onClick={handleConfirmButtonClick}
                                disabled={!isAllTestAnswered}
                                variant="contained"
                            >
                                <p>{ strings.main.confirmButton }</p>
                            </Button>
                        </span>
                    </Tooltip>
                    <div />
                </div>
            </StepContainer>
        </div>
    );
}
export default TestContent;