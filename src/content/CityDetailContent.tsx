import { ArrowRight, Close, ExpandMore, ThumbUp } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Icon, IconButton, Rating, Stack, Toolbar } from "@mui/material";

import { Swiper, SwiperSlide } from 'swiper/react';

import ImageCard from "../components/Card/ImageCard";
import { CITY, NATION, TEST } from "../common/app-const";
import NavigationButton from "../components/Button/NavigationButton";
import getImgSrc, { FORMATWEBP } from "../utils/getImgSrc";
import { SWIPERPROPS_CITYDETAILCONTENT } from "../common/swiperProps";
import { useLocation, useNavigate } from "react-router-dom";
import { useStrings } from "../texts";
import { useState } from "react";
import { useCityChemistry, useIsChemistryUpdated } from "../reducers/chemistryReducer";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import ProfileAvatar from "../components/Avatar/ProfileAvatar";
import PaginationDiv from "../components/PaginationDiv";

interface CityDetailContentProps {
    cityClass: keyof typeof TEST.city.subTests;
};

function CityDetailContent({ cityClass }: CityDetailContentProps) {

    const navigate = useNavigate();
    const { state } = useLocation();

    const [expanded, setExpanded] = useState<boolean>(false);

    const isChemistryUpdated = useIsChemistryUpdated();

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
        isChemistryUpdated
            ? Object.entries(state.profile.data).map(([id, { data: { testAnswer } }]) => (
                { id: id, answer: testAnswer.data[cityClass] }
            ))
            : []
    )

    return (
        <div className="page">
            <AppBar>
                <Toolbar className="margin-x--lg">
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <Close />
                    </IconButton>
                    {/* <div className="content__title"> */}
                    <Stack>
                        <h5 className="typography-note">{strings.test.city.title}</h5>
                    </Stack>
                    {/* </div> */}
                    <IconButton disabled>
                        <Icon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <div className="block--with-margin-x--lg block__body">
                <h2 className="typography-heading">{strings.subTest[cityClass as keyof typeof strings.subTest].title}</h2>
            </div>
            {
                isChemistryUpdated &&
                <div className="block--with-margin-x--lg">
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
                                    <p>{score}</p>
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
                                        <ProfileAvatar id={id} />
                                        <Rating value={Number(answer)} readOnly precision={0.5} size={"small"} />
                                        <p>{strings.test.city.answers[answer as keyof typeof strings.test.city.answers].label}</p>
                                    </Stack>
                                ))
                            }
                        </AccordionDetails>
                    </Accordion>
                </div>
            }
            <Swiper {...SWIPERPROPS_CITYDETAILCONTENT} initialSlide={state && state.initialIndex ? state.initialIndex : 0} className="page__swiper">
                <div slot="container-start" >
                    <PaginationDiv className='pageSwiper-pagination' sx={{ justifyContent: 'center' }} />
                </div>
                {
                    TEST.city.subTests[cityClass].examples.map((cityId) => (
                        <SwiperSlide key={cityId} className="">
                            <div className="block--with-margin-x--lg block__body">
                                <ImageCard src={getImgSrc("/city", cityId, FORMATWEBP)} title={cityId} sx={{ height: "256px", borderRadius: "24px" }} className="body__head" />
                                <Stack>
                                    <h3 className="typography-label">{commonStrings.city[cityId as keyof typeof commonStrings.city].name}</h3>
                                    <h3 className="typography-label">{cityId}</h3>
                                    {
                                        NATION[CITY[cityId as keyof typeof CITY].nation as keyof typeof NATION].flag
                                        && <span className={`fi fi-${CITY[cityId as keyof typeof CITY].nation}`}></span>
                                    }
                                </Stack>
                                <p className="card__content__body">{commonStrings.city[cityId as keyof typeof commonStrings.city].intro}</p>
                                <div className="flex">
                                    <Button variant={"contained"}>
                                        <a href={CITY[cityId as keyof typeof CITY].link} target="_blank" rel="noopener noreferrer">
                                            <Stack>
                                                {/* <Logo id={ commonStrings.city.linkType} className='h-5'/> */}
                                                {/* <p className="whitespace-nowrap"> */}
                                                    {
                                                        commonStrings.linkTextList.map((text) => (
                                                            text === "/link" ? commonStrings.linkType[CITY[cityId as keyof typeof CITY].linkType as keyof typeof commonStrings.linkType].name
                                                                : (text === "/city" ? commonStrings.city[cityId as keyof typeof commonStrings.city].name
                                                                    : text
                                                                )
                                                        ))
                                                    }
                                                {/* </p> */}
                                                <ArrowRight />
                                            </Stack>
                                        </a>
                                    </Button>
                                </div>
                                <p className="typography-note">{commonStrings.reference}{commonStrings.linkType[CITY[cityId as keyof typeof CITY].linkType as keyof typeof commonStrings.linkType].name}</p>
                                <div />
                            </div>
                        </SwiperSlide>
                    ))
                }
                <NavigationButton navigateTo="prev" position="fixed" className="pageSwiper-prevEl" />
                <NavigationButton navigateTo="next" position="fixed" className="pageSwiper-nextEl" />
            </Swiper>
        </div>
    );
}
export default CityDetailContent;