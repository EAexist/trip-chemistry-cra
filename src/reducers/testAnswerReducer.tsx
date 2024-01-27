/* React */
import { useCallback, useEffect } from "react";

/* React Packages */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";


/* App */
import { AppDispatch, RootState } from "../store";
import { StatusCodes } from "http-status-codes";

// interface TestAnswerState extends TestAnswer{
//     loadStatus: LoadStatus; 
// };
type UserId = string;

enum LoadStatus {
    REST = 'rest',
    PENDING = 'pending', 
    SUCCESS = 'success',
    MISS = 'miss',
    FAIL = 'fail',
}

interface ITestAnswerState { 
    [key: string] : {
        [key: string]: number | undefined
    }
}

type IWithLoadStatus<T> = { data: T,  loadStatus : LoadStatus };


/* Deubg */const initialState : IWithLoadStatus<ITestAnswerState> = {
    data: {
        leadership : {
            leadership: 1
            // leadership: undefined
        },
        schedule : {
            schedule: 5
        },
        budget : {
            food: 15000, /* 식사 평균 */
            // foodSpecial: 2, /* 특별한 식사 */
            // accomodate: 2, /* 숙소 평균 */
            // accomodateSpecial: 2, /* 특별한 숙소 */
        },
        city: {
            metropolis: 1,
            history: 3,
            nature: 5,
        },
        // activity:{
        //     food: 2,
        //     walk: 2,
        //     shopping: 2,
        //     mesuem: 2,
        //     themePark: 2,
        // },
    },
    loadStatus : LoadStatus.REST
};

// const initialState : IWithLoadStatus<ITestAnswerState> = {
//     data: {
//         leadership : {
//             leadership: undefined
//             // leadership: undefined
//         },
//         schedule : {
//             schedule: undefined
//         },
//         budget : {
//             food: undefined, /* 식사 평균 */
//             // foodSpecial: 2, /* 특별한 식사 */
//             // accomodate: 2, /* 숙소 평균 */
//             // accomodateSpecial: 2, /* 특별한 숙소 */
//         },
//         city: {
//             metropolis: undefined,
//             history: undefined,
//             nature: undefined,
//         },
//         // activity:{
//         //     food: 2,
//         //     walk: 2,
//         //     shopping: 2,
//         //     mesuem: 2,
//         //     themePark: 2,
//         // },
//     },
//     loadStatus : LoadStatus.REST
// };


type TestName = keyof typeof initialState.data;

type SubTestName = keyof typeof initialState.data[TestName];

export interface TestIndex{
    index: TestName;
    subIndex: SubTestName;
}

interface TestAnswerPayload extends TestIndex{
    value: typeof initialState.data[TestName][SubTestName];
};

// type SubTestName = keyof (typeof initialState.testAnswer)

