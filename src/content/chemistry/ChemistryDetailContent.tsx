/* React */
import { useEffect, useState } from "react";

/* React Packages */
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { List, ListItem, Stack } from "@mui/material";

/* Trip Chemistry */
import { SLIDERPROPS_CHEMISTRY_BUDGET_FOOD, TEST } from "../../common/app-const";
import SectionPaper from "../../components/Paper/SectionPaper";
import { useStrings } from "../../texts";

import AvatarGroup from "../../components/Avatar/AvatarGroup";
import AvatarProfile from "../../components/Avatar/AvatarProfile";
import NavigationButton from "../../components/Button/NavigationButton";
import ToggleButton from "../../components/Button/ToggleButton";
import ProfileImage from "../../components/ProfileImage";
import ChemistrySlider from "../../components/Slider/ChemistrySlider";
import TestResultBox from "../../components/TestResultBox";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { useChemistry, useProfileAll, useProfileIdList, useSortedCityList } from "../../reducers/tripReducer";
import { RootState } from "../../store";
import CityChemistryContent from "./CityChemistryContent";
import { FriendProfileAvatar } from "../../components/Avatar/ProfileAvatar";

interface ChemistryDetailContentProps {

};

function ChemistryDetailContent({ }: ChemistryDetailContentProps) {

    const teststrings = useStrings().public.contents.test;
    const strings = useStrings().public.contents.chemistry;


    /* States */
    const [ characterSectionActiveUserIndex, setCharacterSectionActiveUserIndex ] = useState<number>(0);

    /* Store */
    const idList = useProfileIdList( false );
    const answeredProfileIdList = useProfileIdList();

    const chemistry = useChemistry();

    const scheduleAnswerToProfiles = useValueToProfileIdList('schedule');
    const budgetAnswerToProfiles = useValueToProfileIdList('food');

    const characterSectionCharacter = useSelector((state: RootState) =>
        state.trip.data.profileList[answeredProfileIdList[characterSectionActiveUserIndex]]?.testResult.tripCharacter
    );

    const leaderDataList = useProfileAll( chemistry?.leaderList, "nickname" );
    const follwerDataList = useProfileAll( answeredProfileIdList.filter( id => !chemistry?.leaderList.includes(id)), "nickname" );

    const sortedCityList = useSortedCityList();

    useEffect(() => {
        console.log(`[ChemistryDetailContent] budgetAnswerToProfiles=${JSON.stringify(budgetAnswerToProfiles)}`);
    }, [budgetAnswerToProfiles])

    return (
        <>
            <SectionPaper>
                <motion.h5 className="typography-heading">{strings.sections.tripCharacter.title}</motion.h5>
                <div className="block__body">
                    <Stack justifyContent={'center'} alignItems={'start'}>
                        {
                            answeredProfileIdList.map((id, index) => (
                                <ToggleButton
                                    key={id}
                                    value={index}
                                    onChange={(_, value) => setCharacterSectionActiveUserIndex(value)}
                                    selected={characterSectionActiveUserIndex === index}
                                    className="toggle-button--button-base"
                                >
                                    <AvatarProfile key={id} id={id} labelSize="lg" />
                                </ToggleButton>
                            ))
                        }
                    </Stack>
                    <div className="navigation-button__container">
                        <TestResultBox id={answeredProfileIdList[characterSectionActiveUserIndex]} />
                        {
                            (characterSectionActiveUserIndex > 0) &&
                            <NavigationButton navigateTo="prev" onClick={() => setCharacterSectionActiveUserIndex((prev) => prev > 0 ? prev - 1 : prev)} />
                        }
                        {
                            (characterSectionActiveUserIndex < answeredProfileIdList.length - 1) &&
                            <NavigationButton navigateTo="next" onClick={() => setCharacterSectionActiveUserIndex((prev) => prev < answeredProfileIdList.length - 1 ? prev + 1 : prev)} />
                        }
                    </div>
                    <p key={characterSectionActiveUserIndex}>
                        {characterSectionCharacter?.body}
                    </p>
                </div>
            </SectionPaper>
            <SectionPaper>
                <motion.h5 className="typography-heading">{strings.sections.leadership.title}</motion.h5>
                <div className="block__body">
                    <Stack sx={{ justifyContent: 'center' }}>
                        {
                            chemistry && chemistry.leaderList.map((id) =>
                                <ProfileImage id={id} showCharacterLabel={false} />
                            )
                        }
                    </Stack>
                    <p>
                        { strings.sections.leadership.body.map((string: string | undefined) => (
                            string === "/idList" 
                            ? chemistry && leaderDataList.map(( nickname, index ) =>
                                <>
                                    { index > 0 && ", "}
                                    <b>{` ${nickname} `}</b> 
                                    {strings.sections.leadership.idPostfix}
                                </>
                            )
                            : <>{string}</>
                        ))}
                    </p>
                    {
                        ( follwerDataList.length > 0) &&
                        <p>
                            { strings.sections.leadership.detail.map((string: string | undefined) => (
                                string === "/idList" 
                                ? chemistry && follwerDataList.map(( nickname, index ) =>
                                    <>
                                        { index > 0 && ", "}
                                        <b>{` ${nickname} `}</b> 
                                        {strings.sections.leadership.idPostfix}
                                    </>
                                )
                                : <>{string}</>
                            ))}
                        </p>
                    }
                </div>
            </SectionPaper>
            <SectionPaper>
                <motion.h5 className="typography-heading">{strings.sections.schedule.title}</motion.h5>                
                <div className="block__body">
                <List>
                    {
                        (Object.values(teststrings.test.schedule.answers) as { icon: string, label: string, value: number }[]).map(({ icon, label, value }) => (
                            <ListItem disabled={!Object.keys(scheduleAnswerToProfiles).includes(String(value))}>
                                <Stack spacing={4}>
                                    <div className={Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? "typography-label" : ""}><p>{label}</p></div>
                                    <Stack spacing={-0.25}>
                                        {
                                            (Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? scheduleAnswerToProfiles[value] : []).map((id) => (
                                                <FriendProfileAvatar id={id} />
                                            ))
                                        }
                                    </Stack>
                                </Stack>
                                {/* <ListItemAvatar></ListItemAvatar> */}
                            </ListItem>
                        )).reverse()
                    }
                </List>
                    {
                        chemistry?.scheduleChemistryText?.map(( body ) =>{
                            const list = body.split(/(%\S*%)/)
                            return ( 
                                <p>
                                    { 
                                        list.map(( t ) =>
                                            t[0] === "%"
                                            ? <b>{ t.replaceAll('%', '') }</b>
                                            : <>{t}</>    
                                        )                                     
                                    }
                                </p>
                            )
                        })
                    }
                </div>
            </SectionPaper>
            <SectionPaper>
                <motion.h5 className="typography-heading">{strings.sections.budget.title}</motion.h5>
                <div className="block__body">
                    <ChemistrySlider {...SLIDERPROPS_CHEMISTRY_BUDGET_FOOD} />
                    {
                        chemistry?.budgetChemistryText?.map(( body ) =>{
                            const list = body.split(/(%\S*%)/)
                            return ( 
                                <p>
                                    { 
                                        list.map(( t ) =>
                                            t[0] === "%"
                                            ? <b>{ t.replaceAll('%', '') }</b>
                                            : <>{t}</>    
                                        )                                     
                                    }
                                </p>
                            )
                        })
                    }
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
            {/* <SectionPaper>
                <motion.h5 className="typography-heading">{" 친구에게 결과 공유하기 "}</motion.h5>
            </SectionPaper> */}
            <div />
        </>
    );
}
export default ChemistryDetailContent;