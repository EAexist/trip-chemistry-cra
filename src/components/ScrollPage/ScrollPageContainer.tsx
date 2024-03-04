import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { useMotionValueEvent, useScroll } from "framer-motion";

import PageContext from "./PageContext";
import Step from "../Step/Step";

/* ScrollPageContainer
    Sticky Container, which displays paged items according to the amount of scroll in the container.*/

interface ScrollPageContainerProps {
    pages: number;
    onPageChange?: (page: number) => void;
};

const ScrollPageContainer = ({ onPageChange, pages, children }: PropsWithChildren<ScrollPageContainerProps>) => {

    const [page, setPage] = useState<number>(0);
    // const [ pages, setPages ] = useState<number>(0);

    const ref = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    /* Motion */
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log(`[ScrollPageContainer] useMotionValueEvent\n\tscrollY.get()=${scrollY.get()}\n\tpageRef?.current?.offsetHeight=${pageRef?.current?.offsetHeight}`);
        setPage(Math.min(Math.floor((scrollY.get() - (ref.current?.offsetTop as number)) / (pageRef?.current?.offsetHeight as number)), pages - 1));
    });

    useEffect(() => {
        console.log(`[ScrollPageContainer] useEffect\n\tscrollY.get()=${scrollY.get()}\n\tpageRef?.current?.offsetHeight=${pageRef?.current?.offsetHeight}`);
        setPage(Math.floor((scrollY.get() - (ref.current?.offsetTop as number)) / (pageRef?.current?.offsetHeight as number)));
    }, [])

    useEffect(() => {
        console.log(`[ScrollPageContainer]\n\tpage=${page}`)
        onPageChange && onPageChange(page);
    }, [page, onPageChange])

    return (
        <div ref={ref} className="scroll-page__container">
            {
                Array.from({ length: pages }, (value, index) => (
                    <Step key={index} index={index} className="fullscreen" style={{ visibility: "hidden" }} />
                ))
            }
            <div className="fullscreen"/>
            <div className="scroll-page__viewport-container">
                <div ref={pageRef} className="scroll-page__viewport fullscreen">
                    <PageContext.Provider value={{ activePage: page, addPage: () => { } }}>
                        {children}
                    </PageContext.Provider>
                </div>
            </div>
        </div>
    );
}

export default ScrollPageContainer;