interface asyncPutResponseProps{
    userId: UserId;
    response: ITestAnswerState;
};
const asyncPutResponse = createAsyncThunk("testAnswer/putResponse", 
    async ({userId, response}: asyncPutResponseProps, thunkAPI) => {
        console.log(`asyncPutResponse: response=${JSON.stringify(response)}`);
        try{
            
            const path = `user/${ userId }/response`;
            const fetchProps = {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(response)
            };

            const data = await fetch(path, fetchProps) 
                .then((response) => {
                    console.log(`useServerAPI- response=${JSON.stringify(response)}`);
                    if(!response.ok) throw new Error(response.statusText);
                    else return response.status;
                })

            console.log(`asyncPutResponse: data=${JSON.stringify(data)}`);
            return data;
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const testAnswerSlice = createSlice({
    name: 'testAnswer',
    initialState: initialState,
    reducers:
    {
        setTestAnswer : (state, action: PayloadAction<TestAnswerPayload>) => {
            console.log(`[testAnswerSlice] [setTestAnswer]: state=${JSON.stringify(state)} payload=${JSON.stringify(action.payload)}` );
            if ( state.data ) state.data[action.payload.index][action.payload.subIndex] = action.payload.value;
            // return(
            //     {
            //         ...state,
            //         testAnswer: {
            //             ...state.testAnswer,
            //             [action.payload.testName]:
            //                 action.payload.subTestName === undefined ?
            //                     action.payload.value
            //                     : {
            //                         ...state.testAnswer[action.payload.testName] as object,
            //                         [action.payload.subTestName]: action.payload.value
            //                     }
            //         }
            //     }
            // ) 
        },
        setStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.loadStatus = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(asyncPutResponse.fulfilled, (state, action: PayloadAction<StatusCodes>) => {            
            console.log(`asyncPutResponse.fulfilled - 
            \naction.payload=${JSON.stringify(action.payload)}`);
            state.loadStatus = LoadStatus.REST;
        });
        builder.addCase(asyncPutResponse.pending, (state) => {
            console.log(`asyncPutResponse.pending`);
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncPutResponse.rejected, (state) => {
            console.log(`asyncPutResponse.rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });
    },
});

export const useTestAnswer = ( testIndex: TestIndex ) => {
    const dispatch = useDispatch();
    return(
        [ 
            useSelector(( state:RootState )=>(state.testAnswer.data[testIndex.index][testIndex.subIndex]) as number),  
            useCallback(( payload: TestAnswerPayload ) => 
                dispatch( testAnswerSlice.actions.setTestAnswer(payload) )
            , [dispatch])
        ] as const
    )
};

const useTestAnswerStatus = () => {
    const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const status = useSelector(( state:RootState )=>state.testAnswer.loadStatus);
    return ([
        status,
        useCallback((status: LoadStatus) =>
            dispatch(testAnswerSlice.actions.setStatus(status))
        , [dispatch])
    ] as const);
}

const usePutResponse = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const { data } = useSelector(( state:RootState ) => state.testAnswer );
    return useCallback((userId: UserId) => 
        dispatch( asyncPutResponse({userId: userId, response: data}) )
    , [dispatch, data]);
}

export default testAnswerSlice.reducer;
export { useTestAnswerStatus, usePutResponse };
// export { useTestAnswer, useSetTestAnswer, usePutResponse, useTestAnswerStatus }
// export type { TestAnswerPayload, TestAnswer, TestName, SubTestName, TestIndex, InterfaceWithLoadStatus }



// const useSetTestAnswer = () => {
//     const dispatch = useDispatch();
//     return useCallback((payload: TestAnswerPayload) => 
//         dispatch(testAnswerSlice.actions.setTestAnswer(payload))
//     , [dispatch]);
// };

// const usePutResponse = () => {
//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     const { loadStatus, data } = useSelector(( state:RootState )=>state.testAnswer)
//     return useCallback((userId: UserId) => 
//         dispatch(asyncPutResponse({userId: userId, response: data}))
//     , [dispatch, data]);
// }

// const useTestAnswerStatus = () => {
//     const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     const status = useSelector(( state:RootState )=>state.testAnswer.loadStatus);
//     return ([
//         status,
//         useCallback((status: LoadStatus) =>
//             dispatch(testAnswerSlice.actions.setStatus(status))
//         , [dispatch])
//     ] as const);
// }

/* Deprecated */
// function testAnswerReducer(state=initialState, action: testAnswerAction) {
//     switch(action.type) {
//         case SET : 
//             return {...state,
//                 [action.payload.testName] : action.payload.value
//             };
//         case SETBUDGET : 
//             return {...state,
//                 [action.payload.testName] : {
//                     ...state[action.payload.testName] as {},
//                     [action.payload.SubTestName]: action.payload.value
//                 }
//             };
//         default : 
//             return state;
//     }
// }

/* Deprecated */
// const mapState = (TestName: TestName) => (state: RootState) => ({
//     response: state.testAnswer[TestName]
// });

// const mapDispatch = (testName : TestName) => (
//     {   
//         setTestAnswer: (value: TestAnswer[TestName]) => {testAnswerSlice.actions.setTestAnswer({
//         testName: testName,
//         value: value
//     })},
//         setBudgetResponse: (SubTestName: SubTestName, value: BudgetResponse[SubTestName]) => {testAnswerSlice.actions.setBudgetResponse({
//         testName: testName,
//         SubTestName: SubTestName,
//         value: value
//     })}, 
//     }
// );

// const connector = (TestName: TestName) => connect(
//     mapState(TestName), 
//     mapDispatch(TestName)
// )

// type PropsFromReduxTestAnswer = ConnectedProps<typeof connector>;

// const useConnectTestAnswer = (component : ComponentType) => {
//     const mapStateToProps = (state : RootState, TestName: TestName) => ({
//         response: state.testAnswer
//     });
      
//     const mapDispatchToProps = testAnswerSlice.actions   
    
//     return(
//         connect(mapStateToProps, mapDispatchToProps)(component)
//     )
// }