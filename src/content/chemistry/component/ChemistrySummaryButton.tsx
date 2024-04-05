import { Card, CardActionArea, CardContent, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { HEADERS_AXIOS } from "../../../common/app-const";
import LabeledAvatar from "../../../components/Avatar/LabeledAvatar";
import useNavigateWithGuestContext from "../../../hooks/useNavigateWithGuestContext";
import { IChemistry, defaultChemistry } from "../../../interfaces/IChemistry";

interface ChemistrySummaryButtonProps {
    id: String
};

function ChemistrySummaryButton({ id }: ChemistrySummaryButtonProps) {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();

    /* State */
    const [chemistry, setChemistry] = useState<IChemistry>(defaultChemistry);

    /* Event Handler */
    const handleClick = () => {
        navigate(`../chemistry/${id}`, { state: { navigateDirection: 'next' } });
    }

    /* Side Effect */
    useEffect(() => {

        /* API 요청 */
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
        <Card className="block--xlarge">
            <CardActionArea onClick={handleClick} className="flex-end">
                <CardContent className="block__body block--centered">
                    <h2 className="typography-body">{chemistry.title}</h2>
                    <Stack spacing={0.75}>
                        {
                            Object.values(chemistry.profileList).map(({ testResult, nickname }) => (
                                <LabeledAvatar key={nickname} {...{ nickname, characterId: testResult && testResult.tripCharacter ? testResult.tripCharacter.id : "user" }} />
                            ))
                        }
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default ChemistrySummaryButton;