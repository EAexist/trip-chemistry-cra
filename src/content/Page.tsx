import { Outlet, ScrollRestoration } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";

interface PageProps {

};

function Page({ }: PageProps) {
    return (
        <>
            {/* <AppBar /> */}
            <Outlet />
            {/* https://reactrouter.com/en/main/components/scroll-restoration */}
            <ScrollRestoration
                getKey={(location, matches) => {
                    const paths = ["/test"];
                    console.log(`[ScrollRestoration] ${location.pathname}`)
                    return location.pathname;
                    return paths.includes(location.pathname)
                        ? // restore by pathname
                        location.pathname
                        : // everything else by location like the browser
                        location.key;
                }}
            />
        </>
    );
}
export default Page;