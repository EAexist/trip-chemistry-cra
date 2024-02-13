import { Close, Menu } from "@mui/icons-material";
import { IconButton, Toolbar, AppBar as MuiAppBar, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Stack, Box, Button, ButtonBase, ListItemAvatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppBar } from "../../contexts/AppBarContext";
import { useStrings } from "../../texts";
import { CONTENTS } from "../../common/app-const";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserAvatar from "../Avatar/UserAvatar";
import { useUser } from "../../reducers/profileReducer";
import { useIsAuthorized } from "../../reducers/authReducer";

interface AppBarProps {
};

function AppBar({ }: AppBarProps) {

    const navigate = useNavigate();
    const strings = useStrings();
    
    const showAppBar = useAppBar();


    const { pathname }  = useLocation();

    const [showDrawer, setShowDrawer] = useState(false);

    /* Store */
    const isAuthorized = useIsAuthorized();
    const user = useUser();



    /* Event handlers  */
    const handleTitleButtonClick = () => {
        navigate('/home');        
    }
    const handleMenuButtonClick = () => {
        setShowDrawer(true);
    };
    const handleDrawerClose = () => {
        setShowDrawer(false);
    }
    const handleDrawerItemClick = (content: string) => {
        navigate(`/${content}`);
        handleDrawerClose();
    };
    const handleProfileClick = () => {
        navigate(`/login/oauth2/code/kakao`);
        handleDrawerClose();
    };

    useEffect(()=>{
        console.log(`[AppBar]\n\tpathname=${pathname}`);
    }, [ pathname ])

    useEffect(()=>{
        console.log(`[AppBar]\n\tuser=${JSON.stringify(user)}`);
    }, [ user ])

    return (
        showAppBar &&
        <div>
            <MuiAppBar>
                <Toolbar className="">
                    <ButtonBase style={{ height: '100%' }} onClick={handleTitleButtonClick}>
                    <h2 className='app-title'>{strings.public.common.title}</h2>
                    </ButtonBase>
                    {
                        showDrawer
                            ?
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="menu"
                                onClick={handleDrawerClose}
                            >
                                <Close />
                            </IconButton>
                            :
                            <IconButton
                                size="large"
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
                        <ListItem key={ "profile" }>
                            <ListItemButton onClick={handleProfileClick} disableGutters className="block--with-padding-x">
                                <ListItemAvatar>
                                    <UserAvatar showLabel={false}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        isAuthorized
                                        ?
                                        user.nickname
                                        : "로그인 해주세요"
                                    }
                                    secondary={
                                        isAuthorized && `${user.nickname}#${user.discriminator}`
                                    } 
                                />
                                {/* </div> */}
                            </ListItemButton>
                        </ListItem>
                        {
                            Object.keys(CONTENTS).map(( content ) =>
                                <ListItem key={ content }>
                                    <ListItemButton onClick={() => handleDrawerItemClick(content)} disableGutters selected={ pathname === `/${content}` }>
                                        <ListItemText 
                                            primary={
                                                strings.public.contents[content as keyof typeof strings.public.contents].label
                                            } 
                                            className="block--with-margin-x" 
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )
                        }
                    </List>
                </Drawer>
            </MuiAppBar>
            {/* <Toolbar /> */}
        </div>
    );
}
export default AppBar;