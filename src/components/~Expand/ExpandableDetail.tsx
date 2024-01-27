import { PropsWithChildren } from "react";
import { useExpandContext } from "./ExpandContext";

interface ExpandableDetailProps{};

function ExpandableDetail({ children } : PropsWithChildren) {

    const { isExpanded } = useExpandContext();

    return(
        isExpanded ? children : <></>
    );
}
export default ExpandableDetail;