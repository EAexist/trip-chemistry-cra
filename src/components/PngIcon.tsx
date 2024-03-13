import '../styles/PngIcon.css';

import getImgSrc, { FORMATPNG } from "../utils/getImgSrc";

interface PngIconProps{
    name: string;
    size?: "small" | "medium" | "large";
};

function PngIcon({ name, size = "medium" } : PngIconProps ){
    const basePath = '/icon'
    return(
        <img 
            src={ getImgSrc( basePath, name, FORMATPNG )}
            alt={ name }
            className={`PngIcon PngIcon--${size}`}       
        />
    );
}
export default PngIcon;