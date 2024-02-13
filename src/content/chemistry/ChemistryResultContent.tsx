/* React */
import { useEffect, useRef, useState } from "react";

/* React Packages */
import { useSelector } from "react-redux";
import { SwiperRef } from "swiper/react";
import { motion } from "framer-motion"

import { List, ListItem, Stack } from "@mui/material";

/* Trip Chemistry */
import { SLIDERPROPS_CHEMISTRY_BUDGET_FOOD, TEST } from "../../common/app-const";
import SectionPaper from "../../components/Paper/SectionPaper";
import { useStrings } from "../../texts";

import { useProfileIdList } from "../../reducers/profileReducer";
import { AppDispatch, RootState } from "../../store";
import { useChemistry, useSortedCityList } from "../../reducers/chemistryReducer";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import ChemistrySlider from "../../components/Slider/ChemistrySlider";
import CityChemistryContent from "./CityChemistryContent";
import ProfileAvatar from "../../components/Avatar/ProfileAvatar";
import TestResultBox from "../../components/Card/TestResultBox";
import ProfileImage from "../../components/ProfileImage";
import NavigationButton from "../../components/Button/NavigationButton";
import AvatarGroup from "../../components/Avatar/AvatarGroup";
import ToggleButton from "../../components/Button/ToggleButton";
import { useUserId } from "../../reducers/authReducer";

interface ChemistryResultContentProps {

};

function ChemistryResultContent({ }: ChemistryResultContentProps) {

    const teststrings = useStrings().public.contents.test;
    const strings = useStrings().public.contents.chemistry;

    /* States */
    const characterCarouselSwiperRef = useRef<SwiperRef>(null);
    const [characterSectionActiveUserIndex, setCharacterSectionActiveUserIndex] = useState<number>(0);

    /* Store */
    const userId = useUserId();
    const idList = useProfileIdList();

    const chemistry = useChemistry();

    const scheduleAnswerToProfiles = useValueToProfileIdList({ index: 'schedule', subIndex: 'schedule' });
    const budgetAnswerToProfiles = useValueToProfileIdList({ index: 'budget', subIndex: 'food' });

    const characterSectionCharacter = useSelector((state: RootState) =>
        state.profile.data[idList[characterSectionActiveUserIndex]].data.testResult.data.tripCharacter
    );

    const sortedCityList = useSortedCityList();

    useEffect(() => {
        console.log(`[ChemistryResultContent] budgetAnswerToProfiles=${JSON.stringify(budgetAnswerToProfiles)}`);
    }, [budgetAnswerToProfiles])

    return (
        <div className="block__body">
            <SectionPaper>
                <motion.h5 className="typography-heading">{strings.sections.tripCharacter.title}</motion.h5>
                <div className="block__body">
                    <Stack justifyContent={'center'} alignItems={'start'}>
                        {
                            idList.map((id, index) => (
                                <ToggleButton
                                    value={index}
                                    onChange={(_, value) => setCharacterSectionActiveUserIndex(value)}
                                    selected={characterSectionActiveUserIndex === index}
                                    className="toggle-button--button-base"
                                >
                                    <ProfileAvatar key={id} id={id} labelSize="lg" />
                                </ToggleButton>
                            ))
                        }
                    </Stack>
                    <div className="navigation-button__container">
                        <TestResultBox id={idList[characterSectionActiveUserIndex]} />
                        {
                            (characterSectionActiveUserIndex > 0) &&
                            <NavigationButton navigateTo="prev" onClick={() => setCharacterSectionActiveUserIndex((prev) => prev > 0 ? prev - 1 : prev)} />
                        }
                        {
                            (characterSectionActiveUserIndex < idList.length - 1) &&
                            <NavigationButton navigateTo="next" onClick={() => setCharacterSectionActiveUserIndex((prev) => prev < idList.length - 1 ? prev + 1 : prev)} />
                        }
                    </div>
                    <h3 className="typography-label">
                        {`${characterSectionCharacter.prefix} ${characterSectionCharacter.name}`}
                    </h3>
                    <p key={characterSectionActiveUserIndex}>
                        {characterSectionCharacter.body}
                    </p>
                </div>
            </SectionPaper>
            <SectionPaper>
                <motion.h5 className="typography-heading">{strings.sections.leadership.title}</motion.h5>
                <div className="block__body">
                    <Stack sx={{ justifyContent: 'center' }}>
                        {
                            chemistry.data && chemistry.data.leaderList.map((id) =>
                                <ProfileImage id={id} showCharacterLabel={false} />
                            )
                        }
                    </Stack>
                    <p>
                        { chemistry.data && chemistry.data.leaderList && strings.sections.leadership.body.map((string: string | undefined) => (
                            string === "/idList" ? <b>{chemistry.data &&  chemistry.data.leaderList?.map((id) => ` ${id} ${strings.sections.leadership.idPostfix}`).join(', ')}</b> : string
                        ))}
                    </p>
                </div>
            </SectionPaper>
            <SectionPaper>
                <motion.h5 className="typography-heading">{strings.sections.schedule.title}</motion.h5>
                <List>
                    {
                        (Object.values(teststrings.test.schedule.answers) as { icon: string, label: string, value: number }[]).map(({ icon, label, value }) => (
                            <ListItem disabled={!Object.keys(scheduleAnswerToProfiles).includes(String(value))}>
                                <Stack>
                                    <div className={Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? "typography-label" : ""}><p>{label}</p></div>
                                    <AvatarGroup>
                                        {
                                            (Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? scheduleAnswerToProfiles[value] : []).map((id) => (
                                                <ProfileAvatar id={id} />
                                            ))
                                        }
                                    </AvatarGroup>
                                </Stack>
                                {/* <ListItemAvatar></ListItemAvatar> */}
                            </ListItem>
                        )).reverse()
                    }
                </List>
                <div className="text"><p> 설명 </p></div>
            </SectionPaper>
            <SectionPaper>
                <motion.h5 className="typography-heading">{strings.sections.budget.title}</motion.h5>
                <div className="block__body">
                    <ChemistrySlider {...SLIDERPROPS_CHEMISTRY_BUDGET_FOOD} />
                    <p> 설명 </p>
                </div>
            </SectionPaper>
            <SectionPaper>
                <motion.h5 className="typography-heading">{strings.sections.city.title}</motion.h5>
                {
                    sortedCityList && sortedCityList.map((cityClass) => (
                        <div className="sub-section">
                            <CityChemistryContent cityClass={cityClass as keyof typeof TEST.city.subTests} />
                        </div>
                    ))
                }
            </SectionPaper>
            <div />
        </div>
    );
}
export default ChemistryResultContent;