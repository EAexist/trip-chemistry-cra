/* React Packages */
import { Add } from "@mui/icons-material";
import { Button, Toolbar } from "@mui/material";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

/* Trip Chemistry */
import ChemistrySummaryButton from "../../components/ChemistrySummaryButton";
import { FADEIN_VIEWPORT, STAGGER_CHILDREN, VARIANTS_SLIDE_UP } from "../../motion/props";
import { useChemistryIdList } from "../../reducers/authReducer";
import RoutedMotionPage from "../../components/Motion/RoutedMotionPage";

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
        <RoutedMotionPage className="page fullscreen flex content__body--gray">
        {/* <div className="page  min-fullscreen"> */}
            <Toolbar/>
            <div className="block--with-margin-x block__body">
                <motion.h2 {...FADEIN_VIEWPORT} className="typography-heading">
                    내 여행
                </motion.h2>
                <motion.ul {...STAGGER_CHILDREN} custom={0.5} className="block__body">
                    {
                        Object.values(chemistryIdList).map((id) => (
                            <motion.li variants={VARIANTS_SLIDE_UP}>
                                <ChemistrySummaryButton id={id} />
                            </motion.li>
                        ))
                    }
                    <motion.li variants={VARIANTS_SLIDE_UP}>
                        <Button
                            variant="outlined"
                            className="block--large flex-row"
                            sx={{ borderRadius: "16px" }}
                            onClick={handleAddChemistry}
                        >
                            <Add />
                            <p>새 여행 만들기</p>
                        </Button>
                    </motion.li>
                </motion.ul>
            </div>
        {/* </div> */}
        </RoutedMotionPage>
    );
}
export default ChemistryListContent;