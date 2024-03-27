import { domAnimation, LazyMotion, m } from "framer-motion";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { SLIDEINLEFT } from "../props";

interface RoutedMotionPageProps {
    className?: string;
};

const RoutedMotionPage = ({ className, children }: PropsWithChildren<RoutedMotionPageProps>) => {

    /* Hooks */
    const { state } = useLocation();
    const motionprops = (state && state.navigateDirection) ?
        state.navigateDirection === "next"
            ?
            {
                custom: "left",
                delayChildren: 0.75,
                ...SLIDEINLEFT
            }
            :
            state.navigateDirection === "prev"
                ?
                {
                    custom: "right",
                    delayChildren: 0.75,
                    ...SLIDEINLEFT
                }
                : undefined
        : undefined

    return (
        <LazyMotion features={domAnimation}>
        <m.div {...motionprops} className={`page ${className}`}>
            {children}
        </m.div>
        </LazyMotion>
    )
}

export default RoutedMotionPage;