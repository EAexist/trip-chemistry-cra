/* React */
/* React Packages */
import { Button, Toolbar } from "@mui/material";
import { domAnimation, LazyMotion, m } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { UserTestResultBlock } from "../../components/Profile/TestResultBlock";
import { FADEIN_VIEWPORT } from "../../motion/props";
import { RootState } from "../../store";
import { useStrings } from "../../texts";

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
            <LazyMotion features={domAnimation}>
                <m.div  {...FADEIN_VIEWPORT} className="block__body block--with-padding-x">
                    {/* <SectionPaper className="body__head"> */}
                    <m.h5 className="typography-heading">{strings.sections.tripCharacter.title}</m.h5>
                    <div className="block__body">
                        <UserTestResultBlock />
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
                </m.div>
            </LazyMotion>
        </div>
    );
}
export default ResultContent;