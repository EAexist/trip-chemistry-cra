import { PropsWithChildren, useRef } from "react";

import { motion } from 'framer-motion';

import { usePage } from "./PageContext";

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
            // animate={(activePage === page) ? { opacity: 1, visibility: 'visible', zIndex: 0 } : { opacity: 0, visibility: 'hidden', zIndex: -2 }}
            className={`scroll-page__item fullscreen ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default ScrollPageItem;