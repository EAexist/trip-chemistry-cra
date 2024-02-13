import { AppBar, AppBarProps, styled } from "@mui/material";

const TopNavAppBar = styled( AppBar )<AppBarProps>(({ theme }) => ({
    elevation: 6,
    borderRadius: 0,
    // position: "sticky",
    top: "0px",
    zIndex: "10",
    // height: "px",
    // marginTop: "64px",
    display: "flex",
    justifyContent: "stretch",
    alignItems: "center",
}));

// const TopNavAppBarWithStep = withStepCheckpoint(TopNavAppBar);

export default TopNavAppBar;
// export { TopNavAppBarWithStep };
