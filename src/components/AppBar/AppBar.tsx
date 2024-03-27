import { useEffect, useState } from "react";

import { Close, Menu } from "@mui/icons-material";
import { Avatar, Button, Divider, IconButton, ListItemAvatar, ListItemButton, ListItemText, AppBar as MuiAppBar, Toolbar, useTheme } from "@mui/material";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { CONTENTS } from "../../common/app-const";
import { MotionList } from "../../motion/components/MotionList";
import { MotionListItem } from "../../motion/components/MotionListItem";
import { MotionListSubheader } from "../../motion/components/MotionListSubheader";
import { VARIANTS_STAGGER_CHILDREN } from "../../motion/props";
import { useIsAuthorized, useUserInfo } from "../../reducers/authReducer";
import { useStrings } from "../../texts";
import UserAvatar from "../Avatar/UserAvatar";
import Logo from "../Logo";
import PngIcon from "../PngIcon";
import { useAppBar } from "./AppBarContext";

interface AppBarProps {
};

function AppBar({ }: AppBarProps) {

    /* Hooks */

    const navigate = useNavigate();
    const strings = useStrings();
    const openAppBar = useAppBar();
    const { pathname } = useLocation();
    const theme = useTheme();

    /* States */
    const [openDrawer, setOpenDrawer] = useState(false);
    const [animateDrawerClose, setAnimateDrawerClose] = useState(false);

    /* Reducers */
    const isAuthorized = useIsAuthorized();
    const user = useUserInfo();

    /* Event handlers  */
    const handleTitleButtonClick = () => {
        setAnimateDrawerClose(false);
        setOpenDrawer(false);
        navigate('home');
    }
    const handleMenuButtonClick = () => {
        setAnimateDrawerClose(true);
        setOpenDrawer(true);
    };
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    }
    const handleDrawerItemClick = (content: string) => {
        setAnimateDrawerClose(false);
        setOpenDrawer(false);
        navigate(`${content}`);
        // setAnimateDrawerLeaving(true);
    };

    useEffect(() => {
        console.log(`[AppBar]\n\tpathname=${pathname}`);
    }, [pathname])

    const variants_drawer = {
        open: {
            y: 0,
            transition: {
                duration: 0.5,
            }
        },
        closed: {
            y: '-100%',
            transition: {
                duration: 0.5,
                delay: 0.5,
            }
        }
    };



    return (
        openAppBar &&
        <>
            <MuiAppBar elevation={1}>
                <Toolbar className="">
                    <Button onClick={handleTitleButtonClick} className='app-title' startIcon={<Logo id={"app"} />}>
                        {strings.public.common.title}
                    </Button>
                    {
                        openDrawer
                            ?
                            <IconButton
                                edge="end"
                                aria-label="menu"
                                onClick={handleDrawerClose}
                            >
                                <Close />
                            </IconButton>
                            :
                            <IconButton
                                edge="end"
                                aria-label="menu"
                                onClick={handleMenuButtonClick}
                            >
                                <Menu />
                            </IconButton>
                    }
                </Toolbar>
            </MuiAppBar>
            {
                animateDrawerClose &&
                <LazyMotion features={domAnimation}>
                <AnimatePresence>
                    {
                        openDrawer &&
                        <m.div
                            initial={"closed"}
                            animate={"open"}
                            exit={"closed"}
                            variants={variants_drawer}
                            style={{ zIndex: `${theme.zIndex.appBar - 1}` }}
                            className="drawer"
                        >
                            <div
                                className="page fill-window"
                            >
                                <Toolbar />
                                <MotionList
                                    // initial={false}
                                    // animate={openDrawer ? "open" : "closed"}
                                    // initial={"open"}
                                    // exit={"closed"}
                                    variants={VARIANTS_STAGGER_CHILDREN}
                                >
                                    <MotionListSubheader disableGutters className="block--with-margin-x">{`내 정보`}</MotionListSubheader>
                                    <MotionListItem key={"profile"}>
                                        <ListItemButton
                                            onClick={() => handleDrawerItemClick('user')}
                                            selected={pathname.includes('user')}
                                            disableGutters
                                            className="block--with-padding-x"
                                        >
                                            <ListItemAvatar>{
                                                isAuthorized
                                                    ?
                                                    <UserAvatar showLabel={false} />
                                                    : <Avatar />
                                            }
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    isAuthorized
                                                        ?
                                                        user.nickname
                                                        : "로그인하기"
                                                }
                                            // secondary={
                                            //     isAuthorized ? getNameTag(user) : undefined
                                            // }
                                            />
                                        </ListItemButton>
                                    </MotionListItem>
                                    <Divider />
                                    <MotionListSubheader disableGutters className="block--with-margin-x">{`내 여행`}</MotionListSubheader>
                                    {
                                        Object.entries(CONTENTS).map(([content, { path, icon }]) =>
                                            <MotionListItem key={content} >
                                                <ListItemButton
                                                    onClick={() => handleDrawerItemClick(path)}
                                                    selected={pathname.includes(path)}
                                                    disableGutters
                                                    className="block--with-padding-x"
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar variant="rounded">
                                                            <PngIcon name={icon} />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            strings.public.contents[content as keyof typeof strings.public.contents].label
                                                        }
                                                    />
                                                </ListItemButton>
                                            </MotionListItem>
                                        )
                                    }
                                </MotionList>
                            </div>
                        </m.div>
                    }
                </AnimatePresence>
                </LazyMotion>
            }
        </>
    );
}
export default AppBar;