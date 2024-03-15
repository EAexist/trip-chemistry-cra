/* React */
import { useEffect, useRef, useState } from "react";

/* React Packages */
import { AirplaneTicket, Close, Error, GroupAdd, NavigateBefore } from "@mui/icons-material";
import { Alert, Avatar, Button, ButtonBase, Grid, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Paper, Stack, Toolbar } from "@mui/material";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

/* App */
import { useStrings } from "../../texts";

import FriendAvatar from "../../components/Avatar/FriendAvatar";
import NoticeBlock from "../../components/Block/NoticeBlock";
import SectionPaper from "../../components/Paper/SectionPaper";
import { LoadStatus } from "../../interfaces/enums/LoadStatus";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import { FADEIN_VIEWPORT } from "../../motion/props";
import { useGetProfile, useHasAnsweredTest, useIsAuthorized, useUserId } from "../../reducers/authReducer";
import { asyncGetChemistry, asyncJoinChemistry, useChemistry, useChemistryLoadStatus, useIsChemistryEnabled } from "../../reducers/chemistryReducer";
import { AppDispatch } from "../../store";
import getImgSrc, { FORMATPNG } from "../../utils/getImgSrc";
import LoadRequiredContent from "../LoadRequiredContent";
import ChemistryDetailContent from "./ChemistryDetailContent";
import HelmetWrapper from "../../helmet/HelmetWrapper";
import { Helmet } from "react-helmet-async";

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
    const handleClickNavigateBefore = () => {
        navigate('../myChemistry', { state: { navigateDirection: 'prev' } })
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
        navigate('searchAndInviteFriend', { state: { navigateDirection: 'next' } });
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
        <LoadRequiredContent
            status={chemistryLoadStatus}
            setStatus={setChemistryLoadStatus}
            handleSuccess={handleChemistrySuccess}
            handleFail={handleChemistryFail}
        >
        {/* MetaData
            Not Crawled.
            Open Graph Protocol Metadata for SNS(Kakaotalk, Instagram) Share.
        */}
        <HelmetWrapper
            title={ `여행 타입 테스트 | 친구들과의 여행을 준비해보세요.` }
            // description={ `DESCRIPTION` }
            description={ Object.values(profileList).length > 0 ? `${Object.values(profileList)[0].nickname}님의 ${title}. 참여하고 여행의 리더, 일정, 예산 그리고 여행지를 함께 결정해보세요.` : `${title}. 참여하고 여행의 리더, 일정, 예산 그리고 여행지를 함께 결정해보세요.` }
            keywords={"여행, 여행 일정, 여행지, 여행 계획, 여행 예산, 국내여행, 해외여행, MBTI"}
            url={"https://eaexist.github.io/tripchemistry"}
            image={"/static/images/meta/social-meta-iamge.jpg"}
        />
            <Toolbar />
            <RoutedMotionPage className="page min-fill-window flex block--gray block__body">
                <SectionPaper className="block__body body__head">
                    <div className="body__head typography-note">
                        {
                            isMember &&
                            <Button onClick={handleClickNavigateBefore} sx={{ padding: 0 }} startIcon={<NavigateBefore />}>
                                여행 목록
                            </Button>
                        }
                    </div>
                    <h2 className="typography-heading" style={{ marginTop: '0.5rem' }}>{title}</h2>
                    <div>
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
                                    <motion.div>
                                        {
                                            isInviteOptionsOpen
                                                ?
                                                <motion.div {...FADEIN_VIEWPORT} key={String(isInviteOptionsOpen)}>
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
                                                                <Grid item xs={6} display={"flex"} flexDirection={'column'}>
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
                                                </motion.div>
                                                :
                                                <motion.div className="flex">
                                                    <Button
                                                        onClick={() => setIsInviteOptionsOpen(true)}
                                                        startIcon={<GroupAdd />}
                                                        variant="outlined"
                                                        className="button--full"
                                                    >
                                                        친구 초대하기
                                                    </Button>
                                                </motion.div>
                                        }
                                    </motion.div>
                                )
                                :
                                <Button
                                    onClick={handleJoinChemistry}
                                    startIcon={<AirplaneTicket />}
                                    variant="outlined"
                                    className="button--full"
                                >
                                    참여하기
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
                        <Paper elevation={0}>
                            <NoticeBlock
                                alt={"invite"}
                                src={getImgSrc('/info', "invite", FORMATPNG)}
                                {
                                ...Object.keys(profileList).length < 2
                                    ?
                                    { body: "여행을 함께할 친구를 초대하고\n케미스트리를 확인해보세요." }
                                    :
                                    { body: "두 명 이상이 테스트를 완료하면 결과를 확인할 수 있어요." }
                                }
                                isFullscreen={false}
                            />
                        </Paper>
                }
                {
                    isMember && !hasAnsweredTest &&
                    <div className="placeholder" style={{ marginTop: 0 }}>
                        <div className="placeholder--button--full block--with-margin" />
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
                            className="block__body block--with-margin--small flex"
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
                                color="gray"
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
                            className="block--with-margin--small"
                        >
                            링크를 복사했어요.
                        </Alert>
                    </div>
                </Modal>
            </RoutedMotionPage>
            {
                isMember && !hasAnsweredTest &&
                <div className="floating--bottom flex">
                    <Button
                        onClick={handleStartTest}
                        variant="contained"
                        className="button--full block--with-margin"
                    >
                        테스트 하러가기
                    </Button>
                </div>
            }
        </LoadRequiredContent>
    );
}
export default ChemistryContent;