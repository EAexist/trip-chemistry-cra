/*** React ***/
import { useCallback } from "react";
import { AppDispatch, RootState } from "../store";

/* React Packages */
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";

/*** Chemistry Chemistry ***/
import { IWithLoadStatus, LoadStatus, IProfileId } from ".";
import { HEADERS_AXIOS } from "../common/app-const";
import { IProfile } from "../interfaces/IProfile";
import { TestName } from "./testAnswerReducer";
import { IChemistry, defaultChemistry } from "../interfaces/IChemistry";

interface IChemistryCreateDTO extends Pick<IChemistry, "title" | "titleCity"> {
    userId: IProfileId;
};

type IChemistryState = IWithLoadStatus<IChemistry>;


const initialState: IChemistryState = {
    data: defaultChemistry,
    loadStatus: LoadStatus.REST,
};

export const asyncCreateChemistry = createAsyncThunk("chemistry/asyncCreateChemistry",
    async (createDTO: IChemistryCreateDTO, thunkAPI) => {
        console.log(`[asyncCreateChemistry] POST /chemistry/create\n\tcreateDTO=${JSON.stringify(createDTO)}`);
        try {
            const response = await axios.post(`/chemistry/create`,
                createDTO,
                {
                    method: "POST",
                    headers: HEADERS_AXIOS,
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncCreateChemistry] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const asyncJoinChemistry = createAsyncThunk("chemistry/asyncJoinChemistry",
    async ({ userId, chemistryId }: { userId: string, chemistryId: string }, thunkAPI) => {
        console.log(`[asyncJoinChemistry] PUT /chemistry/join\n\tuserId=${userId}\n\tchemistryId=${chemistryId}`);
        try {
            const response = await axios.put(`/chemistry/join`,
                {
                    userId: userId,
                    chemistryId: chemistryId
                },
                {
                    method: "PUT",
                    headers: HEADERS_AXIOS,
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncJoinChemistry] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const asyncGetChemistry = createAsyncThunk("chemistry/asyncGetChemistry",
    async (id: string, thunkAPI) => {
        console.log(`[asyncGetChemistry] GET /chemistry\n\tid=${id}`);
        try {
            const response = await axios.get(`/chemistry`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: {
                        id: id
                    }
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncGetChemistry] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const tripSlice = createSlice({
    name: 'trip',
    initialState: initialState,
    reducers: {
        setChemistryLoadStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.loadStatus = action.payload;
        },
        clearChemistry: (state) => {
            state.data = defaultChemistry;
        },
    },
    extraReducers: (builder) => {
        /* asyncCreateChemistry */
        builder.addCase(asyncCreateChemistry.fulfilled, (state, action: PayloadAction<IChemistry>) => {
            console.log(`asyncCreateChemistry.fulfilled: action.payload=${JSON.stringify(action.payload)}`);
            state.data = {
                ...defaultChemistry,
                ...action.payload,
            }
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncCreateChemistry.pending, (state, action) => {
            console.log(`asyncCreateChemistry.pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncCreateChemistry.rejected, (state, action) => {
            console.log(`asyncCreateChemistry.rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });

        /* asyncJoinChemistry */
        builder.addCase(asyncJoinChemistry.fulfilled, (state, action: PayloadAction<IChemistry>) => {
            console.log(`asyncJoinChemistry.fulfilled: action.payload=${JSON.stringify(action.payload)}`);
            state.data = action.payload;
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncJoinChemistry.pending, (state, action) => {
            console.log(`asyncJoinChemistry.pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncJoinChemistry.rejected, (state, action) => {
            console.log(`asyncJoinChemistry.rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });

        /* asyncGetChemistry */
        builder.addCase(asyncGetChemistry.fulfilled, (state, action: PayloadAction<IChemistry>) => {
            console.log(`asyncGetChemistry.fulfilled: action.payload=${JSON.stringify(action.payload)}`);
            state.data = action.payload;
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncGetChemistry.pending, (state, action) => {
            console.log(`asyncGetChemistry.pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetChemistry.rejected, (state, action) => {
            console.log(`asyncGetChemistry.rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });
    },
})

const useChemistry = () => {
    return (useSelector((state: RootState) => state.trip.data));
};

const useChemistryId = () => {
    return (useSelector((state: RootState) => state.trip.data.id));
};

// const useIsChemistryUpdated = () => {
//     return (useSelector((state: RootState) => (state.trip.loadStatus === LoadStatus.REST) && (state.trip.data !== undefined)));
// };

const useIsChemistryEnabled = () => {

    return useProfileIdList().length > 1;
};

const useCityChemistry = (cityClass: string) => {
    return (useSelector((state: RootState) => state.trip.data ? state.trip.data.cityChemistry[cityClass] : -1));
};

const useSortedCityList = () => {
    return (useSelector((state: RootState) => state.trip.data.cityChemistry ? Object.entries(state.trip.data.cityChemistry).sort((a, b) => (b[1] - a[1])).map(([cityClass, score]) => cityClass) : undefined));
};

const useChemistryLoadStatus = () => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

    return ([
        useSelector((state: RootState) => state.trip.loadStatus),
        useCallback((status: LoadStatus) =>
            dispatch(tripSlice.actions.setChemistryLoadStatus(status))
            , [dispatch]),
    ] as const);
}

const useTestAnswerObject = (testName: TestName) => {

    return (
        useSelector((state: RootState) =>
            Object.fromEntries(
                Object.entries(state.trip.data?.profileList)
                    .filter(([ , profile ]) => profile.testAnswer !== null )
                    .map(([ id, profile ]) => {
                        return ([ id, profile.testAnswer[testName] ] as const)
                    })
            )
            , shallowEqual
        )
    );
};

const useProfile = ( id: string ) => {
    return (
        useSelector((state: RootState) => Object.keys(state.trip.data.profileList).includes(id) ? state.trip.data.profileList[id] : undefined )
    );
} 

const useProfileIdList = ( answeredProfileOnly : boolean = true ) => {
    return (
        useSelector((state: RootState) => Object.values(state.trip.data.profileList)
            .filter( profile => answeredProfileOnly ? (profile.testAnswer !== null) : true )
            .map( profile => profile.id )
        , shallowEqual)
    );
}

function useProfileAll<T extends (keyof IProfile) | IProfile>(idList?: IProfileId[], key?: keyof IProfile): T[] {
    return (useSelector((state: RootState) =>
        Object.entries(state.trip.data.profileList).filter(([k, v]) => idList ? idList.includes(k) : true)
            .map(([k, profile]) =>
                key
                    ? profile[key]
                    : profile
            )
    ) as T[]
    );
}

export default tripSlice.reducer;
export const { clearChemistry } = tripSlice.actions;
export { useChemistry, useChemistryId, useChemistryLoadStatus, useCityChemistry, useSortedCityList, useIsChemistryEnabled, useTestAnswerObject, useProfile, useProfileAll, useProfileIdList };
export { asyncGetChemistry };

/* Deprecated */
/* 데이터 Fetch, 로드 상태 관리, 로드 전 초기 렌더 방지. */
// const useLoadChemistry () => {
//     const [ doWaitApi, setDoWaitApi ] = useState<boolean>(true);
//     const [ status, setStatus ] = useProfileLoadStatus( id, key );

//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

//     /* 테스트 결과 Fetch */
//     useEffect(() => {
//         dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id, key}));
//         if(key === 'testResult'){
//             dispatch(asyncGetTestResult(id));
//         }
//         else if(key === 'testResponse'){
//             dispatch(asyncGetTestAnswer(id));
//         }
//         setDoWaitApi(false);
//     }, [ id, key, dispatch ]);

//     useEffect(()=>{
//         if(status === LoadStatus.SUCCESS){
//             setStatus(LoadStatus.REST);
//         }
//     }, [ status, setStatus ])

//     return ({ status: status, setStatus: setStatus, doWaitApi: doWaitApi });
// }