/* React */
import { PropsWithChildren } from "react";

/* React Packages */
import { Button, Toolbar } from "@mui/material";
import { motion } from 'framer-motion';

/* App */
import LazyImage from "../LazyImage";
import { FADEIN_INVIEW, SLIDEINUPINVIEW } from "../../motion/props";

interface NoticeBlockProps {
    handleClick?: () => void
    alt?: string
    src?: string
    title?: string
    body?: string
    buttonText?: string
    isFullscreen?: boolean
    lazyLoadImage?: boolean
};

function NoticeBlock({
    handleClick,
    alt,
    src,
    title,
    body,
    buttonText,
    isFullscreen = true,
    lazyLoadImage = false,
}: PropsWithChildren<NoticeBlockProps>) {

    return (
            <div className={`page flex ${isFullscreen ? 'fill-window' : ''}`}>
                {
                    isFullscreen &&
                    <Toolbar />
                }
                <motion.div {...SLIDEINUPINVIEW} className='flex-grow block--centered block__body block--with-padding'>
                    {
                        title &&
                        <h2 className="typography-heading">
                            { title }
                        </h2>
                    }
                    {
                        ( alt && src ) &&
                        lazyLoadImage 
                        ?
                        <LazyImage
                            src={src}
                            alt={alt}
                            containerClassName="NoticeBlock__image"
                        />
                        :
                        <img
                            src={src}
                            alt={alt}
                            className="NoticeBlock__image"
                        />
                    }
                    <p>{body}</p>
                </motion.div>{
                    handleClick &&
                    <motion.div {...FADEIN_INVIEW} className="block__body">
                        <div className="block--with-margin-x flex">
                            <Button
                                onClick={handleClick}
                                variant="contained"
                                style={{
                                    visibility: handleClick !== undefined
                                        ? "visible"
                                        : "hidden"
                                }}
                                className="button--full"
                            >
                                { buttonText }
                            </Button>
                        </div>
                        <div />
                    </motion.div>
                }
            </div>
    );
}
export default NoticeBlock;