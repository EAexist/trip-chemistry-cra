/* React */
import { useState } from "react";

/* React Packages */
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Button, Stack, Toolbar, useTheme } from "@mui/material";


/* Swiper */
import SwiperType from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SWIPERPROPS_HOMECONTENT } from "../../common/swiperProps";
import PaginationDiv from "../../components/PaginationDiv";
import SwiperAutoplayProgress from "../../components/SwiperAutoplayProgress";
import { useStrings } from "../../texts";

interface HomeContentProps {

};

function HomeContent({ }: HomeContentProps) {

    /* Constants */
    const strings = useStrings().public.contents.home;

    /* Hookes */
    const navigate = useNavigate();
    const theme = useTheme();

    /* States */
    const [showFloatingButton, setShowFloatingButton] = useState<boolean>(true);
    const [swiper, setSwiper] = useState<SwiperType>();

    /* Reducers */

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
                className="page__swiper flex fill-window"
            >
                {(strings.sections as { title: string, body: string }[]).map(({ title, body }, index) => (
                    <SwiperSlide key={title} className="flex" style={{ overflowY: 'visible' }}>
                        <Toolbar />
                        <div className="block--with-margin-x block__body flex-grow flex" style={{ justifyContent: "end" }}>
                            <h3 className="typography-heading">{title}</h3>
                            <p className="">{body}</p>
                        </div>
                        <div style={{ position: "absolute", width: "100%", }} className="fill-window">
                            {/* Background Image */}
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
                            <PaginationDiv className='pageSwiper-pagination pagination__bullets' />
                            <div>
                            </div>
                        </Stack>
                    </div>
                    <div className="floating-placeholder--bottom" style={{ visibility: 'hidden' }}>
                        <div className="block--with-margin-x flex">
                            <Button>
                                {strings.startButton}
                            </Button>
                        </div>
                    </div>
                </div>
            </Swiper>
            {
                (showFloatingButton) &&
                <div className="floating--bottom flex">
                    <Button
                        onClick={handleTestStart}
                        variant="contained"
                        className="button--full block--with-margin"
                    >
                        {strings.startButton}
                    </Button>
                </div>
            }
        </div>
    );
}
export default HomeContent;