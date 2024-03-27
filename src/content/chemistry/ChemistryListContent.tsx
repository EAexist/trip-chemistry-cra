/* React Packages */
import { Add } from "@mui/icons-material";
import { Button, Toolbar } from "@mui/material";
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { useNavigate } from "react-router-dom";

/* App */
import ChemistrySummaryButton from "./component/ChemistrySummaryButton";
import { FADEIN_VIEWPORT, STAGGER_CHILDREN, VARIANTS_SLIDE_UP } from "../../motion/props";
import { useChemistryIdList } from "../../reducers/authReducer";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";

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
        <RoutedMotionPage className="page fill-window flex block--gray">
        {/* <div className="page  min-fill-window"> */}
            <Toolbar/>
            <div className="block--with-margin-x block__body">
                <LazyMotion features={domAnimation}>
                <m.h2 {...FADEIN_VIEWPORT} className="typography-heading">
                    내 여행
                </m.h2>
                <m.ul {...STAGGER_CHILDREN} custom={0.5} className="block__body">
                    {
                        Object.values(chemistryIdList).map((id) => (
                            <m.li variants={VARIANTS_SLIDE_UP}>
                                <ChemistrySummaryButton id={id} />
                            </m.li>
                        ))
                    }
                    <m.li variants={VARIANTS_SLIDE_UP}>
                        <Button
                            variant="outlined"
                            className="block--large flex-row"
                            sx={{ borderRadius: "16px" }}
                            onClick={handleAddChemistry}
                        >
                            <Add />
                            <p>새 여행 만들기</p>
                        </Button>
                    </m.li>
                </m.ul>
                </LazyMotion>
            </div>
        {/* </div> */}
        </RoutedMotionPage>
    );
}
export default ChemistryListContent;