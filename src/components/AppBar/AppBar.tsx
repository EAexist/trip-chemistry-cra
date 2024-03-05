import { Close, Menu } from "@mui/icons-material";
import { IconButton, Toolbar, AppBar as MuiAppBar, Drawer, List, ListItem, ListItemButton, ListItemText, Button, ListItemAvatar, Divider, ListSubheader, Avatar, Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppBar } from "../../contexts/AppBarContext";
import { useStrings } from "../../texts";
import { CONTENTS } from "../../common/app-const";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsAuthorized, useUserInfo } from "../../reducers/authReducer";
import Logo from "../Logo";
import PngIcon from "../PngIcon";
import UserAvatar from "../Avatar/UserAvatar";

interface AppBarProps {
};

function AppBar({ }: AppBarProps) {

    const navigate = useNavigate();
    const strings = useStrings();

    const showAppBar = useAppBar();


    const { pathname } = useLocation();

    const [showDrawer, setShowDrawer] = useState(false);

    /* Store */
    const isAuthorized = useIsAuthorized();
    const user = useUserInfo();

    /* Event handlers  */
    const handleTitleButtonClick = () => {
        navigate('home');
        handleDrawerClose();
    }
    const handleMenuButtonClick = () => {
        setShowDrawer(true);
    };
    const handleDrawerClose = () => {
        setShowDrawer(false);
    }
    const handleDrawerItemClick = (content: string) => {
        // if( content === 'login' ){
        //     navigate()
        // }
        navigate(`${content}`);
        handleDrawerClose();
    };

    useEffect(() => {
        console.log(`[AppBar]\n\tpathname=${pathname}`);
    }, [pathname])

    // useEffect(()=>{
    //     console.log(`[AppBar]\n\tuser=${JSON.stringify(user)}`);
    // }, [ user ])

    return (
        showAppBar &&
        <MuiAppBar>
            <Toolbar className="">
                <Button onClick={handleTitleButtonClick} className='app-title' startIcon={<Logo id={"app"} className="logo--lg" />}>
                    {strings.public.common.title}
                    {/* <h2 className='app-title'>{strings.public.common.title}</h2> */}
                </Button>
                {
                    showDrawer
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
            <Drawer
                anchor={'top'}
                open={showDrawer}
                onClose={handleDrawerClose}
            >
                <Toolbar />
                <List>
                    <ListSubheader disableGutters className="block--with-margin-x">{`내 정보`}</ListSubheader>
                    <ListItem key={"profile"}>
                        <ListItemButton onClick={() => handleDrawerItemClick(isAuthorized ? 'user' : 'login')} disableGutters className="block--with-padding-x">
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
                    </ListItem>
                    <Divider />
                    <ListSubheader disableGutters className="block--with-margin-x">{`서비스`}</ListSubheader>
                    {
                        Object.entries(CONTENTS).map(([content, { path, icon }]) =>
                            <ListItem key={content}>
                                <ListItemButton onClick={() => handleDrawerItemClick(path)} disableGutters selected={pathname === `/${path}`}
                                    className="block--with-padding-x">
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
                            </ListItem>
                        )
                    }
                </List>
            </Drawer>
        </MuiAppBar>
    );
}
export default AppBar;