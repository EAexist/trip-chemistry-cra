/* React */
import { useState } from "react";

/* React Packages */
import { useLocation, useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, CardContent, Divider, Icon, IconButton, Rating, Stack, Toolbar } from "@mui/material";
import { ArrowRight, Close, ExpandMore, ThumbUp } from "@mui/icons-material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from "react-redux";

/* Trip Chemistry */
import { CITY, NATION, TEST } from "../common/app-const";
import { SWIPERPROPS_CITYDETAILCONTENT } from "../common/swiperProps";
import ImageCard from "../components/Card/ImageCard";
import Logo from "../components/Logo";
import PaginationDiv from "../components/PaginationDiv";
import { RootState } from "../store";
import { useStrings } from "../texts";
import getImgSrc, { FORMATWEBP } from "../utils/getImgSrc";
import { useCityChemistry, useIsChemistryEnabled } from "../reducers/tripReducer";
import FriendAvatar from "../components/Avatar/FriendAvatar";

interface CityDetailContentProps {
    cityClass: keyof typeof TEST.city.subTests;
};

function CityDetailContent({ cityClass }: CityDetailContentProps) {

    const navigate = useNavigate();
    const { state } = useLocation();

    const [expanded, setExpanded] = useState<boolean>(false);

    const isChemistryEnabled = useIsChemistryEnabled();

    /* Strings */
    const strings = useStrings().public.contents.test;
    const commonStrings = useStrings().public.common;

    /* Event Handlers */
    const handleClose = () => {
        navigate(-1);
    };

    const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    /* Store */
    const score = useCityChemistry(cityClass);
    const answerList = useSelector((state: RootState) =>
        isChemistryEnabled
            ? Object.entries(state.trip.data.profileList).map(([id, { testAnswer }]) => (
                { id: id, answer: testAnswer[cityClass] }
            ))
                .sort((a, b) => (b.answer as number) - (a.answer as number))
            : []
    )

    return (
        <div className="page">
            <AppBar>
                <Toolbar className="margin-x">
                    <IconButton
                        edge="start"
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <Close />
                    </IconButton>
                    <Stack>
                        <h5 className="typography-note">{strings.test.city.title}</h5>
                    </Stack>
                    <IconButton
                        edge="end"
                        disabled
                    >
                        <Icon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <div className="block--with-margin-x block__body">
                <h2 className="typography-heading">{strings.subTest[cityClass as keyof typeof strings.subTest].title}</h2>
            </div>
            {
                isChemistryEnabled &&
                <div className="block--with-margin-x">
                    <Accordion expanded={expanded} onChange={handleChange}>
                        <AccordionSummary
                            expandIcon={
                                <ExpandMore />
                            }
                            aria-controls="scores"
                            id="scores"
                            sx={{ padding: 0 }}
                        >
                            <Stack justifyContent={'space-between'} style={{ width: "100%" }}>
                                <Stack>
                                    <Rating value={score} readOnly precision={0.5} size={"small"} />
                                    <p>{Math.round(score * 10) / 10}</p>
                                    {
                                        (score > 3.4) &&
                                        <ThumbUp fontSize="inherit" />
                                    }
                                </Stack>
                                <p className="typography-note">
                                    {
                                        expanded
                                            ? "답변 접기"
                                            : "친구들의 답변 보기"
                                    }
                                </p>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: 0 }}>
                            {
                                answerList.map(({ id, answer }) => (
                                    <Stack>
                                        <FriendAvatar id={id} />
                                        <Rating value={Number(answer)} readOnly precision={0.5} size={"small"} />
                                        <p className="typography-note">{strings.test.city.answers[answer as keyof typeof strings.test.city.answers].label}</p>
                                    </Stack>
                                ))
                            }
                        </AccordionDetails>
                    </Accordion>
                </div>
            }
            <Divider variant="middle"/>
            <Swiper {...SWIPERPROPS_CITYDETAILCONTENT} initialSlide={state && state.initialIndex ? state.initialIndex : 0} className="page__swiper">
                <div slot="container-start" >
                    <PaginationDiv className='pageSwiper-pagination' sx={{ justifyContent: 'center' }} />
                </div>
                {
                    TEST.city.subTests[cityClass].examples.map((cityId) => (
                        <SwiperSlide key={cityId} className="">
                            <div className="block--with-margin-x block__body">
                                <ImageCard src={getImgSrc("/city", cityId, FORMATWEBP)} title={cityId} className="body__head" gradient="bottom" >
                                    <CardContent className="image-card__card-content" sx={{ height: "320px" }}>
                                        <Stack className="typography-white">
                                            <h2 className="typography-heading">{commonStrings.city[cityId as keyof typeof commonStrings.city].name}</h2>
                                            <h3 className="typography-heading">{cityId}</h3>
                                            {
                                                NATION[CITY[cityId as keyof typeof CITY].nation as keyof typeof NATION].flag
                                                && <span className={`fi fi-${CITY[cityId as keyof typeof CITY].nation}`}></span>
                                            }
                                        </Stack>
                                    </CardContent>
                                </ImageCard>
                                <h5 className="typography-label" style={{ marginTop: "1rem" }}>{commonStrings.city[cityId as keyof typeof commonStrings.city].intro}</h5>
                                <p>{commonStrings.city[cityId as keyof typeof commonStrings.city].body}</p>
                                <div>
                                    <a href={CITY[cityId as keyof typeof CITY].link} target="_blank" rel="noopener noreferrer" className="flex">
                                        <Button variant={"outlined"} className="button--full">
                                            <Stack>
                                                {
                                                    commonStrings.linkTextList.map((text) => (
                                                        text === "/link" ? commonStrings.linkType[CITY[cityId as keyof typeof CITY].linkType as keyof typeof commonStrings.linkType].name
                                                            : (text === "/city" ? commonStrings.city[cityId as keyof typeof commonStrings.city].name
                                                                : text
                                                            )
                                                    ))
                                                }
                                                <ArrowRight />
                                            </Stack>
                                        </Button>
                                    </a>
                                </div>
                                <Stack>
                                    <p className="typography-note">{commonStrings.reference}{commonStrings.linkType[CITY[cityId as keyof typeof CITY].linkType as keyof typeof commonStrings.linkType].name}</p>
                                    <Logo id={CITY[cityId as keyof typeof CITY].linkType} className="logo--md"/>
                                </Stack>
                                <div />
                            </div>
                        </SwiperSlide>
                    ))
                }
                {/* <NavigationButton navigateTo="prev" position="fixed" className="pageSwiper-prevEl" />
                <NavigationButton navigateTo="next" position="fixed" className="pageSwiper-nextEl" /> */}
            </Swiper>
        </div>
    );
}
export default CityDetailContent;