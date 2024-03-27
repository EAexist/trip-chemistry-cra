import { PropsWithChildren, useRef } from "react";

import { domAnimation, LazyMotion, m } from 'framer-motion';

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
        // (activePage === page) &&
        <LazyMotion features={domAnimation}>
            <m.div
                ref={pageRef}
                {...FADEIN}
                // className={`ScrollPageItem fill-window ${className}`}
                className={`fill-window ${className}`}
            >
                {children}
            </m.div>
        </LazyMotion>
    );
};

export default ScrollPageItem;