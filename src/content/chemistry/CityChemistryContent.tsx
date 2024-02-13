import { Avatar, ButtonBase, CardContent, CardMedia, Rating, Stack } from "@mui/material";
import { TEST } from "../../common/app-const";
import { useStrings } from "../../texts";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { useEffect } from "react";
import ProfileAvatar from "../../components/Avatar/ProfileAvatar";
import { useCityChemistry } from "../../reducers/chemistryReducer";
import getImgSrc, { FORMATWEBP } from "../../utils/getImgSrc";
import ImageCard from "../../components/Card/ImageCard";
import AvatarGroup from "../../components/Avatar/AvatarGroup";
import { Star, StarBorder } from "@mui/icons-material";

interface CityChemistryContentProps {
    cityClass: keyof typeof TEST.city.subTests;
};

function CityChemistryContent({ cityClass }: CityChemistryContentProps) {

    const testStrings = useStrings().public.contents.test;
    const valueToProfileList = useValueToProfileIdList({ index: 'city', subIndex: cityClass });

    const score = useCityChemistry(cityClass);

    const handleClick = () => {

    }

    useEffect(() => {
        console.log(`[CityChemistryContent] cityClass=${cityClass}`)
    }, [cityClass])

    return (
        <div className="block__body">
            <ButtonBase onClick={handleClick} style={{ width: "100%" }}>
                <ImageCard src={getImgSrc("/city", TEST.city.subTests[cityClass].examples[0], FORMATWEBP)} title={cityClass} sx={{ width: "100%" }} gradient="linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,0.2) 64%, rgba(0,0,0,0.9))">
                    <CardContent className="image-card__card-content">
                        <Stack justifyContent={"space-between"} className="typography-white">
                            <h2 className="typography-label">{testStrings.subTest[cityClass as keyof typeof testStrings.subTest].title}</h2>
                            <Stack>
                                <Rating value={score} readOnly precision={0.5} size={"small"} emptyIcon={<StarBorder fontSize="inherit" sx={{ color: "white" }} />} />
                                <p>{score}</p>
                            </Stack>
                        </Stack>
                    </CardContent>
                </ImageCard>
            </ButtonBase>
            <Stack flexWrap={"wrap"} spacing={2}>
                {
                    Object.entries(valueToProfileList).reverse().map(([ value, idList ], index) => (
                        <Stack sx={{ flexWrap: "wrap" }}>
                            <p>{testStrings.test.city.answers[Number(value) as keyof typeof testStrings.test.city.answers].label}</p>
                            <AvatarGroup className="avatar-group">
                                {
                                    idList.map((id) => (
                                        <ProfileAvatar id={id} />
                                    ))
                                }
                            </AvatarGroup>
                        </Stack>
                    ))
                }
            </Stack>
        </div>
    );
}
export default CityChemistryContent;