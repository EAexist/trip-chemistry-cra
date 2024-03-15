import { Stack } from "@mui/material";

import { TEST_SECTIONS } from "../../../common/app-const";
import ToggleLabeledButton from "../../../components/Button/ToggleLabeledButton";
import withTestAnswer, { WithTestAnswerProps } from "../../../hocs/withTestAnswer";
import { useStrings } from "../../../texts";

interface AnswerButtonGroupProps extends WithTestAnswerProps {};

function AnswerButtonGroup( { testName, answer, setAnswer } : AnswerButtonGroupProps ){

    const strings = Object(useStrings().public.contents.test.test)[ TEST_SECTIONS[testName].type ];   

    const handleAnswerChange = ( value: number ) => {
        setAnswer( value );
    }   

    return(
        <Stack direction={"row"} spacing={2} justifyContent="space-around" alignItems="stretch" className="ButtonGroup--in-body"> 
        {
            ( Object.values(strings.answers) as { icon: string, display: string, label: string, value: number }[]).map(({ icon, display, label, value }) =>(
                <ToggleLabeledButton 
                    contained
                     key={ value } 
                     value={ value } 
                     selected={ value === answer } 
                     onChange={ (_, value) => handleAnswerChange( value ) } 
                     label={label} 
                     paperSx={{ }}
                >
                    {
                        <p className="typography-label" style={{ color: "inherit" }}>{ icon }</p>
                    }
                </ToggleLabeledButton>
            ))
        }
        </Stack>
    );
}

export default withTestAnswer( AnswerButtonGroup );