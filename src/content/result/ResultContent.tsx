/* React */
/* React Packages */
import { Button, Toolbar } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { UserTestResultBox } from "../../components/TestResultBox";
import { RootState } from "../../store";
import { useStrings } from "../../texts";
import { FADEIN_VIEWPORT, SLIDEINUPINVIEW } from "../../motion/props";

interface ResultContentProps {

};

function ResultContent({ }: ResultContentProps) {

    const strings = useStrings().public.contents.result;

    const navigate = useNavigate();

    /* Reducers */
    const character = useSelector((state: RootState) =>
        state.auth.data.profile.testResult.tripCharacter
    );

    /* Event Handlers */
    const handleChemistryButtonClick = () => {
        navigate('../myChemistry');
    }
    return (
        <div className="page">
            <Toolbar />
            <motion.div  {...FADEIN_VIEWPORT} className="block__body block--with-padding-x">
                {/* <SectionPaper className="body__head"> */}
                <motion.h5 className="typography-heading">{strings.sections.tripCharacter.title}</motion.h5>
                <div className="block__body">
                    <UserTestResultBox />
                    {
                        character.body.split("\n").map((text) =>
                            <p key={text}>{text}</p>
                        )
                    }
                </div>
                <div className="flex">
                    <Button
                        onClick={handleChemistryButtonClick}
                        variant="contained"
                        className="button--full"
                    >
                        {strings.navigateToChemistryButton}
                    </Button>
                </div>
                <div />
            </motion.div>
        </div>
    );
}
export default ResultContent;