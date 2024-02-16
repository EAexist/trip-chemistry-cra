/* React */
import { useCallback, useEffect } from "react";

/* React Packages */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";


/* App */
import { AppDispatch, RootState } from "../store";
import { StatusCodes } from "http-status-codes";
import { IWithLoadStatus, LoadStatus, IProfileId } from ".";
import { HEADERS_AXIOS, TEST, TEST_TYPE } from "../common/app-const";
import axios from "axios";
import { useUserId } from "./authReducer";

export const ActivityTag = {
    PHOTO : "photo",
    INSTA : "insta",
    NETWORK : "network",
    EXTREME : "extreme",
    SWIM : "swim",
    DRIVE : "drive",
    WALK : "walk",
    THEMEPARK : "themepark",
    MARKET : "market",
    HOTEL : "hotel",
    VLOG : "vlog",
    WAITING : "waiting",
    BAR : "bar",
    CAFE : "cafe",
    SHOPPING : "shopping",
    SHOW : "show",
}
type ActivityTag = typeof ActivityTag[keyof typeof ActivityTag]; 

export const ExpectationTag = {
    HEAL: "heal",
    COMPACT: "compact",
    FULLFILL: "fullfill",
    MEMORY: "memory",
    RELAX: "relax",
    COMFORT: "comfort",
    ADVENTURE: "adventure",
    NEW: "new",
    DIGITAL_DETOX: "digital_detox",
    REST: "rest",
    VIEW: "view",  
}
type ExpectationTag = typeof ExpectationTag[keyof typeof ExpectationTag]; 

interface ITestAnswer {
    expectation: {
        selected: ExpectationTag[],
        unSelected: ExpectationTag[]
    },
    activity: {
        selected: ActivityTag[],
        unSelected: ActivityTag[]
    },
    leadership: undefined | number,
    schedule: undefined | number,
    food: undefined | number, /* 식사 평균 */
    // foodSpecial: undefined | number, /* 특별한 식사 */
    // accomodate: undefined | number, /* 숙소 평균 */
    // accomodateSpecial: undefined | number, /* 특별한 숙소 */

    metropolis: undefined | number,
    history: undefined | number,
    nature: undefined | number,
};

interface ITestAnswerDTO {
    expectation: ExpectationTag[],
    activity: ActivityTag[],
    leadership: number,
    schedule: number,
    food: number, 
    metropolis: number,
    history: number,
    nature: number,
};

const testAnswerToDTO: (testAnswer: ITestAnswer) => ITestAnswerDTO = ( testAnswer ) => (
    {
        ...testAnswer,
        expectation: testAnswer.expectation.selected,
        activity: testAnswer.activity.selected,
    } as ITestAnswerDTO
);


type TestName = keyof ITestAnswer;
export type NumericTestName = keyof Omit<ITestAnswer, "activity" | "expectation">;
export type SetTestName = keyof Pick<ITestAnswer, "activity" | "expectation">;

export const defaultTestAnswer : ITestAnswer = {
    expectation: {
        selected: [],
        unSelected: Object.values(ExpectationTag)
    },
    activity: {
        selected: [],
        unSelected: Object.values(ActivityTag)
    },
    leadership: undefined,
    schedule: undefined,
    food: undefined, /* 식사 평균 */
    // foodSpecial: undefined, /* 특별한 식사 */
    // accomodate: undefined, /* 숙소 평균 */
    // accomodateSpecial: undefined, /* 특별한 숙소 */

    metropolis: undefined,
    history: undefined,
    nature: undefined,
};

/* Debug */
export const sampleTestAnswer : ITestAnswer = {
    expectation: {
        selected: [],
        unSelected: Object.values(ExpectationTag)
    },
    activity: {
        selected: [],
        unSelected: Object.values(ActivityTag)
    },
    leadership: 1,
    schedule: 4,
    food: 20000, /* 식사 평균 */
    // foodSpecial: undefined, /* 특별한 식사 */
    // accomodate: undefined, /* 숙소 평균 */
    // accomodateSpecial: undefined, /* 특별한 숙소 */

    metropolis: 1,
    history: 5,
    nature: 4,
};

// type ITestAnswer = typeof defaultTestAnswer;

const initialState : IWithLoadStatus<ITestAnswer> = {
    data: sampleTestAnswer,
    // data: defaultTestAnswer,
    loadStatus : LoadStatus.REST
};

// interface TestName{
//     index: TestName;
//     subIndex: SubTestName;
// }

interface ISetNumericAnswerPayload {
    testName: NumericTestName;
    value: number;
};

interface ISetSetAnswerPayload {
    testName: SetTestName;
    tag: string;
};

