import { PropsWithChildren, useRef } from "react";

import { motion } from 'framer-motion';

import { usePage } from "./PageContext";
import { FADEIN } from "../../motion/props";

/* ScrollPageItem
    Wrapper that renderes wrapped element when sticky container is scrolled to corresponding page(prop) 
*/

interface ScrollPageItemProps {
    page: number
    className: string
};

const ScrollPageItem = ({ page, children, className }: PropsWithChildren<ScrollPageItemProps>) => {

    const { activePage } = usePage();
    const pageRef = useRef<HTMLDivElement>(null);

    return (
        (activePage === page) &&
        <motion.div
            ref={pageRef}
            {...FADEIN}
            className={`scroll-page__item fullscreen ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default ScrollPageItem;