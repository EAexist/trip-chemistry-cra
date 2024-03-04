import { Add } from "@mui/icons-material";
import { Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useChemistryIdList } from "../../reducers/authReducer";
import ChemistrySummaryButton from "../../components/ChemistrySummaryButton";

interface ChemistryListContentProps {

};

function ChemistryListContent({ }: ChemistryListContentProps) {

    /* Hooks */
    const navigate = useNavigate();

    /* Reducers */
    const chemistryIdList = useChemistryIdList();

    /* Event Handler */
    const handleAddChemistry = () => {
        navigate(`new`);
    }

    return (
        <div className="page content__body--gray min-fullscreen" >
            <Toolbar />
            <div className="block--with-margin-x block__body body--narrow">
                <div>
                    <h2 className="typography-label">
                        내 여행
                    </h2>
                </div>
                {
                    Object.values(chemistryIdList).map(( id ) => (
                        // <Button onClick={ () => handleClickChemistryCard(id) }>{ id }</Button>
                        <ChemistrySummaryButton id={ id } />
                        // <ImageCard
                        //     src={getImgSrc("/city", titleCity, FORMATWEBP)}
                        //     title={titleCity}
                        //     sx={{ width: "100%" }}
                        //     gradient="bottom"
                        // >
                        //     <CardActionArea onClick={() => handleClickTripCard(id)}>
                        //         <CardContent className="ImageCard__CardContent block--large">
                        //             <Stack className="typography-white">
                        //                 <Stack>
                        //                     <h2 className="typography-label">{title}</h2>
                        //                     <Stack spacing={-0.5}>
                        //                         {
                        //                             profileList.map(({ avatarId, nickname }) => (
                        //                                 <ProfileAvatar key={nickname} {...{ nickname, characterId: avatarId }} />
                        //                             ))
                        //                         }
                        //                     </Stack>
                        //                 </Stack>
                        //             </Stack>
                        //         </CardContent>
                        //     </CardActionArea>
                        // </ImageCard>
                    ))
                }
                <div>
                    <Button
                        variant="outlined"
                        className="block--large flex-row"
                        sx={{ borderRadius: "16px" }}
                        onClick={handleAddChemistry}
                    >
                        <Add/>
                        <p>새 여행 만들기</p>
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default ChemistryListContent;