import { PropsWithChildren, useEffect, useRef } from "react";

/* Swiper */
import { Swiper, SwiperRef } from 'swiper/react';

import { SWIPERPROPS_STEPPER } from "../../common/swiperProps";
import { useStep } from "./StepContext";

interface StepperProps{
    className: string;
};

function Stepper({ className, children } : PropsWithChildren<StepperProps> ){

    /* States */
    const topNavSwiperRef = useRef<SwiperRef>(null);

    const step = useStep();

    /* Side Effects */
    useEffect(() => {
        topNavSwiperRef.current?.swiper.slideTo( step );
    }, [ step ])

    return(
        <Swiper {...SWIPERPROPS_STEPPER} ref={topNavSwiperRef} className={className}>
            { children }
        </Swiper>
    );
}
export default Stepper;