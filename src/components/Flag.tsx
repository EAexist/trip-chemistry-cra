import getImgSrc, { FORMATSVG } from "../utils/getImgSrc";

interface FlagProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    id: string;
};

function Flag({ id, ...props }: FlagProps) {

    return (
        <img
            src={getImgSrc('/flag-icons/flags/4x3', `${id}`, FORMATSVG)}
            alt={id}
            width={"16px"}
            height={"12px"}
            className={`Flag`}
            {...props}
        />
    )
}

export default Flag