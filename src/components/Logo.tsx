import { Icon } from "@mui/material";
import getImgSrc, { FORMATPNG, FORMATSVG, FORMATWEBP } from "../utils/getImgSrc";
import { Image } from "@mui/icons-material";

const LOGOS: {
    [key: string]: {
        name: string;
        type: "svg" | "png" | "webp" | "mui-icon";
        iconName?: string;
    }
} = {
    "travel-japan": {
        name: "Travel Japan",
        type: "png",
    },
    "tabelog": {
        name: "타베로그",
        type: "png",
    },
    "tripadvisor": {
        name: "Tripadvisor",
        type: "svg",
    },
    "website": {
        name: "웹사이트",
        type: "mui-icon",
        iconName: "travel_explore"
    },
    "discovering-hongkong": {
        name: "홍콩관광청",
        type: "webp",
    },
};

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    // id: keyof typeof LOGOS;
    id: string;
    format?: 'webp' | 'png' | 'mui-icon' | 'svg'
    iconName?: string;
};

function Logo({ id, format='webp', className = 'logo--medium', iconName, ...props }: LogoProps) {

    // const logo = LOGOS[id];

    return (
        format === "mui-icon" 
            ?
            iconName && <Icon className={className}>{iconName}</Icon>
            : <img
                src={getImgSrc('/logos', `logo-${id}`,
                    format === "svg" ? FORMATSVG
                        : format === "png" ? FORMATPNG
                            : format === "webp" ? FORMATWEBP
                                : ''
                )}
                alt={id}
                width={ "24px" }
                height={ "24px" }
                className={`Logo ${className}`}
                {...props}
            />
    )
}

export default Logo