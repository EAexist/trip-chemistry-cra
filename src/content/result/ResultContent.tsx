/* React */
/* React Packages */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { useSelector } from "react-redux";
import { Button, Toolbar } from "@mui/material";

import { RootState } from "../../store";
import SectionPaper from "../../components/Paper/SectionPaper";
import { useStrings } from "../../texts";
import TestResultBox, { UserTestResultBox } from "../../components/TestResultBox";
import { useUserId } from "../../reducers/authReducer";

interface ResultContentProps {

};

function ResultContent({ }: ResultContentProps) {

    const strings = useStrings().public.contents.result;

    const navigate = useNavigate();

    /* Store */
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
            <div className="block__body block--with-padding-x">
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
                {/* </SectionPaper> */}
                {/* <SectionPaper>
                <motion.h5 className="typography-heading">{strings.sections.city.title}</motion.h5>
                {
                    sortedCityList.map((cityClass) => (
                        <div className="sub-section">
                            <CityChemistryContent cityClass={cityClass as keyof typeof TEST.city.subTests} />
                        </div>
                    ))
                }
            </SectionPaper> */}
                <div>
                    <Button
                        onClick={handleChemistryButtonClick}
                        variant="contained"
                        className="button--full"
                    >
                        {strings.navigateToChemistryButton}
                    </Button>
                </div>
                <div />
            </div>
        </div>
    );
}
export default ResultContent;