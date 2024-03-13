import { Icon, Stack, useTheme } from "@mui/material";

import { useStrings } from "../../texts";
import withTestAnswer, { WithTestAnswerProps } from "../../hocs/withTestAnswer";
import ToggleProfileButton from "../Button/ToggleProfileButton";
import { TEST_SECTIONS } from "../../common/app-const";

interface AnswerButtonGroupProps extends WithTestAnswerProps {

};

function AnswerButtonGroup( { testName, answer, setAnswer } : AnswerButtonGroupProps ){

    const theme = useTheme();
    const strings = Object(useStrings().public.contents.test.test)[ TEST_SECTIONS[testName].type ];   

    const handleAnswerChange = ( value: number ) => {
        setAnswer( value );
    }   

    return(
        <Stack direction={"row"} spacing={2} justifyContent="space-around" alignItems="stretch" className="button-group--in-body"> 
        {
            ( Object.values(strings.answers) as { icon: string, display: string, label: string, value: number }[]).map(({ icon, display, label, value }) =>(
                <ToggleProfileButton contained key={ value } value={ value } selected={ value === answer } onChange={ (_, value) => handleAnswerChange( value ) } label={label} paperSx={{ border: `1px solid ${theme.palette.primary.main}` }}>
                    {
                        <p className="typography-label" style={{ color: "inherit" }}>{ icon }</p>
                    }
                </ToggleProfileButton>
            ))
        }
        </Stack>
    );
}

export default withTestAnswer( AnswerButtonGroup );