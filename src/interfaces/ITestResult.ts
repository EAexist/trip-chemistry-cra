import { ITripCharacter, defaultTripCharacter } from "./ITripCharacter";

export interface ITestResult{
    // id?: string;
    tripTagList: string[];
    tripCharacter: ITripCharacter;
    // placeGroup: string[];
}
export const defaultTestResult : ITestResult = {
    tripTagList: [],
    tripCharacter: defaultTripCharacter,
}