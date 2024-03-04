/* React */
import { PropsWithChildren } from "react";

/* React Packages */
import { Button, Toolbar } from "@mui/material";

import LazyImage from "../components/LazyImage";

interface NoticeBlockProps {
    handleClick?: () => void
    alt?: string
    src?: string
    body?: string
    buttonText?: string
};

function NoticeBlock({
    handleClick,
    alt,
    src,
    body,
    buttonText,
}: PropsWithChildren<NoticeBlockProps>) {

    return (
            <div className="page fullscreen flex">
                <Toolbar />
                <div className='flex-grow body--centered'>
                    {
                        alt && src &&
                        <LazyImage
                            alt={alt}
                            src={src}
                            containerClassName="load-content-item__image"
                            containerSx={{ height: "256px", width: "256px" }}
                        />
                    }
                    <p>{body}</p>
                </div>
                <div className="block__body">
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
                </div>
            </div>
    );
}
export default NoticeBlock;