import { Close, Menu } from "@mui/icons-material";
import { IconButton, Toolbar, AppBar as MuiAppBar, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Stack, Box } from "@mui/material";
import { useState } from "react";
import { useAppBar } from "../../contexts/AppBarContext";
import { useStrings } from "../../texts";
import { CONTENTS } from "../../common/app-const";
import { Link, useNavigate } from "react-router-dom";

interface AppBarProps {
};

function AppBar({ }: AppBarProps) {

    const strings = useStrings();
    const navigate = useNavigate();
    const showAppBar = useAppBar();

    const [showDrawer, setShowDrawer] = useState(false);

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

    return (
        showAppBar &&
        <div>
            <MuiAppBar>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <h3 className='app-title'>{strings.public.common.title}</h3>
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
                        {
                            Object.keys(CONTENTS).map((content) =>
                                <ListItem>
                                    <ListItemButton onClick={() => handleDrawerItemClick(content)}>
                                        <ListItemText primary={strings.public.contents[content as keyof typeof strings.public.contents].label} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        }
                    </List>
                </Drawer>
            </MuiAppBar>
            <Toolbar />
        </div>
    );
}
export default AppBar;