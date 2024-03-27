/* React */
import { PropsWithChildren } from "react";

/* React Packages */
import { Button, Toolbar } from "@mui/material";
import { domAnimation, LazyMotion, m } from 'framer-motion';

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
            <LazyMotion features={domAnimation}>
                {
                    isFullscreen &&
                    <Toolbar />
                }
                <m.div {...SLIDEINUPINVIEW} className='flex-grow block--centered block__body block--with-padding'>
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
                            width={ "256px" }
                            height={ "256px" }
                            containerClassName="NoticeBlock__image"
                        />
                        :
                        <img
                            src={src}
                            alt={alt}
                            width={ "256px" }
                            height={ "256px" }
                            className="NoticeBlock__image"
                        />
                    }
                    <p>{body}</p>
                </m.div>
                {
                    handleClick &&
                    <m.div {...FADEIN_INVIEW} className="block__body">
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
                    </m.div>
                }
                </LazyMotion>
            </div>
    );
}
export default NoticeBlock;