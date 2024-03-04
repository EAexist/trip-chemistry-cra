import { IWithLoadStatus, LoadStatus } from "../reducers";
import { ITestAnswer, defaultTestAnswer } from "./ITestAnswer";
import { ITestResult, defaultTestResult } from "./ITestResult";

export interface IProfile {
    id: string;
    nickname: string;
    discriminator: string;
    testAnswer: ITestAnswer;
    testResult: ITestResult;
    // testAnswer: IWithLoadStatus<ITestAnswer>;
    // testResult: IWithLoadStatus<ITestResult>;
};

export const defaultProfile = {
    id: "",
    nickname: "",
    discriminator: "",
    testAnswer: defaultTestAnswer,
    testResult: defaultTestResult,
};