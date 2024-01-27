import { SwiperSlide } from "swiper/react";
import Expandable from "./Expandable";
import { useExpandContext } from "./ExpandContext";
import ImageCard from "../Card/ImageCard";
import CardMediaContainer from "./CardMediaContainer";
import { PropsWithChildren } from "react";
import { CardContent, CardMedia } from "@mui/material";

interface CityInfoCardProps {
    alt: string;
    image: string;
};

function CityInfoCard({ alt, image, children } : PropsWithChildren<CityInfoCardProps> ) {

    const { isExpanded, setIsExpanded } = useExpandContext();

    const handleItemClick = (cityId: string) => {
        setIsExpanded(true);
    }
    const handleClose = () => {
        setIsExpanded(false);
    }

    return (
        <Expandable>
            <ImageCard>
                    <CardMedia
                        component="img"
                        height={"100%"}
                        alt={ alt }
                        image={ image }
                        sx={{    
                            width : isExpanded ? "256px" : "100%",
                            height: "100%"
                        }}
                    />
                {
                    isExpanded &&
                    <CardContent>
                        {children}
                    </CardContent>
                }
            </ImageCard>
        </Expandable>
    );
}
export default CityInfoCard;