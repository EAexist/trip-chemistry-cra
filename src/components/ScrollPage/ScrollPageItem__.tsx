import { PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import ScrollContext from "./ScrollContext";

interface ScrollPageItemProps {
    // pages?: number
    className: string;
};

const ScrollPageItem = ({ className, children }: PropsWithChildren<ScrollPageItemProps>) => {

    const [show, setShow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null); 

    /* Motion */
    const scrollY = useContext(ScrollContext);

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log(`[ScrollPageItem] scrollY=${scrollY.get()} offsetTop=${ref.current?.offsetTop}`);
        if ((( ref.current?.offsetTop !== undefined ) && ( pageRef.current?.offsetHeight !== undefined ) ))  {
            if (scrollY.get() >= ref.current?.offsetTop) {
                if (scrollY.get() >= (ref.current?.offsetTop + ref.current.offsetHeight) / 2) {
                    console.log(`[ScrollPageItem] scrollY=${scrollY.get()} offsetTop+offsetHeight=${ref.current?.offsetTop + pageRef.current.offsetHeight}`);
                    setShow(false);
                }
                else {
                    setShow(true);
                }
            }
            else {
                setShow(false);
            }
        }
    });

    useEffect(() => {
        if ((( ref.current?.offsetTop !== undefined ) && ( pageRef.current?.offsetHeight !== undefined ) )) {
            if (scrollY.get() >= ref.current?.offsetTop && (scrollY.get() < (ref.current?.offsetTop + pageRef.current.offsetHeight) / 2 )) {
                setShow(true);
            }
        }
    }, []);

    return (
        <div ref={ref} className="scroll-page__container" style={{ marginBottom: pageRef.current?.offsetHeight ? (-1) * pageRef.current?.offsetHeight : undefined }}>
            {
                <div ref={pageRef} className="fill-window sticky" style={{ visibility: show ? "visible" : "hidden" }}>
                    { children }
                </div>
            }
        </div>
    );
}

// export default ScrollPageItem;