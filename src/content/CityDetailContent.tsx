import { ArrowBackIos, ArrowBackIosNew, ArrowForwardIos, ArrowRight, Close } from "@mui/icons-material";
import { AppBar, Button, CardMedia, Icon, IconButton } from "@mui/material";

import { Swiper, SwiperSlide } from 'swiper/react';

import ImageCard from "../components/Card/ImageCard";
import { CITY, NATION, TEST } from "../common/app-const";
import NavigationButton from "../components/Button/NavigationButton";
import getImgSrc, { FORMATWEBP } from "../utils/getImgSrc";
import { SWIPERPROPS_PAGE } from "../common/swiperProps";
import { useLocation, useNavigate } from "react-router-dom";
import { useStrings } from "../texts";
import Stack from "../components/Stack/Stack";
import { useEffect } from "react";

interface CityDetailContentProps {
    cityClass: keyof typeof TEST.city.subTests;
};

function CityDetailContent({ cityClass }: CityDetailContentProps) {

    const navigate = useNavigate();
    const { initialIndex } = useLocation().state;

    /* Strings */
    const strings = useStrings().public.contents.test;
    const commonStrings = useStrings().public.common;

    /* Event Handlers */
    const handleClose = () => {
        navigate('/test');
    };

    return (
        <div className="content">
            <AppBar>
                <div className="app-bar__body">
                    <IconButton disabled>
                        <Icon/>
                    </IconButton>
                    <div className="content__title">
                        <h5 className="content__title__text subtitle" style={{ color: "black" }}>{strings.test.city.title}</h5>
                        <h3 className="content__title__text title" style={{ color: "black" }}>{ strings.subTest[ cityClass as keyof typeof strings.subTest ].title }</h3>
                    </div>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <Close/>
                    </IconButton>
                </div>
            </AppBar>
            <Swiper {...SWIPERPROPS_PAGE} initialSlide={initialIndex} className="page__swiper">
                <div className="page__pagination-container">
                    <div className='pageSwiper-pagination page__pagination'/>
                </div>
                {
                    TEST.city.subTests[cityClass].examples.map((cityId) => (
                        <SwiperSlide key={cityId} className="content">
                            <div className="content__body--padding-lg">
                                <ImageCard sx={{ height: "400px", borderRadius: "24px" }}>
                                    <CardMedia
                                        component="img"
                                        alt={cityId}
                                        height={"100%"}
                                        image={getImgSrc("/city", cityId, FORMATWEBP)}
                                    />
                                </ImageCard>
                                <Stack>
                                    <h3 className="card__title">{commonStrings.city[cityId as keyof typeof commonStrings.city].name}</h3>
                                    <h3>{cityId}</h3>
                                    {
                                        NATION[CITY[cityId as keyof typeof CITY].nation as keyof typeof NATION].flag
                                        && <span className={`fi fi-${CITY[cityId as keyof typeof CITY].nation}`}></span>
                                    }
                                </Stack>
                                <p className="card__content__body">{commonStrings.city[cityId as keyof typeof commonStrings.city].intro}</p>
                                <Button className='card-detail'>
                                    <a href={CITY[cityId as keyof typeof CITY].link} target="_blank" rel="noopener noreferrer">
                                        <Stack>
                                            {/* <Logo id={ commonStrings.city.linkType} className='h-5'/> */}
                                            <p className="whitespace-nowrap">
                                                {
                                                    commonStrings.linkTextList.map((text) => (
                                                        text === "/link" ? commonStrings.linkType[CITY[cityId as keyof typeof CITY].linkType as keyof typeof commonStrings.linkType].name
                                                            : (text === "/city" ? commonStrings.city[cityId as keyof typeof commonStrings.city].name
                                                                : text
                                                            )
                                                    ))
                                                }
                                            </p>
                                            <ArrowRight />
                                        </Stack>
                                    </a>
                                </Button>
                                <p className="card__content__body">{commonStrings.reference}{commonStrings.linkType[CITY[cityId as keyof typeof CITY].linkType as keyof typeof commonStrings.linkType].name}</p>
                            </div>
                        </SwiperSlide>
                    ))
                }
                <NavigationButton navigateTo="prev" className="pageSwiper-prevEl"><ArrowBackIos /></NavigationButton>
                <NavigationButton navigateTo="next" className="pageSwiper-nextEl"><ArrowForwardIos /></NavigationButton>
            </Swiper>
        </div>
    );
}
export default CityDetailContent;