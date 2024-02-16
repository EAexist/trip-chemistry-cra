/* React */

/* React Packages */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"


import SectionPaper from "../../components/Paper/SectionPaper";
import { RESULT } from "../../common/app-const";
import { useStrings } from "../../texts";
import TestResultBox from "../../components/Card/TestResultBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Button, Toolbar } from "@mui/material";
import { asyncGetTestResult, useProfileLoadStatus, useProfileStatus, useUser } from "../../reducers/profileReducer";
import { useEffect, useState } from "react";
import { useUserId } from "../../reducers/authReducer";
import { IProfileId } from "../../reducers";

interface ResultContentProps {

};

function ResultContent({ }: ResultContentProps) {

    // const sectionIdToIndex = Object.fromEntries(RESULT.sections.map((value, index) => [value, index]));
    const strings = useStrings().public.contents.result;

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [isWaiting, setIsWaiting] = useState(true);

    /* Store */
    const userId = useUserId();

    const character = useSelector((state: RootState) =>
        state.profile.data[userId].data.testResult.data.tripCharacter
    );

    /* Event Handlers */
    const handleChemistryButtonClick = () => {
        navigate('/chemistry');
    }

    const handleFail = () => {
        navigate('/test');
    }

    const handleMiss = () => {
        navigate('/test');
    }

    return (
        <div className="page">
            <Toolbar />
            <div className="block__body content__body content__body--gray">
                <SectionPaper className="body__head">
                    <motion.h5 className="typography-heading">{strings.sections.tripCharacter.title}</motion.h5>
                    <div className="block__body">
                        <TestResultBox id={userId} />
                        <h3 className="typography-label">
                            {`${character.prefix} ${character.name}`}
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
                        <p>{strings.navigateToChemistryButton}</p>
                    </Button>
                </div>
                <div />
            </div>
        </div>
    );
}
export default ResultContent;