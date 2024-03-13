/* React */
import { useEffect, useRef, useState } from "react";

/* React Packages */

import { Button, ButtonBase, Card, CardContent, CardMedia, Icon, List, ListItem, ListItemButton, ListItemText, Stack, Tooltip, useTheme } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* Swiper */
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

/* App */
import '../../styles/index.css';
// import '../styles/Test.css';
// import '../styles/TopNav.css';

import { CITY, LINK, NATION, SLIDERPROPS_TEST_BUDGET_FOOD, TEST, TEST_SECTIONS } from "../../common/app-const";
import { AppDispatch, RootState } from "../../store";
import { useStrings } from "../../texts";

import { SWIPERPROPS_CAROUSEL, SWIPERPROPS_FOODCARDCAROUSEL } from "../../common/swiperProps";
import SectionButton from "../../components/Button/SectionButton";
import TestAnswerBadge from "../../components/Button/TestAnswerBadge";
import AnswerButtonGroup from "../../components/ButtonGroup/AnswerButtonGroup";
import FoodImageCard from "../../components/Card/FoodImageCard";
import ImageCard from "../../components/Card/ImageCard";
import OptionCard from "../../components/Card/OptionCard";
import TagSetTestAnswerChip from "../../components/Chip/TagSetTestAnswerChip";
import GoogleMapContext from "../../components/GoogleMap/common/GoogleMapContext";
import { OPTIONS_TEST_SCHEDULE } from "../../components/GoogleMap/common/options";
import GoogleMap from "../../components/GoogleMap/ui/GoogleMap";
import GoogleMapMarker from "../../components/GoogleMap/ui/GoogleMapMarker";
import Logo from "../../components/Logo";
import PngIcon from "../../components/PngIcon";
import ScrollPageContainer from "../../components/ScrollPage/ScrollPageContainer";
import ScrollPageItem from "../../components/ScrollPage/ScrollPageItem";
import AnswerSlider from "../../components/Slider/AnswerSlider";
import { StepCheckpointContextProvider } from "../../components/Step/StepCheckpointContext";
import StepContext from "../../components/Step/StepContext";
import Stepper from "../../components/Step/Stepper";
import TestInstruction from "../../components/TestInstruction";
import TestSection from "../../components/TestSection";
import { useGetProfile } from "../../reducers/authReducer";
import { NumericTestName, SetTestName, TestName, useIsAllTestAnswered, useSubmitAnswer, useTestAnswerStatus } from "../../reducers/testAnswerReducer";
import getImgSrc, { FORMATPNG, FORMATWEBP } from "../../utils/getImgSrc";
import { priceText } from "../../utils/priceText";
import LoadContent, { AuthLoadContent } from "../LoadContent";
import { FADEIN } from "../../motion/props";

interface TestContentProps {

};

