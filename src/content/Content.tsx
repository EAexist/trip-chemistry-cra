import styled from "styled-components";

const Content = styled.div<{ showAppBar : boolean }>(({ showAppBar }) => ({
    width: "100%",
    // marginTop: showAppBar ? "64px" : 0,
}));

export default Content;
