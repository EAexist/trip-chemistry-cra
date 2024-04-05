/* React */
/* React Packages */
import { Button, Toolbar } from "@mui/material";
import { m } from "framer-motion";
import { useSelector } from "react-redux";
import LazyDomAnimation from "../../motion/LazyDomAnimation";

import { UserTestResultBlock } from "../../components/Profile/TestResultBlock";
import { FADEIN_VIEWPORT } from "../../motion/props";
import { RootState } from "../../store";
import { useStrings } from "../../texts";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";

interface ResultContentProps {

};

function ResultContent({ }: ResultContentProps) {

    const strings = useStrings().public.contents.result;

    const navigate = useNavigateWithGuestContext();

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
            <LazyDomAnimation>
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
            </LazyDomAnimation>
        </div>
    );
}
export default ResultContent;