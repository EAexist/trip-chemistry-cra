/*** React ***/
import { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

/*** Trip Chemistry ***/
/* Component */
import { AppDispatch, RootState } from "../store";
import { IWithLoadStatus, LoadStatus, IProfileId } from ".";
import { ITestAnswer, TestIndex } from "./testAnswerReducer";
import { ITestResult, defaultTestResult } from "../interfaces/ITestResult";
import { HEADERS_AXIOS } from "../common/app-const";
import axios from "axios";
import { useUserId } from "./authReducer";

/* Types */
type IProfileDataState = {
    data: { [id: IProfileId]: IWithLoadStatus<IProfile> };
    sampleLoadStatus: LoadStatus;
};

export interface IProfile {
    id: string;
    nickname: string;
    discriminator: string;
    testAnswer: IWithLoadStatus<ITestAnswer>;
    testResult: IWithLoadStatus<ITestResult>;
};

export const defaultProfile : IProfile =  {
    id: "",
    nickname: "",
    discriminator: "",
    testResult: { data: defaultTestResult, loadStatus: LoadStatus.REST },
    testAnswer: { data: {}, loadStatus: LoadStatus.REST },
}

export interface IProfileDTO {
    id: string;
    nickname: string;
    discriminator: string;
    testAnswer: ITestAnswer;
    testResult: ITestResult;
};

const withloadStatus = <T extends {}>( data? : T, defaultData? : T ) => ({
    data: data ? data : defaultData,
    loadStatus : LoadStatus.REST
} as IWithLoadStatus<T>)

export const profileDTOtoProfile = ( profileDTO : IProfileDTO ) => ({
    ...profileDTO,
    testAnswer: withloadStatus(profileDTO.testAnswer, {} as ITestAnswer ),
    testResult: withloadStatus(profileDTO.testResult, defaultTestResult),
} as IProfile)

type ProfileKey = 'testAnswer' | 'testResult';

/* Debug */
const initialState: IProfileDataState = {
    data : {},
    sampleLoadStatus: LoadStatus.REST,
    // idList: [],
    // data: {
        // [userId]: {
        //     testAnswer: {
        //         loadStatus: LoadStatus.REST,
        //         data: {
        //             leadership: {
        //                 leadership: 1
        //             },
        //             schedule: {
        //                 schedule: 5
        //             },
        //             budget: {
        //                 food: 15000, /* 식사 평균 */
        //             },
        //             city: {
        //                 metropolis: 1,
        //                 history: 3,
        //                 nature: 5,
        //             },
        //         } as ITestAnswer,
        //     },
        //     testResult: {
        //         loadStatus: LoadStatus.REST,
        //         data: {
        //             tripTagList: ['여행', '태그'],
        //             tripCharacter: {
        //                 id: "bee",
        //                 name: "벌꿀형",
        //                 prefix: "부지런한",
        //                 body: "부지런한 벌꿀형은 이러쿵 저러쿵 어쩌고 저쩌고",
        //             },
        //         } as ITestResult,
        //     }
        // }
    // },
    // loadStatus: LoadStatus.PENDING,
};

// const initialState : IProfileDataState = {
//     idList: [],
//     data: {
//         [ userId ]: {
//             testAnswer: {
//                 loadStatus: LoadStatus.REST,
//                 data: {} as ITestAnswer,
//             },
//             testResult: {
//                 loadStatus: LoadStatus.REST,
//                 data: {} as ITestResult,
//             }
//         }
//     },
//     search: {},
//     chemistry: {
//         loadStatus: LoadStatus.REST,
//         data: {
//             leaderList: ["디클1234"],
//         } 
//     },
//     sampleResultLoadStatus: LoadStatus.PENDING,

//     loadStatus: LoadStatus.PENDING,
// };

export const asyncGetProfile = createAsyncThunk("profileSlice/asyncGetProfile",
    async ({ id, keyList = [] }:{ id: IProfileId, keyList?: ProfileKey[] }, thunkAPI) => {
        console.log(`[asyncGetInfo] GET /profile?id=${id}`);
        try {
            const response = await axios.get(`/profile`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: { 
                        id: id,
                    },
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncGetInfo] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const asyncGetInfo = createAsyncThunk("profileSlice/asyncGetInfo",
    async ({ id, keyList = [] }:{ id: IProfileId, keyList?: ProfileKey[] }, thunkAPI) => {
        console.log(`[asyncGetInfo] GET /profile/info?id=${id}`);
        try {
            const response = await axios.get(`/profile/info`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: { 
                        id: id,
                    },
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncGetInfo] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const asyncGetTestResult = createAsyncThunk("profileSlice/asyncGetTestResult",
    async ( id: IProfileId, thunkAPI ) => {
        console.log(`[asyncGetTestResult] GET /profile/result?id=${id}`);
        try {
            const response = await axios.get(`/profile/result`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: { id: id },
                });
            return { id, ...response.data };
        }
        catch (e: any) {
            console.log(`[asyncGetTestResult] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const asyncGetTestAnswer = createAsyncThunk("profileSlice/asyncGetTestAnswer",
    async ( id: IProfileId, thunkAPI) => {
        console.log(`[asyncGetTestAnswer] GET /profile/answer?id=${id}`);
        try {
            const response = await axios.get(`/profile/answer`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: { id: id },
                });
            return { id, ...response.data };
        }
        catch (e: any) {
            console.log(`[asyncGetTestAnswer] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const asyncGetSampleProfiles = createAsyncThunk("profileSlice/asyncGetSampleProfiles",
    async ( _, thunkAPI) => {
        console.log(`[asyncGetSampleProfiles] GET /profile/sample`);
        try {
            const response = await axios.get(`/profile/sample`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncGetSampleProfiles] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        addProfile: (state, action: PayloadAction<IProfileId>) => {
            if (Object.keys(state).includes(action.payload)) {
                console.log(`[profile.addProfile] warning: id ${action.payload} already exists.`)
            }
            state.data[action.payload] = {
                // ...state.data[action.payload],
                data : {
                    ...defaultProfile,
                    id: action.payload,
                },
                loadStatus: LoadStatus.REST
            };
        },
        setProfile: (state, action: PayloadAction<IProfile>) => {
            console.log(`[profile.setProfile]\n\tid=${action.payload.id} data=${JSON.stringify(action.payload)}`);
            state.data[action.payload.id] = {
                data: action.payload,
                loadStatus: LoadStatus.REST
            };
        },
        setStatus: (state, action: PayloadAction<{ loadStatus: LoadStatus, id?: IProfileId, key?: ProfileKey}>) => {
            if (action.payload.id !== undefined) {
                if (action.payload.key === undefined) {
                    state.data[action.payload.id].loadStatus = action.payload.loadStatus;
                }
                else {
                    state.data[action.payload.id].data[action.payload.key].loadStatus = action.payload.loadStatus;
                }
            }
        },
        setAllREST: (state) => {
            Object.entries( state.data ).forEach(([, { data }]) => {
                data.testAnswer.loadStatus = LoadStatus.REST;
                data.testResult.loadStatus = LoadStatus.REST;
            })
        },
        setStatusAll: (state, action: PayloadAction<{ loadStatus: LoadStatus, key: ProfileKey }>) => {
            Object.entries( state.data ).forEach(([, { data }]) => {
                data[action.payload.key].loadStatus = action.payload.loadStatus;
            })
        },
        deleteUser: (state, action: PayloadAction<IProfileId>) => {
            delete state.data[action.payload];
        },
    },
    extraReducers: (builder) => {

        /* asyncGetInfo */
        builder.addCase(asyncGetProfile.fulfilled, (state, action: PayloadAction<IProfileDTO>) => {
            console.log(`[asyncGetProfile] fulfilled\n\taction.payload=${JSON.stringify(action.payload as IProfileDTO)}\n }`);
            state.data[action.payload.id].data = {
                ...state.data[action.payload.id].data,
                ...profileDTOtoProfile(action.payload),
            };
            state.data[action.payload.id].loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncGetProfile.pending, (state, action) => {
            console.log(`[asyncGetProfile] pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.data[action.meta.arg.id].loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetProfile.rejected, (state, action) => {
            console.log(`[asyncGetProfile] rejected`);
            state.data[action.meta.arg.id].loadStatus = LoadStatus.FAIL;
        });

        /* asyncGetInfo */
        builder.addCase(asyncGetInfo.fulfilled, (state, action: PayloadAction<IProfileDTO>) => {
            console.log(`[asyncGetInfo] fulfilled\n\taction.payload=${JSON.stringify(action.payload as IProfileDTO)}\n }`);
            state.data[action.payload.id].data = {
                ...state.data[action.payload.id].data,
                ...profileDTOtoProfile(action.payload),
            };
            state.data[action.payload.id].loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncGetInfo.pending, (state, action) => {
            console.log(`[asyncGetInfo] pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.data[action.meta.arg.id].loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetInfo.rejected, (state, action) => {
            console.log(`[asyncGetInfo] rejected`);
            state.data[action.meta.arg.id].loadStatus = LoadStatus.FAIL;
        });

        /* asyncGetTestResult */
        builder.addCase(asyncGetTestResult.fulfilled, (state, action: PayloadAction<{ id: IProfileId, testResult: ITestResult }>) => {
            console.log(`[asyncGetTestResult] fulfilled\n\taction.payload=${JSON.stringify(action.payload)}\n }`)
            if ( action.payload.testResult ){
                state.data[action.payload.id].data = {
                    ...state.data[action.payload.id].data,
                    testResult: {
                        data: action.payload.testResult,
                        loadStatus: LoadStatus.SUCCESS,
                    }
                }
            }
            else {             
                state.data[action.payload.id].data.testResult.loadStatus = LoadStatus.MISS;   
            }
        });
        builder.addCase(asyncGetTestResult.pending, (state, action) => {
            console.log(`[asyncGetTestResult] pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.data[action.meta.arg].data.testResult.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetTestResult.rejected, (state, action) => {
            console.log(`[asyncGetTestResult] rejected`);
            state.data[action.meta.arg].data.testResult.loadStatus = LoadStatus.FAIL;
        });

        /* asyncGetTestAnswer */
        builder.addCase(asyncGetTestAnswer.fulfilled, (state, action: PayloadAction<{ id: IProfileId, testAnswer: ITestAnswer }>) => {
            console.log(`[asyncGetTestAnswer] fulfilled\n\taction.payload=${JSON.stringify(action.payload)}\n }`)
            console.log(`[asyncGetTestAnswer] fulfilled\n\taction.payload.testAnswer=${action.payload.testAnswer} type=${typeof(action.payload.testAnswer)}\n }`)
            if ( action.payload.testAnswer ){
                state.data[action.payload.id].data = {
                    ...state.data[action.payload.id].data,
                    testAnswer: {
                        data: action.payload.testAnswer,
                        loadStatus: LoadStatus.SUCCESS,
                    }
                }
            }
            else {             
                state.data[action.payload.id].data.testAnswer.loadStatus = LoadStatus.MISS;   
            }
        });
        builder.addCase(asyncGetTestAnswer.pending, (state, action) => {
            console.log(`[asyncGetTestAnswer].pending`);
            state.data[action.meta.arg].data.testAnswer.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetTestAnswer.rejected, (state, action) => {
            console.log(`[asyncGetTestAnswer].rejected`);
            state.data[action.meta.arg].data.testAnswer.loadStatus = LoadStatus.FAIL;
        });

        /* asyncGetSampleProfiles */
        builder.addCase(asyncGetSampleProfiles.fulfilled, (state, action: PayloadAction<IProfileDTO[]>) => {
            console.log(`[asyncGetSampleProfiles] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
            state.data = {
                ...state.data,
                ...Object.fromEntries( action.payload.map( profileDTO => [ profileDTO.id, withloadStatus( profileDTOtoProfile(profileDTO) ) ] ) )
            } 
            state.sampleLoadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncGetSampleProfiles.pending, (state, action) => {
            console.log(`[asyncGetSampleProfiles] pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.sampleLoadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetSampleProfiles.rejected, (state, action) => {
            console.log(`[asyncGetSampleProfiles] rejected`);
            state.sampleLoadStatus = LoadStatus.FAIL;
        });

    },
})

export const useProfile : ( id? : IProfileId ) => IProfile = ( id ) => {
    return ( useSelector(( state: RootState ) => id ? ( Object.keys( state.profile.data ).includes( id ) ? state.profile.data[ id ].data : { id : "HI", nickname: "HI" } as IProfile ) : defaultProfile ) );
}

export const useProfileList : () => IProfile[] = ( ) => {
    return ( useSelector(( state: RootState ) => Object.values( state.profile.data ).map(({ data, loadStatus }) => data )));
}

export const useUser : ( ) => IProfile = ( ) => {
    const userId = useUserId();
    return useProfile(userId);
}

export const useProfileStatus = (idList: IProfileId[], key: 'testResult' | 'testAnswer') => {

    const dispatch = useDispatch<AppDispatch>();

    return (useSelector((state: RootState) => idList.map((id) => ({
        status: state.profile.data[id].data[key].loadStatus,
        setStatus: (loadStatus: LoadStatus) => {
            dispatch(profileSlice.actions.setStatus({ loadStatus, id, key }));
        }
    })
    )));
}

export const useProfileLoadStatus = ( id: IProfileId, key?: ProfileKey ) => {
    const isAdded = useProfileIdList().includes(id);
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    return ([
        useSelector((state: RootState) => isAdded ? ( key ? state.profile.data[id].data[key].loadStatus : state.profile.data[id].loadStatus ) : undefined),
        useCallback((loadStatus: LoadStatus) => {
            if (isAdded) {
                dispatch( profileSlice.actions.setStatus({ loadStatus, id, key })) ;
            }
        }, [dispatch, id, key, isAdded])
    ] as const);
}

const useProfileIdList = () => {
    const idList = useSelector((state: RootState) => Object.keys(state.profile.data), shallowEqual);
    // const idList = useSelector(( state:RootState ) => state.profile.idList );
    useEffect(() => {
        console.log(`useProfileList: idList=${idList}`);
    }, [idList])
    /* Use ShallowEqual */
    return (idList);
}

const useTestAnswerObject = (testIndex: TestIndex) => {

    useEffect(() => {
        console.log(`[useTestAnswerObject] Using`);
    }, [])

    return (
        useSelector((state: RootState) =>
            Object.fromEntries(
                Object.entries( state.profile.data ).map(([id, { data }]) => {
                    console.log(`[useTestAnswerObject]\n id=${id}\n profile.testAnswer.data=${JSON.stringify(data.testAnswer.data)}`);
                    return ([id, data] as const);
                }).filter(([, data]) => data.testAnswer.loadStatus === LoadStatus.REST && Object.keys(data.testAnswer.data).length > 0)
                    .map(([id, data]) => {
                        return ([id, data.testAnswer.data[testIndex.index][testIndex.subIndex]] as const)
                    })
            )
            , shallowEqual
        )
    );
};

const useTestResultObject = () => {
    return (
        useSelector((state: RootState) =>
            Object.fromEntries(
                Object.entries( state.profile.data ).map(([id, { data }]) =>
                    [id, data.testResult.data]
                )
            )
        )
    );
};

const useTestResult = (id: IProfileId) => useSelector((state: RootState) =>
    state.profile.data[id].data.testResult.data
)

const useFindUser = () => {
    const idList = useProfileIdList();

    return useCallback((id: IProfileId) => (
        idList.includes(id)
    )
        , [idList]);
}

/* 1 id */
const useLoadData = (id: IProfileId, key: ProfileKey) => {
    const [doWaitApi, setDoWaitApi] = useState<boolean>(true);
    const [status, setStatus] = useProfileLoadStatus(id, key);

    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

    /* 테스트 결과 Fetch */
    useEffect(() => {
        dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id, key }));
        if (key === 'testResult') {
            dispatch(asyncGetTestResult(id));
        }
        else if (key === 'testAnswer') {
            dispatch(asyncGetTestAnswer(id));
        }
        setDoWaitApi(false);
    }, [id, key, dispatch]);

    useEffect(() => {
        if (status === LoadStatus.SUCCESS) {
            setStatus(LoadStatus.REST);
        }
    }, [status, setStatus])

    return ({ status: status, setStatus: setStatus, doWaitApi: doWaitApi });
};

const useHandleSuccessAll = (status: LoadStatus, setStatus: (loadStatus: LoadStatus) => void, key: ProfileKey) => {
    const dispatch = useDispatch();
    // const [ isSucess, setIsSuccess ]= useState();

    // useEffect(()=>{
    //     const isSuccess = status === LoadStatus.SUCCESS;        
    // })


    useEffect(() => {
        console.log(`[useHandleSuccessAll] status updated: status=${status}`);
        if (status === LoadStatus.SUCCESS) {
            dispatch(setStatusAll({ loadStatus: LoadStatus.REST, key: key }));
            setStatus(LoadStatus.REST);
        }
    }, [status])
}

/* Multiple Profiles */
const useLoadDataAll = (idList: IProfileId[], key: ProfileKey) => {

    const [doWaitApi, setDoWaitApi] = useState<boolean>(true);
    const [status, setStatus] = useProfileLoadStatusAll(key);

    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

    /* 테스트 결과 Fetch */
    const getDataAll = useCallback(() => {
        console.log(`[useLoadDataAll]-[getDataAll]: idList=${idList} key=${key}`);

        const fetch = key === 'testResult' ?
            (id: IProfileId) => dispatch(asyncGetTestResult(id))
            : (id: IProfileId) => dispatch(asyncGetTestAnswer(id));

        idList.forEach((id) => {
            dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id, key }));
            fetch(id);
        })
        setDoWaitApi(false);
    }, [idList, key, dispatch]);

    useEffect(() => {
        console.log(`[useLoadDataAll] Calling`);
    }, []);

    return ({
        getDataAll: getDataAll,
        status: status,
        setStatus: setStatus,
        doWaitApi: doWaitApi
    });
};

const useLoadDataAll_ = (key: ProfileKey) => {
    const [doWaitApi, setDoWaitApi] = useState<boolean>(true);
    const [status, setStatus] = useProfileLoadStatusAll(key);
    const idList: IProfileId[] = useProfileIdList();

    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

    useEffect(() => {
        console.log(`Using [useLoadDataAll]`);
    }, [])
    useEffect(() => {
        console.log(`[useLoadDataAll]: idList`);
    }, [idList])
    useEffect(() => {
        console.log(`[useLoadDataAll] key`);
    }, [key])

    /* 테스트 결과 Fetch */
    const getDataAll = useCallback(() => {
        console.log(`[useLoadDataAll]-[getDataAll]: idList=${idList} key=${key}`);

        const fetch = key === 'testResult' ?
            (id: IProfileId) => dispatch(asyncGetTestResult(id))
            : (id: IProfileId) => dispatch(asyncGetTestAnswer(id));

        idList.forEach((id) => {
            dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id, key }));
            fetch(id);
        })
        setDoWaitApi(false);
    }, [idList, key, dispatch]);

    return ({
        getDataAll: getDataAll,
        status: status,
        setStatus: setStatus,
        doWaitApi: doWaitApi
    });
};

// const useGetResult = () => {
//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     return useCallback((id: IProfileId) => {
//         console.log("userListReducer: useGetResult");        
//         dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id: id, key: 'testResult'}));
//         if(true) dispatch(asyncGetTestResult(id));
//     }
//     , [dispatch]);
// }

// const useGetTestAnswer = () => {
//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     return useCallback((id: IProfileId) => {
//         console.log("userListReducer: useGetTestAnswer");        
//         dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id: id, key: 'testAnswer'}));
//         dispatch(asyncGetTestAnswer(id));
//     }
//     , [dispatch]);
// }

const useGetData = (id: IProfileId, key: ProfileKey) => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id, key }));
    if (key === 'testAnswer') {
        dispatch(asyncGetTestAnswer(id));
    }
    else if (key === 'testResult') {
        dispatch(asyncGetTestResult(id));
    }
}


const useProfileLoadStatusAll = (key: ProfileKey) => {

    const [status, setStatus] = useState<LoadStatus>(LoadStatus.REST);

    /* 리스트의 모든 user 에 대한 loadStatus 리스트 */
    const loadStatusList: LoadStatus[] = useSelector((state: RootState) =>
        Object.entries( state.profile.data ).map(([, { data }]) =>
            data[key].loadStatus
        )
    )

    if (status === LoadStatus.PENDING || status === LoadStatus.REST) {
        if (loadStatusList.includes(LoadStatus.FAIL)) {
            setStatus(LoadStatus.FAIL);
        }
        else if (loadStatusList.includes(LoadStatus.MISS)) {
            setStatus(LoadStatus.MISS);
        }
        else if (loadStatusList.every((status) => (status === LoadStatus.SUCCESS))) {
            console.log('useProfileLoadStatusAll: useEffect: SCUEESS')
            setStatus(LoadStatus.SUCCESS);
        }
    }

    /* 리스트의 모든 loadStatus를 조합해 최종 loadStatus 를 반환. */
    useEffect(() => {
        console.log(`[useProfileLoadStatusAll] loadStatusList updated: key=${key} loadStatusList=${loadStatusList} status=${status}`);

        // else if( status === LoadStatus.REST ){
        //     if( loadStatusList.includes( LoadStatus.PENDING ) ){
        //         setStatus( LoadStatus.PENDING );
        //     } 
        // }
    }, [loadStatusList])

    return ([status, setStatus] as const);
}

const useLoadStatusAll = (loadStatusList: LoadStatus[]) => {

    const [status, setStatus] = useState<LoadStatus>(LoadStatus.PENDING);

    /* 리스트의 모든 loadStatus를 조합해 최종 loadStatus 를 반환. */
    useEffect(() => {
        console.log(`[useLoadStatusAll] loadStatusList updated: loadStatusList=${loadStatusList} status=${status}`);
        if (status === LoadStatus.PENDING || status === LoadStatus.REST) {
            if (loadStatusList.includes(LoadStatus.FAIL)) {
                setStatus(LoadStatus.FAIL);
            }
            else if (loadStatusList.includes(LoadStatus.MISS)) {
                setStatus(LoadStatus.MISS);
            }
            else if (loadStatusList.every((status) => (status === LoadStatus.SUCCESS))) {
                console.log('[useLoadStatusAll] useEffect: SCUEESS')
                setStatus(LoadStatus.SUCCESS);
            }
        }
    }, [loadStatusList, status])

    return ([status, setStatus] as const);
}

// const withProfileListLoadStatus = <T extends LoadStatusProps>(WrappedComponent: ComponentType<T>) =>
//     (userId?: IProfileId) =>
//     (props: Omit<T, keyof LoadStatusProps>) => {        
//     const [status, setStatus] = useProfileLoadStatus({ id: userId });
//     return(
//         <WrappedComponent {...{status:status, setStatus:setStatus}} {...props as T}/>
//     ); 
// }

interface valueToProfileListType { [value: string]: IProfileId[] };

export default profileSlice.reducer;
export const { addProfile, setProfile, setAllREST, deleteUser, setStatus, setStatusAll } = profileSlice.actions;
export { asyncGetTestResult, asyncGetTestAnswer };
export {
    useProfileIdList, useProfileLoadStatusAll,
    useLoadData, useLoadDataAll,
    useTestAnswerObject, useTestResultObject,
    useGetData,
    // useGetResult, useGetTestAnswer, 
    useLoadStatusAll,
    useFindUser, useHandleSuccessAll, useTestResult
};

export type { ProfileKey };

/* Deprecated */
// function dataReducer(state=initialState, action: dataAction) {
//     switch(action.type) {
//         case SET :
//             return {...state,
//                 [action.payload.testName] : action.payload.value
//             };
//         case SETBUDGET :
//             return {...state,
//                 [action.payload.testName] : {
//                     ...state.data[action.payload.testName] as {},
//                     [action.payload.SubTestName]: action.payload.value
//                 }
//             };
//         default :
//             return state;
//     }
// }