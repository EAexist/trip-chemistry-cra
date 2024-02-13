import { useSelector } from "react-redux";
import LazyImage from "./LazyImage";
import { RootState } from "../store";
import getImgSrc, { FORMATJPG, FORMATPNG } from "../utils/getImgSrc";
import { Height } from "@mui/icons-material";
import { IProfileId } from "../reducers";
import { useProfile } from "../reducers/profileReducer";

interface ProfileImageProps {
    id: IProfileId;
    showCharacterLabel?: boolean;
    renderLabel?: (id: IProfileId) => React.ReactNode;
};

function ProfileImage({ id, renderLabel, showCharacterLabel = true }: ProfileImageProps) {

    const tripCharacter = useSelector((state: RootState) => state.profile.data[id].data.testResult.data.tripCharacter);
    const { nickname } = useProfile( id );

    return (
        <div className="block--centered">
            <LazyImage
                alt={nickname}
                src={getImgSrc('/character', tripCharacter.id, FORMATPNG)}
                containerClassName="user-image__container"
                containerSx={{ height: "192px" }}
            />
            {
                ( renderLabel === undefined )
                    ?
                    <div>
                        <h3 className="typography-label">{ nickname }</h3>
                        {
                            showCharacterLabel 
                            && <p className="typography-note">
                                {`${ tripCharacter.prefix } ${ tripCharacter.name }`}
                            </p>
                        }
                    </div>
                    : renderLabel(id)
            }
        </div>
    );
}
export default ProfileImage;