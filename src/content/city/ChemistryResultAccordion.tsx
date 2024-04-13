/* React */
import { useState } from "react";

/* React Packages */
import { ExpandMore, ThumbUp } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Divider, ListItemAvatar, ListItemText, Rating, Stack } from "@mui/material";

/* App */
import { TEST } from "../../common/app-const";
import FriendAvatar from "../../components/Avatar/FriendAvatar";
import { IProfile } from "../../interfaces/IProfile";
import { MotionList } from "../../motion/components/MotionList";
import { MotionListItem } from "../../motion/components/MotionListItem";
import { VARIANTS_STAGGER_CHILDREN } from "../../motion/props";
import { useCityChemistry, useIsChemistryEnabled, useProfileAll } from "../../reducers/chemistryReducer";
import { useStrings } from "../../texts";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";

interface ChemistryResultAccordionProps {
    cityClass: keyof typeof TEST.city.subTests;
};

function ChemistryResultAccordion({ cityClass }: ChemistryResultAccordionProps) {

    /* States */
    const [expanded, setExpanded] = useState<boolean>(false);

    /* Constants */
    const strings = useStrings().public.contents.test;

    const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    /* Reducers */
    const isChemistryEnabled = useIsChemistryEnabled();
    const score = useCityChemistry(cityClass);
    const answerList = (useProfileAll() as IProfile[]).map(({ id, testAnswer }) =>
        ({ id: id, answer: testAnswer[cityClass] })
    ).sort((a, b) => (b.answer as number) - (a.answer as number));

    const valueToProfileList = useValueToProfileIdList(cityClass);

    // useSelector((state: RootState) =>
    //     isChemistryEnabled
    //         ? Object.entries(state.chemistry.data.profileList).map(([id, { testAnswer }]) => (
    //             { id: id, answer: testAnswer[cityClass] }
    //         )).sort((a, b) => (b.answer as number) - (a.answer as number))
    //         : []
    // )

    return (
        isChemistryEnabled &&
        <>
            <div className="block--with-margin-x">
                <Accordion expanded={expanded} onChange={handleChange}>
                    <AccordionSummary
                        expandIcon={
                            <ExpandMore />
                        }
                        aria-controls="scores"
                        id="scores"
                        sx={{ padding: 0 }}
                    >
                        <Stack justifyContent={'space-between'} style={{ width: "100%" }}>
                            <Stack>
                                <Rating value={score} readOnly precision={0.5} size={"small"} />
                                <p>{Math.round(score * 10) / 10}</p>
                                {
                                    (score > 3.4) &&
                                    <ThumbUp fontSize="inherit" />
                                }
                            </Stack>
                            <p className="typography-note">
                                {
                                    expanded
                                        ? "답변 접기"
                                        : "친구들의 답변 보기"
                                }
                            </p>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                        {
                            expanded &&
                            <MotionList initial={"closed"} animate={"open"} variants={VARIANTS_STAGGER_CHILDREN}>
                                {/* {
                                    answerList.map(({ id, answer }) => (
                                        <MotionListItem key={id} >
                                            <ListItemAvatar>
                                                <FriendAvatar id={id} />
                                            </ListItemAvatar>
                                            <ListItemText primary={
                                                <Stack>
                                                    <Rating value={Number(answer)} readOnly precision={0.5} size={"small"} />
                                                    <p className="typography-note">{strings.test.city.answers[answer as keyof typeof strings.test.city.answers].label}</p>
                                                </Stack>
                                            } />
                                        </MotionListItem>
                                    ))
                                } */}
                                {
                                    Object.entries(valueToProfileList).reverse().map(([value, idList], index) => (
                                        <MotionListItem key={value} disablePadding>
                                            <ListItemAvatar style={{ width: "72px" }} className="block--centered">
                                                    <Rating value={Number(value)} readOnly max={Number(value)} sx={{ fontSize: "14px" }} />
                                                    <p className="typography-note">{strings.test.city.answers[Number(value) as keyof typeof strings.test.city.answers].label}</p>
                                            </ListItemAvatar>
                                            <ListItemText primary={
                                                <Stack spacing={-0.5}>
                                                    {
                                                        idList.map((id) => (
                                                            <FriendAvatar id={id} />
                                                        ))
                                                    }
                                                </Stack>
                                            } sx={{ marginLeft: "16px" }} />
                                        </MotionListItem>
                                    ))
                                }
                            </MotionList>
                        }
                    </AccordionDetails>
                </Accordion>
            </div>
            <Divider variant="middle" />
        </>
    );
}
export default ChemistryResultAccordion;