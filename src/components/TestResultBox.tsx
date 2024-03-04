import { Chip, Icon, Stack } from "@mui/material";

import ProfileImage, { UserProfileImage } from "./ProfileImage";
import { useStrings } from "../texts";
import { TRIPTAG } from "../common/app-const";
import withUserProfile, { WithProfileProps } from "../hocs/withUserProfile";
import withFriendProfile from "../hocs/withFriendProfile";
import { useUserId } from "../reducers/authReducer";

interface TestResultBoxProps extends WithProfileProps {};

function TestResultBox({ id, testResult }: TestResultBoxProps) {

    const tripTagToLabel = useStrings().public.tripTag; 
    const userId = useUserId();

    return (
        // status === LoadStatus.REST &&
        <div className="block__body">
            {
                ( id === userId ) 
                ?
                <UserProfileImage/>
                :
                <ProfileImage id={ id } />
            }
            <Stack justifyContent={"center"} flexWrap={"wrap"} rowGap={1} >
                {
                testResult.tripTagList?.map(( tag ) =>
                    <Chip key={ tag } icon={<Icon>{ TRIPTAG[tag] }</Icon>} label={ tripTagToLabel[tag] } />
                )
                }
            </Stack>
        </div>
    );
}

export default withFriendProfile(TestResultBox);
const UserTestResultBox = withUserProfile(TestResultBox);
export { UserTestResultBox };