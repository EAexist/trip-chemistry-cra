import { Avatar, AvatarProps, Stack, useTheme } from "@mui/material";
import getImgSrc, { FORMATPNG } from "../../utils/getImgSrc";
import { IProfile } from "../../interfaces/IProfile";
import { useEffect } from "react";

interface LabeledAvatarProps extends AvatarProps, Pick<Partial<IProfile>, 'testResult' | 'nickname'> {
    characterId?: string
    showLabel?: boolean
    labelSize?: 'medium' | 'large' | 'xlarge';
};

function LabeledAvatar({ characterId, showLabel = true, labelSize, nickname, testResult, className, ...props }: LabeledAvatarProps) {

    const imageId = characterId ? characterId : testResult ? testResult.tripCharacter.id : ""
    const theme = useTheme();

    useEffect(()=>{
        console.log(`[LabeledAvatar] imageId=${imageId}`)
    }, [])

    return (
        <Stack
            spacing={0.75}
            direction={"column"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"fit-content"}
        >
            <Avatar
                alt={nickname}
                src={getImgSrc('/character', imageId, FORMATPNG)}
                className={`profile__avatar ${className}`}
                style={{ backgroundColor: theme.palette.primary.light }}
                {...props as AvatarProps}
            />
            {
                showLabel &&
                <p className={`Profile__label Profile__label-${labelSize} typography--profile-label`}>
                    { nickname }
                </p>
            }
        </Stack>
    );
}
export default LabeledAvatar;
export type { LabeledAvatarProps };
