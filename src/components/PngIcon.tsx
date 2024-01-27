import '../styles/PngIcon.css';

import getImgSrc, { FORMATPNG } from "../utils/getImgSrc";

interface PngIconProps{
    name : string;
};

function PngIcon( { name } : PngIconProps ){
    const basePath = '/icon'
    return(
        <img 
            src={ getImgSrc( basePath, name, FORMATPNG )}
            alt={ name }
            className="png-icon__img"       
        />
    );
}
export default PngIcon;