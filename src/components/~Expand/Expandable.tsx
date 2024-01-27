import { PropsWithChildren } from "react";
import { ButtonBase, Icon, IconButton } from "@mui/material";

/* App */
import '../../styles/index.css';

import { useExpandContext } from "./ExpandContext";

interface ExpandableProps{

};

function Expandable({ children } : PropsWithChildren<ExpandableProps> ){

    const { isExpanded, setIsExpanded } = useExpandContext();

    const handleItemClick = (cityId: string) => {
        setIsExpanded(true);
    }
    const handleClose = () => {
        setIsExpanded(false);
    }

    return(
        isExpanded ?
        <div className="expandable">
            <IconButton onClick={ handleClose } sx={{zIndex: 10}} className="expandable__button-close"><Icon>close</Icon></IconButton>
            { children }
        </div>
        : <ButtonBase onClick={() => handleItemClick('hi')} className="expandable">
            { children }
        </ButtonBase>
    );
}
export default Expandable;