import { AvatarGroup, Button, ButtonBase, CardActionArea, CardContent, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { HEADERS_AXIOS } from "../common/app-const";
import { useNavigate } from "react-router-dom";
import { IChemistry, defaultChemistry } from "../interfaces/IChemistry";
import ImageCard from "./Card/ImageCard";
import getImgSrc, { FORMATWEBP } from "../utils/getImgSrc";
import ProfileAvatar from "./Avatar/ProfileAvatar";

interface ChemistrySummaryButtonProps {
    id: String
};

function ChemistrySummaryButton({ id }: ChemistrySummaryButtonProps) {

    /* Hooks */
    const navigate = useNavigate();

    /* State */
    const [chemistry, setChemistry] = useState<IChemistry>(defaultChemistry);

    /* Event Handler */
    const handleClick = () => {
        navigate(`../chemistry/${id}`);
    }

    /* Side Effect */
    useEffect(() => {
        axios.get(`/chemistry`,
            {
                method: "GET",
                headers: HEADERS_AXIOS,
                params: {
                    id: id
                }
            })
            .then((response) => {
                setChemistry(response.data);
            });

    }, [id])

    useEffect(() => {
        console.log(`[ChemistrySummaryButton] chemistry=${chemistry}`);
    }, [chemistry])


    return (
        <ImageCard
            src={getImgSrc("/city", chemistry.titleCity, FORMATWEBP)}
            title={chemistry.title}
            gradient="bottom"
            className="block--xlarge"
        >
            <CardActionArea onClick={handleClick} className="flex-end">
                <CardContent>
                    <Stack className="typography-white">
                        <h2 className="typography-label">{chemistry.title}</h2>
                        <Stack spacing={-0.25}>
                            {
                                Object.values(chemistry.profileList).map(({ testResult, nickname }) => (
                                    <ProfileAvatar key={nickname} {...{ nickname, characterId: testResult && testResult.tripCharacter ? testResult.tripCharacter.id : "" }} />
                                ))
                            }
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </ImageCard>
    );
}
export default ChemistrySummaryButton;