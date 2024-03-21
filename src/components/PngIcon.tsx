import '../styles/PngIcon.css';

import getImgSrc, { FORMATWEBP } from "../utils/getImgSrc";

interface PngIconProps{
    name: string;
    size?: "small" | "medium" | "large";
};

function PngIcon({ name, size = "medium" } : PngIconProps ){
    const basePath = '/icon'
    return(
        <img 
            src={ getImgSrc( basePath, name, FORMATWEBP )}
            alt={ name }
            width={ "24px" }
            height={ "24px" }
            className={`PngIcon PngIcon--${size}`}       
        />
    );
}
export default PngIcon;