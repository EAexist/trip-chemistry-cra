/*** React ***/
import { useCallback } from "react";

/* React Packages */
import { useDispatch, useSelector } from "react-redux";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";

/*** Trip Chemistry ***/
import { AppDispatch, RootState } from "../store";
import { IWithLoadStatus, LoadStatus, IProfileId } from ".";
import { useProfileIdList } from "./profileReducer";
import { HEADERS_AXIOS, TEST } from "../common/app-const";

interface ICityChemistry{
    [ key : string ] : number
};

interface IChemistry {
    leaderList: IProfileId[];
    cityChemistry: ICityChemistry;
    scheduleChemistryText?: string;
    budgetChemistryText?: string;
};

type IChemistryState = IWithLoadStatus<IChemistry | undefined>;

const initialState: IChemistryState = {
    loadStatus: LoadStatus.REST,
    data: {
        leaderList: ["디클1234"],
        cityChemistry : {
            metropolis : 2.5, 
            history : 3.5,
            nature : 4.5,
        }
    }
};

const asyncGetChemistry = createAsyncThunk("chemistry",
    async ( idList: IProfileId[], thunkAPI ) => {
        console.log(`[asyncGetChemistry] GET /chemistry?idList=${idList}`);
        try {
            const response = await axios.get(`/chemistry`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: { 
                        idList: idList 
                    },
                    paramsSerializer : params => {
                        return qs.stringify( params, { arrayFormat: 'comma' });
                    }
                });
            return { idList: idList, chemistry: response.data };
        }
        catch (e: any) {
            console.log(`[asyncGetChemistry] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const chemistrySlice = createSlice({
    name: 'chemistry',
    initialState: initialState,
    reducers: {
        setChemistryLoadStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.loadStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asyncGetChemistry.fulfilled, (state, action: PayloadAction<{ idList: IProfileId[], chemistry: IChemistry }>) => {
            console.log(`asyncGetChemistry.fulfilled: users=${action.payload.idList} action.payload=${JSON.stringify(action.payload)}`);
            state.data = action.payload.chemistry; 
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
    return ( useSelector((state: RootState) => state.chemistry ));
};

const useCityChemistry = ( cityClass : string ) => {
    return ( useSelector((state: RootState) => state.chemistry.data ? state.chemistry.data.cityChemistry[ cityClass ] : undefined ));
};

const useSortedCityList = () => {
    return ( useSelector((state: RootState) => state.chemistry.data ? Object.entries(state.chemistry.data.cityChemistry).sort(( a, b ) => ( b[1] - a[1] )).map(([ cityClass, score ]) => cityClass )  : undefined ) );
};


const useGetChemistry = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const idList = useProfileIdList();

    return useCallback(() => {
        console.log("[chemistryReducer] useGetChemistry");
        dispatch(chemistrySlice.actions.setChemistryLoadStatus(LoadStatus.PENDING));
        dispatch(asyncGetChemistry(idList));
    }
        , [idList]);
}

const useChemistryLoadStatus = () => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

    return ([
        useSelector((state: RootState) => state.chemistry.loadStatus),
        useCallback((status: LoadStatus) =>
            dispatch(chemistrySlice.actions.setChemistryLoadStatus(status))
            , [dispatch]),
    ] as const);
}

export default chemistrySlice.reducer;
export { useChemistry, useGetChemistry, useChemistryLoadStatus, useCityChemistry, useSortedCityList };

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