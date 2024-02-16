/* React */
import { useEffect, useRef, useState } from "react";

/* React Packages */
import { Outlet, useNavigate } from "react-router-dom";
import { useMotionValueEvent, useScroll } from "framer-motion"

import { Button, Stack, Toolbar, useTheme } from "@mui/material";


/* Swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperType from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';

import { useStrings } from "../../texts";
import { SWIPERPROPS_HOMECONTENT } from "../../common/swiperProps";
import SwiperAutoplayProgress from "../../components/SwiperAutoplayProgress";
import PaginationDiv from "../../components/PaginationDiv";

interface HomeContentProps {

};

function HomeContent({ }: HomeContentProps) {

    const strings = useStrings().public.contents.home;
    const navigate = useNavigate();

    const theme = useTheme();
    /* States */
    const [showFloatingButton, setShowFloatingButton] = useState<boolean>(true);

    const [swiper, setSwiper] = useState<SwiperType>();

    /* Store */

    /* Event Handlers */
    const handleTestStart = () => {
        navigate('/test');
    };

    /* Side Effects  */

    /* Motion */
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (scrollY.get() > window.innerHeight * 0.4) {
            setShowFloatingButton(false);
        }
        else {
            setShowFloatingButton(true);
        }
    })


    return (
        <div className="page">
            <Swiper
                {...SWIPERPROPS_HOMECONTENT}
                onSwiper={(swiper) => {
                    setSwiper(swiper);
                }}
                className="page__swiper flex fullscreen"
            // style={{ overflow: 'visible' }}
            >
                {(strings.sections as { title: string, body: string }[]).map(({ title, body }, index) => (
                    <SwiperSlide key={title} className="flex" style={{ overflowY: 'visible' }}>
                        <Toolbar />
                        <div className="block--with-margin-x block__body flex-grow flex" style={{ justifyContent: "end" }}>
                            <h3 className="typography-heading">{title}</h3>
                            <p className="">{body}</p>
                        </div>
                        <div style={{ position: "absolute", width: "100%", }} className="fullscreen">
                        </div>
                    </SwiperSlide>
                ))}
                <div slot="container-end" style={{ color: theme.palette.primary.main }}>
                    <div className="block--with-margin-x block__body">
                        <Stack>
                            {
                                swiper &&
                                <SwiperAutoplayProgress swiper={swiper} />
                            }
                            <PaginationDiv className='pageSwiper-pagination pagination__bullets'/>
                            <div>
                            </div>
                        </Stack>
                    </div>
                    <div className="floating-placeholder--bottom" style={{ visibility: 'hidden' }}>
                        <div className="block--with-margin-x flex">
                            <Button>
                                <p> {strings.startButton} </p>
                            </Button>
                        </div>
                    </div>
                </div>
            </Swiper>
            {
                (showFloatingButton) &&
                <div className="floating--bottom">
                    <div className="block--with-margin-x flex">
                        <Button
                            onClick={handleTestStart}
                            variant="contained"
                        >
                            <p> {strings.startButton} </p>
                        </Button>
                    </div>
                </div>
            }
        </div>
    );
}
export default HomeContent;