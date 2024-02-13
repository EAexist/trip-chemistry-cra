import { Card, CardProps } from "@mui/material";
import { CSSProperties, useEffect } from "react";

interface ImageCardProps extends CardProps {
    src?: string
    title? : string
    gradient? : string
};
const ImageCard = ({ sx, title, src, gradient, children, ...props }: ImageCardProps) => {
    
    const backgrounSx = ( src === undefined ) ? {} : { background: `url("${ src }")${gradient ? `, ${gradient}` : ""}`, backgroundSize: 'cover', backgroundBlendMode: 'multiply' };

    useEffect(()=>{
        console.log(`background= ${backgrounSx.background}`)
    }, [])

    return(
        <Card
            elevation={ 6 }
            sx={{
                title: title,
                ...sx,
                ...backgrounSx
            }}
            {...props}
        >
            { children }
        </Card>
    );
}

export default ImageCard;