/* React */
import { useEffect, useState } from "react";

/* React Packages */
import { AnimatePresence, m } from "framer-motion";
import { useSelector } from "react-redux";
import LazyDomAnimation from "../../motion/LazyDomAnimation";

import { List, ListItem, Stack } from "@mui/material";

/* App */
import { SLIDERPROPS_CHEMISTRY_BUDGET_FOOD, TEST } from "../../common/app-const";
import SectionPaper from "../../components/Paper/SectionPaper";
import { useStrings } from "../../texts";

import FriendAvatar from "../../components/Avatar/FriendAvatar";
import NavigationButton from "../../components/Button/NavigationButton";
import ToggleButton from "../../components/Button/ToggleButton";
import ProfileImage from "../../components/Profile/ProfileImage";
import TestResultBlock from "../../components/Profile/TestResultBlock";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import { FADEIN, FADEIN_VIEWPORT } from "../../motion/props";
import { useChemistry, useProfileAll, useProfileIdList, useSortedCityList } from "../../reducers/chemistryReducer";
import { RootState } from "../../store";
import CityChemistryContent from "./CityChemistryContent";
import ChemistrySlider from "./component/ChemistrySlider";

interface ChemistryDetailContentProps {

};

function ChemistryDetailContent({ }: ChemistryDetailContentProps) {

    /* Constants */
    const testStrings = useStrings().public.contents.test;
    const strings = useStrings().public.contents.chemistry;

    /* States */
    const [ characterSectionActiveUserIndex, setCharacterSectionActiveUserIndex ] = useState<number>(0);

    /* Reducers */
    const idList = useProfileIdList( false );
    const answeredProfileIdList = useProfileIdList();

    const chemistry = useChemistry();

    const scheduleAnswerToProfiles = useValueToProfileIdList('schedule');
    const budgetAnswerToProfiles = useValueToProfileIdList('food');

    const characterSectionCharacter = useSelector((state: RootState) =>
        state.chemistry.data.profileList[answeredProfileIdList[characterSectionActiveUserIndex]]?.testResult.tripCharacter
    );

    const leaderDataList = useProfileAll( chemistry?.leaderList, "nickname" );
    const follwerDataList = useProfileAll( answeredProfileIdList.filter( id => !chemistry?.leaderList.includes(id)), "nickname" );
    const leadershipAnswerToProfileList = useValueToProfileIdList("leadership");

    const sortedCityList = useSortedCityList();

    useEffect(() => {
        console.log(`[ChemistryDetailContent] budgetAnswerToProfiles=${JSON.stringify(budgetAnswerToProfiles)}`);
    }, [budgetAnswerToProfiles])

    return (
        <>
        <LazyDomAnimation>
            <SectionPaper>
                <m.h5 {...FADEIN_VIEWPORT} className="typography-heading">{strings.sections.tripCharacter.title}</m.h5>
                <m.div {...FADEIN_VIEWPORT} className="block__body">
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
                                    <FriendAvatar key={id} id={id} labelSize="large" />
                                </ToggleButton>
                            ))
                        }
                    </Stack>
                    <AnimatePresence mode={"wait"} initial={false}>
                        <m.div key={characterSectionActiveUserIndex} {...{...FADEIN, exit: "hidden" }} className="navigation-button__container">
                            <TestResultBlock key={characterSectionActiveUserIndex}id={answeredProfileIdList[characterSectionActiveUserIndex]} />
                            {
                                (characterSectionActiveUserIndex > 0) &&
                                <NavigationButton navigateTo="prev" onClick={() => setCharacterSectionActiveUserIndex((prev) => prev > 0 ? prev - 1 : prev)} />
                            }
                            {
                                (characterSectionActiveUserIndex < answeredProfileIdList.length - 1) &&
                                <NavigationButton navigateTo="next" onClick={() => setCharacterSectionActiveUserIndex((prev) => prev < answeredProfileIdList.length - 1 ? prev + 1 : prev)} />
                            }
                        </m.div>
                    </AnimatePresence>
                    <AnimatePresence mode={"wait"} initial={false}>
                        <m.p key={characterSectionActiveUserIndex} {...{...FADEIN, exit: "hidden" }} custom={0.5}>
                            {characterSectionCharacter?.body}
                        </m.p>
                    </AnimatePresence>
                </m.div>
            </SectionPaper>
            <SectionPaper>
                <m.h5 {...FADEIN_VIEWPORT} className="typography-heading">{strings.sections.leadership.title}</m.h5>
                <m.div {...FADEIN_VIEWPORT} className="block__body">
                    <Stack sx={{ justifyContent: 'center' }}>
                        {
                            Object.keys(Object.values(leadershipAnswerToProfileList)).length > 0 &&
                            Object.values(leadershipAnswerToProfileList).reverse()[0].map((id) =>
                                <ProfileImage id={id} showCharacterLabel={false} />
                            )
                        }
                    </Stack>
                    <Stack flexWrap={"wrap"} spacing={4} justifyContent={"center"}>
                        {
                            Object.keys(Object.values(leadershipAnswerToProfileList)).length > 1 &&
                            Object.entries(leadershipAnswerToProfileList).reverse().slice(1).map(([value, idList], index) => (
                                <Stack sx={{ flexWrap: "wrap" }}>
                                    <p className="typography-note">{testStrings.test.leadership.answers[Number(value) as keyof typeof testStrings.test.leadership.answers].label}</p>
                                    <Stack spacing={0.75}>
                                        {
                                            idList.map((id) => (
                                                <FriendAvatar id={id} />
                                            ))
                                        }
                                    </Stack>
                                </Stack>
                            ))
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
                </m.div>
            </SectionPaper>
            <SectionPaper>
                <m.h5 {...FADEIN_VIEWPORT} className="typography-heading">{strings.sections.schedule.title}</m.h5>                
                <m.div {...FADEIN_VIEWPORT} className="block__body">
                <List disablePadding>
                    {
                        (Object.values(testStrings.test.schedule.answers) as { icon: string, label: string, value: number }[]).map(({ icon, label, value }) => (
                            <ListItem disabled={!Object.keys(scheduleAnswerToProfiles).includes(String(value))} disableGutters>
                                <Stack spacing={4}>
                                    <div className={Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? "typography-label" : ""}><p>{label}</p></div>
                                    <Stack spacing={0.75}>
                                        {
                                            (Object.keys(scheduleAnswerToProfiles).includes(String(value)) ? scheduleAnswerToProfiles[value] : []).map((id) => (
                                                <FriendAvatar id={id} />
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
                </m.div>
            </SectionPaper>
            <SectionPaper>
                <m.h5 {...FADEIN_VIEWPORT} className="typography-heading">{strings.sections.budget.title}</m.h5>
                <m.div  {...FADEIN_VIEWPORT} className="block__body">
                    <div className="block--centered">
                        <ChemistrySlider {...SLIDERPROPS_CHEMISTRY_BUDGET_FOOD} />
                    </div>
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
                </m.div>
            </SectionPaper>
            <SectionPaper>
                <m.h5 {...FADEIN_VIEWPORT} className="typography-heading">{strings.sections.city.title}</m.h5>
                <ul>
                {
                    sortedCityList && sortedCityList.map((cityClass) => (
                        <m.li {...FADEIN_VIEWPORT}>
                            <CityChemistryContent cityClass={cityClass as keyof typeof TEST.city.subTests} />
                        </m.li>
                    ))
                }
                </ul>
            </SectionPaper>
            {/* <SectionPaper>
                <m.h5 className="typography-heading">{" 친구에게 결과 공유하기 "}</m.h5>
            </SectionPaper> */}
            {/* <div /> */}
            </LazyDomAnimation>
        </>
    );
}
export default ChemistryDetailContent;