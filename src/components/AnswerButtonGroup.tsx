import { Button, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ContentKey, useContentString, useStrings } from "../texts";
import withTestAnswer, { WithTestAnswerProps } from "../hocs/withTestAnswer";
import { SX_AVATAR__ICON } from "../mui-material/sx";
import ToggleIconButton from "./Button/ToggleIconButton";

interface AnswerButtonGroupProps extends WithTestAnswerProps {

};

function AnswerButtonGroup( { testIndex, answer, setAnswer } : AnswerButtonGroupProps ){

    const strings = Object(useStrings().public.contents.test.test)[testIndex.index];   

    const handleAnswerChange = ( value: number ) => {
        setAnswer( value );
    }   

    return(
        <Stack direction={"row"} spacing={2} justifyContent="space-around" alignItems="stretch"> 
        {
            ( strings.answers as { icon: string, label: string, value: number }[]).map(({ icon, label, value }) =>(
                <ToggleIconButton value={ value } selected={ value === answer } onChange={ () => handleAnswerChange( value ) } label={ label }>
                    { icon }
                </ToggleIconButton>
                // <div key={label} className="avatar">
                //     <ToggleButton value={ value } selected={ value === answer } onChange={ () => handleAnswerChange( value ) }>
                //         { icon }
                //     </ToggleButton>
                //     <h6 className="avatar__label">{ label }</h6>
                // </div>
            ))
        }
        </Stack>
    );
}

// const LeadershipAnswerButtonGroup = withTestAnswer( AnswerButtonGroup )({ index: "leadership", subIndex: "leadership" });
// const ScheuleAnswerButtonGroup = withTestAnswer( AnswerButtonGroup )({ index: "Scheule", subIndex: "Scheule" });

export default withTestAnswer( AnswerButtonGroup );