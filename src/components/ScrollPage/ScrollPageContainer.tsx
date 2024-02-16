import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import PageContext, { PageContextProvider } from "./PageContext";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Step from "../Step/Step";

/* ScrollPageContainer
    Sticky Container, which displays paged items according to the amount of scroll in the container.*/

interface ScrollPageContainerProps {
    pages?: number;
    onPageChange?: ( page: number ) => void;
};

const ScrollPageContainer = ({ onPageChange, children }: PropsWithChildren<ScrollPageContainerProps>) => {

    const [ page, setPage ] = useState<number>(0);
    const [ pages, setPages ] = useState<number>(0)

    const ref = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    /* Motion */
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        // console.log(`[ScrollPageContainer]\n\tscrollY.get()=${scrollY.get()}\n\tpageRef?.current?.offsetHeight=${pageRef?.current?.offsetHeight}`);
        setPage( Math.min( Math.floor((scrollY.get() - (ref.current?.offsetTop as number)) / (pageRef?.current?.offsetHeight as number)),  pages-1));
    });

    useEffect(() => {
        // console.log(`[ScrollPageContainer]\n\tscrollY.get()=${scrollY.get()}\n\tpageRef?.current?.offsetHeight=${pageRef?.current?.offsetHeight}`);
        setPage(Math.floor((scrollY.get() - (ref.current?.offsetTop as number)) / (pageRef?.current?.offsetHeight as number)));
    }, [])

    useEffect(() => {
        console.log(`[ScrollPageContainer]\n\tpage=${page}`)
        onPageChange && onPageChange( page );
    }, [ page, onPageChange ])

    return (
        <div ref={ref} style={{ height: pageRef?.current?.offsetHeight ? (pages+1) * pageRef?.current?.offsetHeight : 0 }} className="scroll-page__container">
            <div className="scroll-page__scroll-target">{
                Array.from({ length: pages }, (value, index) => (
                    <Step key={index} index={index} className="fullscreen" style={{ backgroundColor: index%2 === 0 ? 'green' : 'blue', zIndex: 50 }}/>
                ))
            }</div>
            <div ref={pageRef} className="scroll-page__viewport fullscreen">
                <PageContext.Provider value={{ activePage : page, addPage : useCallback(() => setPages(( prev ) => prev+1 ), []) }}>
                    {children}
                </PageContext.Provider>
            </div>
        </div>
    );
}

export default ScrollPageContainer;