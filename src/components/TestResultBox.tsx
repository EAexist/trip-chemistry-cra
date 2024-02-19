import { useSelector } from "react-redux";
import { Chip, Icon, Stack } from "@mui/material";

import { IProfileId } from "../reducers";
import { RootState } from "../store";
import { ITestResult } from "../interfaces/ITestResult";
import ProfileImage from "./ProfileImage";
import { useStrings } from "../texts";
import { TRIPTAG } from "../common/app-const";

interface TestResultBoxProps {
    id: IProfileId;
};


function TestResultBox({ id }: TestResultBoxProps) {

    const tripTagToLabel = useStrings().public.tripTag; 

    const testResult: ITestResult = useSelector((state: RootState) => state.profile.data[id].data.testResult.data);

    return (
        // status === LoadStatus.REST &&
        <div className="block__body">
            <ProfileImage id={ id } />
            <Stack sx={{ justifyContent: "center", flexWrap: "wrap" }} className="">
                {
                testResult.tripTagList?.map(( tag ) =>
                    <Chip key={ tag } icon={<Icon>{ TRIPTAG[tag] }</Icon>} label={ tripTagToLabel[tag] } />
                )
                }
            </Stack>
        </div>
    );
}

export default TestResultBox;