import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { SLIDEINLEFT } from "../../motion/props";
import { useLocation } from "react-router-dom";

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
        <motion.div {...motionprops} className={`page ${className}`}>
            {children}
        </motion.div>
    )
}

export default RoutedMotionPage;