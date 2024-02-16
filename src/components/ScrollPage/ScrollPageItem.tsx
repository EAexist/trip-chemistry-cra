import { ForwardedRef, PropsWithChildren, forwardRef, useEffect, useRef } from "react";
import { usePage } from "./PageContext";
import { Fade } from "@mui/material";

import { motion } from 'framer-motion';
/* ScrollPageItem
    Wrapper that renderes wrapped element when sticky container is scrolled to corresponding page(prop) */

interface ScrollPageItemProps {
    page: number
    className: string
};

const ScrollPageItem = ({ page, children, className }: PropsWithChildren<ScrollPageItemProps>) => {

    const { activePage, addPage } = usePage();
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        addPage();
    }, [ ])

    return (
        <motion.div
            ref={pageRef}
            animate={(activePage === page) ? { opacity: 1, visibility: 'visible', zIndex: 0 } : { opacity: 0, visibility: 'hidden', zIndex: -2 }}
            className="scroll-page__item fullscreen"
        >
            {children}
        </motion.div>
    );
};

export default ScrollPageItem;

// const ScrollPageItemWithStep = withStepCheckpoint(ScrollPageItem);
// export { ScrollPageItemWithStep };