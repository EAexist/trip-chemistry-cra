import { ButtonBase } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import ExpandContext, { useExpandContext } from "./ExpandContext";
import { Swiper } from 'swiper/react';
import { SwiperOptions } from "swiper/types";

interface ExpandableSwiperProps extends SwiperOptions{
    className: string;
};

function ExpandableSwiper({ children, slidesPerView, ...swiperOptions } : PropsWithChildren<ExpandableSwiperProps> ){

    const { isExpanded, setIsExpanded }= useExpandContext();

    return(
        <Swiper slidesPerView={isExpanded ? 1 : slidesPerView} {...swiperOptions}>
            { children }
        </Swiper>
    );
}
export default ExpandableSwiper;