import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";

interface PageProps {

};

function Page({ }: PageProps) {
    return (
        <>
            <AppBar />
            <Outlet />
        </>
    );
}
export default Page;