/* React */
/* React Packages */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { useSelector } from "react-redux";
import { Button, Toolbar } from "@mui/material";

import {RootState } from "../../store";
import SectionPaper from "../../components/Paper/SectionPaper";
import { useStrings } from "../../texts";
import TestResultBox from "../../components/TestResultBox";
import { useUserId } from "../../reducers/authReducer";

interface ResultContentProps {

};

function ResultContent({ }: ResultContentProps) {

    const strings = useStrings().public.contents.result;

    const navigate = useNavigate();

    /* Store */
    const userId = useUserId();

    const character = useSelector((state: RootState) =>
        state.profile.data[userId].data.testResult.data.tripCharacter
    );

    /* Event Handlers */
    const handleChemistryButtonClick = () => {
        navigate('/chemistry');
    }
    return (
        <div className="page">
            <Toolbar />
            <div className="block__body content__body--gray">
                <SectionPaper className="body__head">
                    <motion.h5 className="typography-heading">{strings.sections.tripCharacter.title}</motion.h5>
                    <div className="block__body">
                        <TestResultBox id={userId} />
                        <h3 className="typography-label">
                            {character.name}
                        </h3>
                        <p>
                            {character.body}
                        </p>
                    </div>
                </SectionPaper>
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
                <div className="block--with-margin-x flex">
                    <Button
                        onClick={handleChemistryButtonClick}
                        variant="contained"
                    >
                        {strings.navigateToChemistryButton}
                    </Button>
                </div>
                <div className="block__body"><div/></div>
            </div>
        </div>
    );
}
export default ResultContent;