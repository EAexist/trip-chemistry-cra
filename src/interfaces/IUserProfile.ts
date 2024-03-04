import { IProfile, defaultProfile } from "./IProfile";

export interface IUserProfile extends IProfile {
    authProvider: string,
    authProviderNickname?: string,
    chemistryIdList: string[],
    tripList?: {
        [id: string]: {
            title: string,
            titleCity: string,
            profileList: {
                nickname: string,
                avatarId: string,
            }[]
        }
    };
};

export const defaultUserProfile : IUserProfile = {
    ...defaultProfile,
    // authProviderNickname: "",
    authProvider: "",
    chemistryIdList: [],
};