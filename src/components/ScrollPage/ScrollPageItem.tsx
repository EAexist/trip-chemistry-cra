import { ForwardedRef, PropsWithChildren, forwardRef, useRef } from "react";
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

    const activePage = usePage();
    const pageRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={pageRef}
            animate={(activePage === page) ? { opacity: 1, visibility: 'visible' } : { opacity: 0, visibility: 'hidden' }}
            className="scroll-page__item fullscreen"
        >
            {children}
        </motion.div>
    );
};

export default ScrollPageItem;

// const ScrollPageItemWithStep = withStepCheckpoint(ScrollPageItem);
// export { ScrollPageItemWithStep };