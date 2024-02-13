import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Chip, Icon, IconButton, Stack } from "@mui/material";
import { LoadStatus, IProfileId } from "../../reducers";
import { RootState } from "../../store";
import { ITestResult } from "../../interfaces/ITestResult";
import { Close, QuestionMark } from "@mui/icons-material";
import { useProfileLoadStatus } from "../../reducers/profileReducer";
import getImgSrc, { FORMATPNG } from "../../utils/getImgSrc";
import ProfileImage from "../ProfileImage";
import { useUserId } from "../../reducers/authReducer";

interface TestResultBoxProps {
    id: IProfileId;
    handleClickDelete?: ( id: IProfileId ) => void;
    highlightCharacter?: boolean;
};


function TestResultBox({ id, handleClickDelete, highlightCharacter = false }: TestResultBoxProps) {

    const testResult: ITestResult = useSelector((state: RootState) => state.profile.data[id].data.testResult.data);
    const [ status, ] = useProfileLoadStatus(id, 'testResult');

    useEffect(() => {
        console.log(`[TestResultBox]: status=${status}`);
    }, [status])

    return (
        // status === LoadStatus.REST &&
        <div className="block__body">
            <ProfileImage id={ id } />
            <Stack sx={{ justifyContent: "center", flexWrap: "wrap" }} className="">
                {
                testResult.tripTagList?.map(( tag ) =>
                    <Chip key={ tag } icon={<Icon>question_mark</Icon>} label={ tag } />
                )
                }
            </Stack>
        </div>
    );
}

export default TestResultBox;