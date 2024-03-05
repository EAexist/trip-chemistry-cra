/* React */
import { useEffect, useRef, useState } from "react";

/* React Packages */
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useDispatch } from "react-redux";

import { AirplaneTicket, Close, Error, GroupAdd } from "@mui/icons-material";
import { Alert, Avatar, Button, ButtonBase, Grid, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Stack, Toolbar } from "@mui/material";

/* Trip Chemistry */
import { useStrings } from "../../texts";

import { useNavigate, useParams } from "react-router-dom";
import SectionPaper from "../../components/Paper/SectionPaper";
import { LoadStatus } from "../../reducers";
import { useGetProfile, useHasAnsweredTest, useIsAuthorized, useUserId } from "../../reducers/authReducer";
// import { clearChemistry, useChemistryLoadStatus, useIsChemistryUpdated } from "../../reducers/chemistryReducer";
// import { deleteUser, setAllREST, useProfileIdList, useProfileList } from "../../reducers/profileReducer";
import LazyImage from "../../components/LazyImage";
import { asyncGetChemistry, asyncJoinChemistry, useChemistry, useChemistryLoadStatus, useIsChemistryEnabled } from "../../reducers/tripReducer";
import { AppDispatch } from "../../store";
import getImgSrc, { FORMATPNG } from "../../utils/getImgSrc";
import LoadContent from "../LoadContent";
import ChemistryDetailContent from "./ChemistryDetailContent";
import FriendAvatar from "../../components/Avatar/FriendAvatar";

interface ChemistryContentProps {

};