export const asyncSubmitAnswer = createAsyncThunk("testAnswer/submitAnswer",
    async ({ id, answer }: { id: string, answer: ITestAnswerDTO}, thunkAPI) => {
        console.log(`[asyncSubmitAnswer] PUT /profile/answer?\n\tid=${id}\n\tanswer=${JSON.stringify(answer)}`);
        try {
            const response = await axios.put(`/profile/answer`,
                answer,
                {
                    method: "PUT",
                    headers: HEADERS_AXIOS,
                    params: { 
                        id: id,
                    },
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncSubmitAnswer] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const testAnswerSlice = createSlice({
    name: 'testAnswer',
    initialState: initialState,
    reducers:
    {
        setNumericAnswer : (state, action: PayloadAction<ISetNumericAnswerPayload>) => {
            console.log(`[testAnswerSlice] [setNumericAnswer]: state=${JSON.stringify(state)} payload=${JSON.stringify(action.payload)}` );
            if ( state.data ){
                state.data[action.payload.testName] = action.payload.value;
            }
        },
        addTagAnswer: (state, action: PayloadAction<ISetSetAnswerPayload>) => {
            if( ! state.data[action.payload.testName].selected.includes( action.payload.tag )){
                state.data[action.payload.testName].selected.push(action.payload.tag);
            }
            state.data[action.payload.testName].unSelected.splice( state.data[action.payload.testName].unSelected.indexOf(action.payload.tag), 1 );
        },
        deleteTagAnswer: (state, action: PayloadAction<ISetSetAnswerPayload>) => {
            if( ! state.data[action.payload.testName].unSelected.includes( action.payload.tag )){
                state.data[action.payload.testName].unSelected.unshift(action.payload.tag);
            }
            state.data[action.payload.testName].selected.splice( state.data[action.payload.testName].selected.indexOf(action.payload.tag), 1 );
        },
        setStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.loadStatus = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase( asyncSubmitAnswer.fulfilled, (state, action: PayloadAction<StatusCodes> ) => {            
            console.log(`[asyncSubmitAnswer] fulfilled\n\taction.payload=${JSON.stringify(action.payload)}`
            );
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncSubmitAnswer.pending, (state) => {
            console.log(`[asyncSubmitAnswer] pending`);
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncSubmitAnswer.rejected, (state) => {
            console.log(`[asyncSubmitAnswer] rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });
    },
});

export const useTestAnswer = ( testName: TestName ) => {
    const dispatch = useDispatch();
    return(
        [ 
            useSelector(( state:RootState )=>(state.testAnswer.data[testName]) as number),  
            useCallback(( payload: ISetNumericAnswerPayload ) => 
                dispatch( testAnswerSlice.actions.setNumericAnswer(payload) )
            , [dispatch])
        ] as const
    )
};

export const useTagSetAnswer = ( testName: SetTestName, selected = true ) => {
    return(
        useSelector(( state:RootState )=>( Array.from(state.testAnswer.data[testName][ selected ? "selected" : "unSelected" ].values() )) )
    );
};

export const useIsTestAnswered = ( testName: TestName ) => {
    return(
        useSelector(( state:RootState )=>(
            ( typeof state.testAnswer.data[testName] !== "object" )
            ? state.testAnswer.data[ testName as NumericTestName ] !== undefined  
            : state.testAnswer.data[ testName as SetTestName ].selected.length >= TEST_TYPE.tagSet.selectedMinLength
        ))
    );    
}

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

const useSubmitAnswer = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const { data } = useSelector(( state:RootState ) => state.testAnswer );

    const id = useUserId();
    const [ status, setStatus ] = useTestAnswerStatus();

    // useEffect(()=>{
    //     if( status === LoadStatus.SUCCESS ){

    //     }
    // }, [ status ])

    return useCallback(() => {        
        console.log(`[useSubmitAnswer] id=${id} answer=${JSON.stringify(testAnswerToDTO(data))}`);
        dispatch( asyncSubmitAnswer({ id, answer: testAnswerToDTO(data) }) );
    }
    , [ dispatch, data, id ]);
}

export default testAnswerSlice.reducer;
export { useTestAnswerStatus, useSubmitAnswer };
export const { addTagAnswer, deleteTagAnswer } = testAnswerSlice.actions;
export type { ITestAnswer, TestName };
// export { useTestAnswer, useSetTestAnswer, useSubmitAnswer, useTestAnswerStatus }
// export type { TestAnswerPayload, TestAnswer, TestName, SubTestName, TestName, InterfaceWithLoadStatus }



// const useSetTestAnswer = () => {
//     const dispatch = useDispatch();
//     return useCallback((payload: TestAnswerPayload) => 
//         dispatch(testAnswerSlice.actions.setNumericAnswer(payload))
//     , [dispatch]);
// };

// const useSubmitAnswer = () => {
//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     const { loadStatus, data } = useSelector(( state:RootState )=>state.testAnswer)
//     return useCallback((id: IProfileId) => 
//         dispatch(asyncSubmitAnswer({id: id, response: data}))
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
//         setNumericAnswer: (value: TestAnswer[TestName]) => {testAnswerSlice.actions.setNumericAnswer({
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