function TestContent({ }: TestContentProps) {

    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();

    /* contentstrings */
    const contentstrings = useStrings().public.contents.test;
    const commonStrings = useStrings().public.common;

    /* Reducers */
    const isAllTestAnswered = useIsAllTestAnswered();
    const leadershipAnswer = useSelector((state: RootState) => state.testAnswer.data.leadership);
    const scheduleAnswer = useSelector((state: RootState) => state.testAnswer.data.schedule) as number;
    const foodAnswer = useSelector((state: RootState) => state.testAnswer.data.food) as number;

    const getProfile = useGetProfile();
    const submitAnswer = useSubmitAnswer();
    const [submitStatus, setSubmitStatus] = useTestAnswerStatus();

    /* States */
    const foodCarouselSwiperRef = useRef<SwiperRef>(null);
    const [scheduleExampleMap, setScheduleExampleMap] = useState<google.maps.Map | null>();
    const [isConfirmTooltipOpen, setIsConfirmTooltipOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [showScrollDownIcon, setShowScrollDownIcon] = useState(true);

    /* 첫 렌더 후 Scroll Resotration 중에 Top Nav 가 슬라이드 되는 모션을 방지함. */
    const [ preventInitialSwipe, setPreventInitialSwipe ] = useState(true);

    /* Event Handlers */
    const handleFoodImageCardClick = (id: string) => {

    };

    const handleCityCardClick = (key: string, cityIndex: number) => {
        navigate(`../city/${key}`, { state: { initialIndex: cityIndex } });
    };

    const handleConfirmTooltipOpen = () => {
        if (!isAllTestAnswered) {
            setIsConfirmTooltipOpen(true);
        }
    };

    const handleConfirmButtonClick = () => {
        submitAnswer();
    }

    const handleSubmitSuccess = getProfile;
    const handleLoadSuccess = () => {
        navigate('../result');
    }
    // const handleFail = () => {
    //     navigate('test');
    // }

    /* Side Effects */

    /* Test Answer Side Effects */
    useEffect(() => {
        if (foodAnswer !== undefined) {
            foodCarouselSwiperRef.current?.swiper.slideTo(Object.keys(TEST.food.examples).indexOf(String(foodAnswer)));
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


    /* Motion */
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log(`[TestContent] ScrollY Change`);
        if (scrollY.get() > window.innerHeight) {
            setShowScrollDownIcon(false);
        }
        else {
            setShowScrollDownIcon(true);
        }
    })

    /* 첫 렌더 후 100ms 동안 Top Nav의 애니메이션 비활성화 */
    useEffect(() => {
        const timer = setTimeout(() => {
            setPreventInitialSwipe(false);
        }, 100);
      }, []);

    return (
        <LoadContent {...{
            status: submitStatus,
            setStatus: setSubmitStatus,
            handleSuccess: handleSubmitSuccess,
        }}>
            <AuthLoadContent {...{
                handleSuccess: handleLoadSuccess,
            }}>
                <div className="page">
                    <StepContext.Provider value={{ step, setStep }}>
                        <StepCheckpointContextProvider>
                            <div className="top-nav" style={{ backgroundColor: theme.palette.gray.light }}>
                            <motion.div {...FADEIN}  custom={0.2} >
                                <Stepper className="block--with-margin-x top-nav__swiper" speed={preventInitialSwipe ? 0 : 500}>
                                    {
                                        Object.entries( TEST_SECTIONS ).map(([testName, { icon }], index) =>
                                            <SwiperSlide key={testName} className="top-nav__swiper">
                                                <TestAnswerBadge testName={testName as TestName} sx={{ height: "100%" }}>
                                                    <SectionButton
                                                        size={"small"}
                                                        value={index}
                                                        index={index}
                                                        label={contentstrings.subTest[testName as keyof typeof contentstrings.subTest].label}
                                                        sx={{ height: "100%", display: 'flex', alignItems: 'start', paddingTop: '8px' }}
                                                        paperSx={{ opacity: 0.4 }}
                                                        elevation={1}
                                                    // className="button-group__item"
                                                    >
                                                        <PngIcon name={testName} />
                                                    </SectionButton>
                                                </TestAnswerBadge>
                                            </SwiperSlide>
                                        )
                                    }
                                </Stepper>
                            </motion.div>
                            </div>
                            <ScrollPageContainer onPageChange={(page) => setStep(page)} pages={Object.keys(TEST_SECTIONS).length}>
                                {
                                    (["expectation", "activity"] as SetTestName[]).map((testName, index) => {
                                        return (
                                            <ScrollPageItem key={testName} page={index} className="flex">
                                                <TestSection>
                                                    {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
                                                    <div className="flex-grow body--centered">
                                                        <div className="block--with-margin-x block__body">
                                                            <TestInstruction testName={testName as TestName} />
                                                            <Stack flexWrap={"wrap"} justifyContent={"center"} rowGap={1}>
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
                                <ScrollPageItem page={3} className="flex">
                                    <TestSection >
                                        <div className="flex-grow body--centered">
                                            <Card className="test__google-map-container modal__container">
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
                                <ScrollPageItem page={4} className="flex">
                                    <TestSection >
                                        {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
                                        <div className="flex-grow body--centered">
                                            <Swiper {...SWIPERPROPS_FOODCARDCAROUSEL} className="carousel__swiper carousel__swiper__food modal__container" ref={foodCarouselSwiperRef}>
                                                <TestInstruction testName="food" showBackdrop={true} className="body--centered" />
                                                {
                                                    Object.values(TEST.food.examples).map((id, index) => (
                                                        <SwiperSlide key={id} className="carousel__swiper carousel__swiper__food">
                                                            {({ isActive }) => (
                                                                id === "more"
                                                                    ? (
                                                                        isActive
                                                                            ? <div style={{ width: "260px", height: "240px" }} className="body--centered block--with-padding">
                                                                                <div className="block-with-margin-x">
                                                                                    <p>더 많은 식당 찾아보기</p>
                                                                                    <List>
                                                                                        {
                                                                                            TEST.food.more.map((source) => (
                                                                                                <ListItem key={source}>
                                                                                                    <a href={LINK[source as keyof typeof LINK].link} target="_blank" rel="noopener noreferrer">
                                                                                                        <ListItemButton >
                                                                                                            <ListItemText
                                                                                                                primary={
                                                                                                                    <Stack>
                                                                                                                        <Logo id={source} />
                                                                                                                        <p>{commonStrings.linkType[source as keyof typeof commonStrings.linkType].name}</p>
                                                                                                                    </Stack>
                                                                                                                }
                                                                                                                secondary={
                                                                                                                    commonStrings.linkType[source as keyof typeof commonStrings.linkType].body
                                                                                                                }
                                                                                                            />
                                                                                                        </ListItemButton>
                                                                                                    </a>
                                                                                                </ListItem>
                                                                                            ))
                                                                                        }
                                                                                    </List>
                                                                                </div>
                                                                            </div>
                                                                            : <div style={{ width: "200px", height: "240px", position: "absolute", opacity: 0.5 }} className="body--centered">
                                                                                <p>
                                                                                    {`더 많은 식당\n찾아보기`}
                                                                                </p>
                                                                            </div>
                                                                    )
                                                                    : <FoodImageCard id={id} isActive={isActive} />
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
                                            <div className="container--center" style={{ marginTop: 0 }}>
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
                                                                    <ButtonBase onClick={() => handleCityCardClick(key, index)} className="body--full block__body">
                                                                        <ImageCard
                                                                            src={getImgSrc("/city", cityId, FORMATWEBP)}
                                                                            title={cityId}
                                                                            sx={{ width: "196px", height: "196px", borderRadius: "12px" }}
                                                                            className="body__head"
                                                                        />
                                                                        <Stack>
                                                                            <h3 className="typography-name">{commonStrings.city[cityId as keyof typeof commonStrings.city].name}</h3>
                                                                            {
                                                                                NATION[CITY[cityId as keyof typeof CITY].nation as keyof typeof NATION].flag
                                                                                && <span className={`fi fi-${CITY[cityId as keyof typeof CITY].nation}`}></span>
                                                                            }
                                                                        </Stack>
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
                            <div>
                            <Tooltip
                                open={isConfirmTooltipOpen}
                                onClose={() => setIsConfirmTooltipOpen(false)}
                                onOpen={handleConfirmTooltipOpen}
                                title={contentstrings.main.tooltip_completeTest}
                            >
                                <span className="block--with-margin flex">
                                    <Button
                                        onClick={handleConfirmButtonClick}
                                        disabled={!isAllTestAnswered}
                                        variant="contained"
                                        className="button--full"
                                    >
                                        {contentstrings.main.confirmButton}
                                    </Button>
                                </span>
                            </Tooltip>
                            </div>
                        </StepCheckpointContextProvider>
                    </StepContext.Provider>
                    {
                        showScrollDownIcon
                        &&
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{
                                duration: 4,
                                times:[0, 0.5, 1],
                                ease: "easeInOut",
                                repeat: Infinity,
                            }}
                            className="floating--bottom body--centered block--with-padding--sm"
                        >
                            <ExpandMore className="typography-gray" sx={{ fontSize: "40px" }} />
                        </motion.div>
                    }
                </div >
            </AuthLoadContent>
        </LoadContent>
    );
}
export default TestContent;