function ChemistryContent({ }: ChemistryContentProps) {

    const strings = useStrings().public.contents.chemistry;



    /* Hooks */
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const chemistryId = params.chemistryId ? params.chemistryId : "";

    /* Induced */
    const link = `http://localhost:3000/chemistry/${chemistryId}`;

    /* Reducers */
    const { title, profileList } = useChemistry();
    const isChemistryEnabled = useIsChemistryEnabled();
    const userId = useUserId();
    const isAuthorized = useIsAuthorized();
    const hasAnsweredTest = useHasAnsweredTest();
    const getProfile = useGetProfile();

    /* Induced */
    const isMember = Object.keys(profileList).includes(userId);

    const [chemistryLoadStatus, setChemistryLoadStatus] = useChemistryLoadStatus();

    /* States */
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isLinkCopiedAlertOpen, setIsLinkCopiedAlertOpen] = useState(false);
    const [isInviteOptionsOpen, setIsInviteOptionsOpen] = useState(false);

    // const [characterSectionActiveIProfileId, setCharacterSectionActiveIProfileId] = useState<IProfileId | undefined>(userId);

    const resultContentTopRef = useRef<HTMLDivElement>(null);

    const [showFloatingButton, setShowFloatingButton] = useState<boolean>(true);

    /* Event Handlers */
    // const handleDelete = (id: IProfileId) => {
    //     navigate('');
    //     dispatch( clearChemistry() );
    //     // dispatch( deleteUser(id) );
    // }

    // const handleStartButtonClick = () => {
    //     console.log(`[ChemistryContent] handleStartButtonClick`);
    //     idList.forEach((id) => {
    //         dispatch(setStatus({ loadStatus: LoadStatus.PENDING, id }));
    //         dispatch(asyncGetProfile({id}));
    //     });
    //     getChemistry();
    // };

    const handleScrollDown = () => {
        // window.scrollTo({ top: resultContentTopRef.current?.offsetTop, behavior: "smooth" });
        resultContentTopRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    const handleChemistryFail = () => {
        setChemistryLoadStatus(LoadStatus.REST);
    };

    const handleChemistrySuccess = () => {
        getProfile();
    }

    const handleStartTest = () => {
        navigate('../test');
    }

    const handleStartShare = () => {
        setIsShareModalOpen(true);
    }

    const handleStartSearch = () => {
        navigate('searchAndInviteFriend');
    }

    const handleCloseShareModal = () => {
        setIsShareModalOpen(false);
    };

    const handleCloseLinkCopiedAlert = () => {
        setIsLinkCopiedAlertOpen(false);
    };

    const handleCopyLink = async () => {
        /* https://sisiblog.tistory.com/301 */
        try {
            await navigator.clipboard.writeText(link);
            console.log('Content copied to clipboard');
            /* Resolved - 클립보드에 복사 성공 */
        } catch (err) {
            console.error('Failed to copy: ', err);
            /* Rejected - 클립보드에 복사 실패 */
        }
        setIsShareModalOpen(false);
        setIsLinkCopiedAlertOpen(true);

    }

    const handleJoinChemistry = isAuthorized
        ?
        () => {
            dispatch(asyncJoinChemistry({ userId, chemistryId }));
        }
        :
        () => {
            navigate('../login', { state: { loginRedirectPath: `chemistry/${chemistryId}` } });
        }


    /* Side Effects */

    /* 케미스트리 데이터 불러오기 */

    useEffect(() => {
        if (isLinkCopiedAlertOpen) {
            let timer = setTimeout(() => { setIsLinkCopiedAlertOpen(false) }, 2000);
        }
    }, [isLinkCopiedAlertOpen])

    useEffect(() => {
        console.log(`[ChemistryContent] chemistryId=${chemistryId}`);
        if (chemistryId) {
            dispatch(asyncGetChemistry(chemistryId));
        }
    }, [chemistryId, dispatch])

    useEffect(() => {
        if (chemistryLoadStatus === LoadStatus.SUCCESS) {
            // dispatch( setAllREST() );
            /* @TODO Animate */
            setChemistryLoadStatus(LoadStatus.REST);
        }
        console.log(`[ChemistryContent] chemistryLoadStatus=${chemistryLoadStatus}`);
    }, [chemistryLoadStatus, dispatch, setChemistryLoadStatus]);


    useEffect(() => {
        if (isShareModalOpen === false) {
            setIsInviteOptionsOpen(false);
        }
    }, [isShareModalOpen])

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
            handleSuccess={handleChemistrySuccess}
            handleFail={handleChemistryFail}
        >
            <Toolbar />
            <div className="page content__body--gray min-fullscreen block__body">
                <SectionPaper className="block__body body__head">
                    <h2 className="typography-heading body__head">{title}</h2>
                    <div>
                        <h4 className="typography-note">
                            함께하는 친구들
                        </h4>
                        <List>
                            {
                                Object.values(profileList).map(({ id, nickname, testAnswer }) =>
                                    <ListItem
                                        key={id}
                                        className={`${(testAnswer === null) && 'disabled'}`}
                                        secondaryAction={
                                            (testAnswer === null) &&
                                            <Stack>
                                                <Error />
                                                <p className='typography-note'>테스트 기다리는 중</p>
                                            </Stack>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <FriendAvatar id={id} showLabel={false} />
                                        </ListItemAvatar>
                                        <ListItemText primary={nickname} />
                                    </ListItem>
                                )
                            }
                        </List>
                    </div>
                    <div>
                        {
                            isMember
                                ?
                                (
                                    isInviteOptionsOpen
                                        ?
                                        <Grid container columnSpacing={2}>
                                            {
                                                [
                                                    {
                                                        onClick: handleStartShare,
                                                        icon: 'share',
                                                        label: '링크 공유'
                                                    },
                                                    {
                                                        onClick: handleStartSearch,
                                                        icon: 'person_search',
                                                        label: '소셜 로그인 회원 검색'
                                                    },
                                                ].map(({ onClick, icon, label }) => (
                                                    <Grid item xs={6} display={"flex"} alignItems={"stretch"} >
                                                        <Button
                                                            onClick={onClick}
                                                            startIcon={<Icon>{icon}</Icon>}
                                                            variant="outlined"
                                                            className="button--full"
                                                        >
                                                            {label}
                                                        </Button>
                                                    </Grid>

                                                ))
                                            }
                                        </Grid>
                                        :
                                        <Button
                                            onClick={() => setIsInviteOptionsOpen(true)}
                                            startIcon={<GroupAdd />}
                                            variant="outlined"
                                            className="button--full"
                                        >
                                            친구 초대하기
                                        </Button>
                                )
                                :
                                <Button
                                    onClick={handleJoinChemistry}
                                    startIcon={<AirplaneTicket />}
                                    variant="outlined"
                                    className="button--full"
                                >
                                    여행에 참여하기
                                </Button>
                        }
                    </div>
                </SectionPaper>
                {
                    isChemistryEnabled
                        ?
                        <ChemistryDetailContent />
                        :
                        /* 참여자를 한 명도 추가하지 않음. */
                        <SectionPaper className="block__body body--centered">
                            {
                                Object.keys(profileList).length < 2
                                    ?
                                    <>
                                        <LazyImage
                                            alt={"MISS"}
                                            src={getImgSrc('/info', "MISS", FORMATPNG)}
                                            containerClassName="load-content-item__image"
                                            containerSx={{ height: "256px", width: "256px" }}
                                        />
                                        <p>{"여행을 함께할 친구를 초대하고\n케미스트리를 확인해보세요."}</p>
                                    </>
                                    :
                                    /* 테스트를 완료한 참여자가 두명 미만임. */
                                    <>
                                        <LazyImage
                                            alt={"MISS"}
                                            src={getImgSrc('/info', "MISS", FORMATPNG)}
                                            containerClassName="load-content-item__image"
                                            containerSx={{ height: "256px", width: "256px" }}
                                        />
                                        <p>{"두 명 이상이 테스트를 완료하면 결과를 확인할 수 있어요."}</p>
                                    </>
                            }
                        </SectionPaper>
                }

                {
                    isMember && !hasAnsweredTest &&
                    <div className="floating--bottom">
                        <div className="block--with-margin">
                            <Button
                                onClick={handleStartTest}
                                variant="contained"
                                className="button--full"
                            >
                                테스트 하러가기
                            </Button>
                        </div>
                    </div>

                }

                {/* 링크 공유 모달 */}
                <Modal
                    open={isShareModalOpen}
                    onClose={handleCloseShareModal}
                >
                    <div className="floating--bottom">
                        <SectionPaper
                            square={false}
                            sx={{ borderRadius: "16px" }}
                            className="block__body block--with-margin--sm"
                        >
                            <Grid container className="body__head">
                                {
                                    [
                                        {
                                            onClick: handleCopyLink,
                                            icon: 'content_copy',
                                            label: '링크 복사'
                                        },
                                        {
                                            onClick: handleCopyLink,
                                            icon: 'more_horiz',
                                            label: '더보기'
                                        },
                                    ].map(({ onClick, icon, label }) => (
                                        <Grid item xs={3} display={"flex"} flexDirection={"column"} alignItems={"center"} >
                                            <ButtonBase onClick={onClick}>
                                                <Stack direction={"column"}>
                                                    <Avatar>
                                                        <Icon>{icon}</Icon>
                                                    </Avatar>
                                                    <p className="typography-note">{label}</p>
                                                </Stack>
                                            </ButtonBase>
                                        </Grid>

                                    ))
                                }
                            </Grid>
                            <Button
                                onClick={handleCloseShareModal}
                                variant="contained"
                                className="button--full"
                            >
                                닫기
                            </Button>
                        </SectionPaper>
                    </div>
                </Modal>
                <Modal
                    open={isLinkCopiedAlertOpen}
                    onClose={handleCloseLinkCopiedAlert}
                    hideBackdrop={true}
                >
                    <div className="floating--bottom">
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setIsLinkCopiedAlertOpen(false);
                                    }}
                                >
                                    <Close fontSize="inherit" />
                                </IconButton>
                            }
                            severity="success"
                            className="block--with-margin--sm"
                        >
                            링크를 복사했어요.
                        </Alert>
                    </div>
                </Modal>
            </div>
        </LoadContent>
    );
}
export default ChemistryContent;