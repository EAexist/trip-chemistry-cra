/* React */
import { useEffect, useRef, useState } from "react";

/* React Packages */
import { useDispatch } from "react-redux";
import { useMotionValueEvent, useScroll } from "framer-motion"

import { Button, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { Add, Close, KeyboardArrowDown } from "@mui/icons-material";

/* Trip Chemistry */
import { useStrings } from "../../texts";

import { asyncGetProfile, asyncGetTestAnswer, asyncGetTestResult, deleteUser, setAllREST, setStatus, useProfileIdList, useProfileList } from "../../reducers/profileReducer";
import { AppDispatch } from "../../store";
import { LoadStatus, IProfileId } from "../../reducers";
import { useChemistryLoadStatus, useGetChemistry } from "../../reducers/chemistryReducer";
import ProfileAvatar from "../../components/Avatar/ProfileAvatar";
import { Outlet, useNavigate } from "react-router-dom";
import Tooltip from "../../components/Tooltip";
import LoadContent from "../LoadContent";
import { useUserId } from "../../reducers/authReducer";
import SectionPaper from "../../components/Paper/SectionPaper";

interface ChemistryContentProps {

};


function ChemistryContent({ }: ChemistryContentProps) {

    const strings = useStrings().public.contents.chemistry;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    /* Store */
    const userId = useUserId();
    const profileList = useProfileList();
    const idList = useProfileIdList();
    const isChemistryEnabled = idList.length > 1;

    const [chemistryLoadStatus, setChemistryLoadStatus] = useChemistryLoadStatus();

    const getChemistry = useGetChemistry();

    /* States */
    const [isChemistryUpdated, setIsChemistryUpdated] = useState<boolean>(false);
    const [isStartTooltipOpen, setIsStartTooltipOpen] = useState(false);

    const [characterSectionActiveIProfileId, setCharacterSectionActiveIProfileId] = useState<IProfileId | undefined>(userId);

    const resultContentTopRef = useRef<HTMLDivElement>(null);

    const [showFloatingButton, setShowFloatingButton] = useState<boolean>(true);
    
    /* Event Handlers */
    const handleDelete = (id: IProfileId) => {
        dispatch(deleteUser(id));
    }

    const handleAddFriendButtonClick = () => {
        navigate('/chemistry/addFriend');
    }

    const handleStartButtonClick = () => {
        console.log(`[ChemistryContent] handleStartButtonClick`);
        idList.forEach((id) => {
            dispatch(setStatus({ loadStatus: LoadStatus.PENDING, id }));
            dispatch(asyncGetProfile({id}));
        });
        getChemistry();
    };

    const handleScrollDown = () => {
        // window.scrollTo({ top: resultContentTopRef.current?.offsetTop, behavior: "smooth" });
        resultContentTopRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    const handleChemistryFail = () => {
        setChemistryLoadStatus(LoadStatus.REST);
    };

    const handleStartTooltipOpen = () => {
        if (!isChemistryEnabled) {
            setIsStartTooltipOpen(true);
        }
    };

    /* Side Effects  */

    useEffect(() => {
        if (chemistryLoadStatus === LoadStatus.SUCCESS) {
            dispatch(setAllREST());
            /* @TODO Animate */
            setChemistryLoadStatus(LoadStatus.REST);
            navigate('/chemistry/result');
            setIsChemistryUpdated(true);
        }
        console.log(`[ChemistryContent] chemistryLoadStatus=${chemistryLoadStatus}`);
    }, [chemistryLoadStatus, navigate, dispatch, setChemistryLoadStatus]);

    /* Motion */
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (scrollY.get() > window.innerHeight * 0.4) {
            setShowFloatingButton(false);
        }
        else {
            setShowFloatingButton(true);
        }
    })

    return (
        <LoadContent
            status={chemistryLoadStatus}
            setStatus={setChemistryLoadStatus}
            handleFail={handleChemistryFail}
        >
            <div className="page content__body--gray min-fullscreen" >
                <Toolbar />
                <SectionPaper>
                    <List>
                        {
                            profileList.map(({ id, nickname }) =>
                                <ListItem
                                    key={id}
                                    secondaryAction={
                                        (id !== userId) &&
                                        <IconButton aria-label="delete" onClick={() => handleDelete(id)}>
                                            <Close />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <ProfileAvatar id={id} showLabel={false} />
                                    </ListItemAvatar>
                                    <ListItemText primary={nickname} />
                                </ListItem>
                            )
                        }
                        <ListItem >
                            <ListItemButton onClick={handleAddFriendButtonClick} disableGutters>
                                <ListItemAvatar>
                                    <Add />
                                </ListItemAvatar>
                                <ListItemText primary={strings.sections.addFriend.addFriendButton} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </SectionPaper>
                {
                    !isChemistryUpdated &&
                    <div className="floating-placeholder--bottom" >
                        <Button>
                            <p>placeholder</p>
                        </Button>
                    </div>
                }
                <div ref={resultContentTopRef} className="scroll-target">
                    <Outlet />
                </div>
                {
                    (showFloatingButton) &&
                    <div className="floating--bottom" >
                        <Tooltip
                            open={isStartTooltipOpen}
                            onClose={() => setIsStartTooltipOpen(false)}
                            onOpen={handleStartTooltipOpen}
                            title={strings.sections.addFriend.tooltips.addAtLeastOneFriend}
                        >
                            <span className="block--with-margin-x flex">
                                <Button
                                    onClick={isChemistryUpdated ? handleScrollDown : handleStartButtonClick}
                                    variant="contained"
                                    className="flex-row"
                                >
                                    <p>
                                        {
                                            isChemistryUpdated
                                                ? strings.sections.addFriend.scrollDownButton
                                                : strings.sections.addFriend.startChemistryButton
                                        }
                                    </p>
                                    {
                                        isChemistryUpdated && <KeyboardArrowDown />
                                    }
                                </Button>
                            </span>
                        </Tooltip>
                    </div>
                }
            </div>
        </LoadContent>
    );
}
export default ChemistryContent;