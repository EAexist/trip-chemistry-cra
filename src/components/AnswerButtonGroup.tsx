import { Stack } from "@mui/material";

import { useStrings } from "../texts";
import withTestAnswer, { WithTestAnswerProps } from "../hocs/withTestAnswer";
import ToggleProfileButton from "./Button/ToggleProfileButton";
import { TEST, TEST_SECTIONS } from "../common/app-const";

interface AnswerButtonGroupProps extends WithTestAnswerProps {

};

function AnswerButtonGroup( { testName, answer, setAnswer } : AnswerButtonGroupProps ){

    const strings = Object(useStrings().public.contents.test.test)[ TEST_SECTIONS[testName].type ];   

    const handleAnswerChange = ( value: number ) => {
        setAnswer( value );
    }   

    return(
        <Stack direction={"row"} spacing={2} justifyContent="space-around" alignItems="stretch" className="button-group--in-body"> 
        {
            ( Object.values(strings.answers) as { icon: string, label: string, value: number }[]).map(({ icon, label, value }) =>(
                <ToggleProfileButton contained size={'small'} key={ value } value={ value } selected={ value === answer } onChange={ (_, value) => handleAnswerChange( value ) } label={label}>
                    { icon }
                </ToggleProfileButton>
            ))
        }
        </Stack>
    );
}

// const LeadershipAnswerButtonGroup = withTestAnswer( AnswerButtonGroup )({ index: "leadership", subIndex: "leadership" });
// const ScheuleAnswerButtonGroup = withTestAnswer( AnswerButtonGroup )({ index: "Scheule", subIndex: "Scheule" });

export default withTestAnswer( AnswerButtonGroup );