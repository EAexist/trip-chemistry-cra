// /*** React ***/
// import { useCallback, useEffect, useState } from "react";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { createSlice, PayloadAction, createAsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";

// /*** Trip Chemistry ***/
// /* Component */
// import { AppDispatch, RootState } from "../store";
// import { useHandleLoadSuccess } from "../hooks/useHandleLoadSuccess";
// import { ITestResult } from "../interfaces/ITestResult";
// import { IWithLoadStatus, LoadStatus, IProfileId } from ".";
// import { ITestAnswer, TestName } from "./testAnswerReducer";
// import useServerAPI from "../hooks/useServerAPI";
// import { ITripCharacter } from "../interfaces/ITripCharacter";
// import { setStatusAll } from "./profileReducer";

// /* Types */

// interface ProfileState {
//     idList: IProfileId[]
//     data: ProfileObject; 
//     chemistry: IWithLoadStatus<Chemistry>;
//     search: {
//         [key: IProfileId]: {
//             testResult: ITestResult,
//             loadStatus: LoadStatus
//         }
//     }
//     exampleResultLoadStatus: LoadStatus;
//     loadStatus: LoadStatus; 
// }; 

// type ProfileObject = {[id: IProfileId]: Profile};

// interface IProfile{
//     testAnswer: IWithLoadStatus<ITestAnswer>;
//     testResult: IWithLoadStatus<ITestResult>;
// };
// type TestDataKey = keyof Profile

// type Chemistry = {
//     leaderList: IProfileId[]; 
//     scheduleChemistryText?: string;
//     budgetChemistryText?: string;
// };

// const userId ='디클1234'

// const initialState : ProfileState = {
//     idList: [],
//     data: {
//         [ userId ]: {
//             testAnswer: {
//                 loadStatus: LoadStatus.REST,
//                 data: {
//                     leadership : {
//                         leadership: 1
//                     },
//                     schedule : {
//                         schedule: 5
//                     },
//                     budget : {
//                         food: 15000, /* 식사 평균 */
//                     },
//                     city: {
//                         metropolis: 1,
//                         history: 3,
//                         nature: 5,
//                     },
//                 } as ITestAnswer,
//             },
//             testResult: {
//                 loadStatus: LoadStatus.REST,
//                 data: {
//                     tripTagList: ['여행', '태그'],
//                     tripCharacter: {
//                         id: "bee",
//                         name: "벌꿀형",
//                         prefix: "부지런한",
//                         body: "부지런한 벌꿀형은 이러쿵 저러쿵 어쩌고 저쩌고",  
//                     },
//                 } as ITestResult,
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
//     // getResultCallerList: [],
//     // nextCallerId: 0,
//     exampleResultLoadStatus: LoadStatus.PENDING,
//     loadStatus: LoadStatus.PENDING,
// };


// const asyncSearchProfile = createAsyncThunk("userList/search", 
//     async ( id: IProfileId, thunkAPI ) => {
//         console.log("[asyncSearchProfile] Called");
//         try{
//             const { id, ...testResult } = await useServerAPI({
//                 path:`user/${ id }/result`,
//                 fetchProps:{
//                     method: "GET", 
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                 }
//             })
//             console.log(`[asyncSearchProfile]\nResponse:${JSON.stringify(testResult)}`);
//             return { id: id, testResult: testResult };
//         }
//         catch (e: any) {
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );

// const asyncGetExampleITestResultList = createAsyncThunk("userList/getExampleITestResult", 
//     async ( _, thunkAPI ) => {
//         console.log("[asyncGetExampleITestResultList] Called");
//         try{
//             const testResultDTOList = await useServerAPI({
//                 path:`user/example/result`,
//                 fetchProps:{
//                     method: "GET", 
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                 }
//             })
//             console.log(`[asyncGetExampleITestResultList]\nResponse:${ testResultDTOList }`);
//             return testResultDTOList;
//         }
//         catch (e: any) {
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );

// const asyncGetTestResult = createAsyncThunk("userList/getResult", 
//     async ( id: IProfileId, thunkAPI ) => {
//         console.log("Called: asyncGetTestResult");
//         try{
//             const testResultDTO = await useServerAPI({
//                 path:`user/${ id }/result`,
//                 fetchProps:{
//                     method: "GET", 
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                 }
//             })
//             console.log(`[asyncGetTestResult]\nResponse:${ JSON.stringify( testResultDTO ) }`);
//             return testResultDTO;
//         }
//         catch (e: any) {
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );

// const asyncGetTestAnswer = createAsyncThunk("userList/getResponse", 
//     async ( id: IProfileId, thunkAPI ) => {
//         console.log("Called: asyncGetTestAnswer");

//         try{
//             const { id, ...testAnswer } = await useServerAPI({
//                 path:`user/${ id }/response`,
//                 fetchProps:{
//                     method: "GET", 
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                 }
//             })
//             console.log(`asyncGetTestAnswer:${JSON.stringify({ id, ...testAnswer })}`);
//             return { id: id, testAnswer: { id, ...testAnswer } };
//         }
//         catch (e: any) {
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );

// const asyncGetChemistry = createAsyncThunk("userList/getChemistry", 
//     async (idList: IProfileId[], thunkAPI) => {
//         console.log("[asyncGetChemistry Called");
//         try{
//             const data = await useServerAPI({
//                 path:`user/chemistry/${idList}`,
//                 fetchProps:{
//                     method: "GET", 
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                 }
//             })
//             console.log(`[asyncGetChemistry] response=${JSON.stringify(data)}`);
//             return { idList: idList, chemistry: data };
//         }
//         catch (e: any) {
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );


// const profileSlice = createSlice({
//     name: 'profile',
//     initialState: initialState,
//     reducers: {
//         setProfile : (state, action: PayloadAction<IProfileId>) => {
//             if ( Object.keys(state.data).includes( action.payload ) ){
//                 console.log("profile.setProfile: warning: id already exists.")
//             }
//             else {
//                 state.data[action.payload] = {
//                     testAnswer: {
//                         data : {} as ITestAnswer,
//                         loadStatus: LoadStatus.REST
//                     },
//                     testResult: {
//                         data : {} as ITestResult,
//                         loadStatus: LoadStatus.REST
//                     }
//                 };
//             }
//             // if ( state.idList.includes( action.payload ) ){
//             //     console.log("profile.setProfile: warning: id already exists.");
//             // }
//             // else {
//             //     state.idList.push( action.payload );
//             // }
//         },
//         startSearch: (state, action: PayloadAction<IProfileId>) => {
//             if ( Object.keys( state.search ).includes( action.payload ) ){
//                 console.log(`[profileSliace.startSearch]\nid ${action.payload} already exists.`)
//             }
//             else {
//                 state.search[action.payload] = {
//                     loadStatus: LoadStatus.PENDING,
//                     testResult: {} as ITestResult,
//                 }
//             }
//         },
//         setSearchStatus: (state, action: PayloadAction<{loadStatus : LoadStatus, id: IProfileId }>) => {
//             state.search[action.payload.id].loadStatus = action.payload.loadStatus; 
//         },

//         endSearch: (state, action: PayloadAction<IProfileId>) => {
//             console.log(`[profileSliace.endSearch]\nCalled. id=${action.payload}`)
//             if( Object.keys(state.search).includes(action.payload) && ( state.search[ action.payload ].loadStatus === LoadStatus.SUCCESS )){
//                 state.data[action.payload] = {
//                     testAnswer: {
//                         data : {} as ITestAnswer,
//                         loadStatus: LoadStatus.REST
//                     },
//                     testResult: {
//                         data: state.search[ action.payload ].testResult,
//                         loadStatus: LoadStatus.REST
//                     }
//                 };
//             }
//             delete state.search[action.payload];
//         },
//         setStatus: (state, action: PayloadAction<{loadStatus : LoadStatus, id?: IProfileId, key?: keyof Profile}>) => {
//             if (action.payload.id !== undefined){
//                 if (action.payload.key !== undefined){
//                     state.data[action.payload.id][action.payload.key].loadStatus = action.payload.loadStatus; 
//                 }
//             }
//             else {
//                 state.loadStatus = action.payload.loadStatus;
//             }
//         },
//         setStatusAll: (state, action: PayloadAction<{loadStatus : LoadStatus, key: keyof Profile}>) => {
//             Object.entries( state.data ).forEach(([, profile]) => {
//                 profile[action.payload.key].loadStatus = action.payload.loadStatus; 
//             })
//         },
//         setChemistryLoadStatus: (state, action: PayloadAction<LoadStatus>) => {
//             state.chemistry.loadStatus = action.payload;
//         },
//         deleteUser: (state, action: PayloadAction<IProfileId>) => {
//             delete state.data[action.payload];
//         },
//     },
//     extraReducers:(builder) => {

//         /* asyncGetTestResult */
//         builder.addCase(asyncGetTestResult.fulfilled, (state, action: PayloadAction<{ id: IProfileId, testResult: ITestResult }>) => {
//             console.log(`asyncGetTestResult.fulfilled:\n    users=${Object.keys(state.data)}\n   action.payload=${JSON.stringify(action.payload)}\n   loadStatus=${state.data[action.payload.id].testResult.loadStatus}`)

//             if(Object.keys(state.data).includes(action.payload.id)){
//                 state.data[action.payload.id].testResult = {       
//                     loadStatus: LoadStatus.SUCCESS, 
//                     data:{
//                         tripTagList: action.payload.testResult.tripTagList || [], 
//                         tripCharacter: action.payload.testResult.tripCharacter || {} as ITripCharacter
//                     },
//                 }
//             }     
//             state.data[ action.payload.id ].testResult.loadStatus = LoadStatus.SUCCESS;
//         });
//         builder.addCase(asyncGetTestResult.pending, (state, action) => {
//             console.log(`asyncGetTestResult.pending`);
//             /* https://github.com/reduxjs/redux-toolkit/issues/776 */
//             state.data[action.meta.arg].testResult.loadStatus = LoadStatus.PENDING;
//         });
//         builder.addCase(asyncGetTestResult.rejected, (state, action) => {
//             console.log(`asyncGetTestResult.rejected`);
//             state.data[action.meta.arg].testResult.loadStatus = LoadStatus.FAIL;
//         });

//         /* asyncGetExampleITestResultList */
//         builder.addCase(asyncGetExampleITestResultList.fulfilled, (state, action: PayloadAction<{ id : IProfileId, testResult : ITestResult }[]>) => {
//             console.log(`asyncGetExampleITestResultList.fulfilled:\n    
//                 action.payload=${ action.payload }\n   
//                 loadStatus=${ state.exampleResultLoadStatus }`
//             )

//             action.payload.forEach(({ id, testResult }) => {
//                 state.data[ id ] = {
//                     testAnswer: {
//                         data : {} as ITestAnswer,
//                         loadStatus: LoadStatus.REST
//                     },
//                     testResult: {
//                         data: testResult,
//                         loadStatus: LoadStatus.REST
//                     }
//                 };
//             })
//             state.exampleResultLoadStatus = LoadStatus.SUCCESS;
//         });
//         builder.addCase(asyncGetExampleITestResultList.pending, (state, action) => {
//             console.log(`asyncGetExampleITestResultList.pending`);
//             /* https://github.com/reduxjs/redux-toolkit/issues/776 */
//             state.exampleResultLoadStatus = LoadStatus.PENDING;
//         });
//         builder.addCase(asyncGetExampleITestResultList.rejected, (state, action) => {
//             console.log(`asyncGetExampleITestResultList.rejected`);
//             state.exampleResultLoadStatus = LoadStatus.FAIL;
//         });

//         /* asyncGetSearchProfile */
//         builder.addCase(asyncSearchProfile.fulfilled, (state, action: PayloadAction<{ id: IProfileId, testResult: ITestResult }>) => {
//             console.log(`[asyncSearchProfile.fulfilled]\n    action.payload=${JSON.stringify(action.payload)}`)           
//             state.search[action.payload.id].testResult = {
//                 tripTagList: action.payload.testResult.tripTagList || [], 
//                 tripCharacter: action.payload.testResult.tripCharacter || {} as ITripCharacter 
//             }
//             state.search[action.payload.id].loadStatus = LoadStatus.SUCCESS;
//         });
//         builder.addCase(asyncSearchProfile.pending, (state, action) => {
//             console.log(`[asyncSearchProfile.pending]`);
//             /* https://github.com/reduxjs/redux-toolkit/issues/776 */
//             state.search[ action.meta.arg ].loadStatus = LoadStatus.PENDING;
//         });
//         builder.addCase(asyncSearchProfile.rejected, (state, action) => {
//             console.log(`[asyncSearchProfile.rejected]`);
//             state.search[ action.meta.arg ].loadStatus = LoadStatus.FAIL;
//         });

//         /* asyncGetTestAnswer */
//         builder.addCase(asyncGetTestAnswer.fulfilled, (state, action: PayloadAction<{ id: IProfileId, testAnswer: ITestAnswer }>) => {
//             console.log(`asyncGetTestAnswer.fulfilled: id=${action.payload.id} action.payload=${JSON.stringify(action.payload)}`);

//             if(Object.keys(state.data).includes(action.payload.id)){
//                 state.data[action.payload.id].testAnswer = {   
//                     data: action.payload.testAnswer, 
//                     loadStatus: LoadStatus.SUCCESS, 
//                 }
//             };
//         });
//         builder.addCase(asyncGetTestAnswer.pending, (state, action) => {
//             console.log(`asyncGetTestAnswer.pending`);             
//             state.data[action.meta.arg].testAnswer.loadStatus = LoadStatus.PENDING;
//         });
//         builder.addCase(asyncGetTestAnswer.rejected, (state, action) => {
//             console.log(`asyncGetTestAnswer.rejected`);
//             state.data[action.meta.arg].testAnswer.loadStatus = LoadStatus.FAIL;
//         });

//         /* asyncGetChemistry */
//         builder.addCase(asyncGetChemistry.fulfilled, (state, action: PayloadAction<{idList: IProfileId[], chemistry: Chemistry}>) => {
//             console.log(`asyncGetChemistry.fulfilled: users=${action.payload.idList} action.payload=${JSON.stringify(action.payload)}`)
//             state.chemistry = {
//                 loadStatus: LoadStatus.SUCCESS,
//                 data: action.payload.chemistry,
//             } 
//         });
//         builder.addCase(asyncGetChemistry.pending, (state, action) => {
//             console.log(`asyncGetChemistry.pending`);
//             /* https://github.com/reduxjs/redux-toolkit/issues/776 */
//             state.chemistry.loadStatus = LoadStatus.PENDING;
//         });
//         builder.addCase(asyncGetChemistry.rejected, (state, action) => {
//             console.log(`asyncGetChemistry.rejected`);
//             state.chemistry.loadStatus = LoadStatus.FAIL;
//         });
//     },
// })

// const useProfileObject = () => {
//     return(useSelector(( state:RootState ) => state.profile ));
// }

// const useProfileList = () => {
//     const idList = useSelector(( state:RootState ) => Object.keys( state.profile ), shallowEqual);
//     // const idList = useSelector(( state:RootState ) => state.profile.idList );
//     useEffect(()=>{
//         console.log(`useProfileList: idList=${idList}`);
//     }, [ idList ])
//     /* Use ShallowEqual */
//     return ( idList );
// }

// const useTestAnswerObject = ( testName: TestName ) => {

//     // const ob = useSelector(( state:RootState ) => state.profile);
//     useEffect(()=>{
//         console.log(`Using [useTestAnswerObject]`);
//     }, [ ])

//     return(
//         useSelector(( state:RootState ) => 
//             Object.fromEntries(
//                 Object.entries( state.profile ).map(([ id, profile ])=>{
//                     console.log(`[useTestAnswerObject]\n id=${ id }\n profile.testAnswer.loadStatus=${profile.testAnswer.loadStatus}`)
//                     return ([ id, profile ] as const);
//                 }).filter(([ , profile ]) => profile.testAnswer.loadStatus === LoadStatus.REST && Object.keys( profile.testAnswer.data ).length > 0 )
//                 .map( ([ id, profile ])=>{
//                     return( [ id, profile.testAnswer.data[testName] ] as const )
//                 })
//             ), shallowEqual   
//         )
//     );
// };

// const useITestResultObject = () => {
//     return(
//         useSelector(( state:RootState ) => 
//             Object.fromEntries(
//                 Object.entries( state.profile ).map( ([ id, profile ])=>
//                     [id, profile.testResult.data]
//                 )
//             )
//         )
//     );
// };

// const useITestResult = ( id: IProfileId ) => useSelector(( state:RootState ) => 
//     state.profile.data[ id ].testResult.data 
// )

// // const useChemistry = () => {
// //     return(useSelector(( state:RootState )=>state.profile.chemistry));
// // }

// const useFindUser = () => {
//     const idList = useProfileList();
    
//     return useCallback((id: IProfileId) => (
//         idList.includes(id) 
//     )        
//     , [idList]);    
// }


// /* 데이터 Fetch, 로드 상태 관리, 로드 전 초기 렌더 방지. */
// // const useLoadChemistry () => {
// //     const [ doWaitApi, setDoWaitApi ] = useState<boolean>(true);
// //     const [ status, setStatus ] = useProfileLoadStatus( id, key );

// //     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

// //     /* 테스트 결과 Fetch */
// //     useEffect(() => {
// //         dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id, key}));
// //         if(key === 'testResult'){
// //             dispatch(asyncGetTestResult(id));
// //         }
// //         else if(key === 'testAnswer'){                
// //             dispatch(asyncGetTestAnswer(id));
// //         }
// //         setDoWaitApi(false);
// //     }, [ id, key, dispatch ]);

// //     useEffect(()=>{
// //         if(status === LoadStatus.SUCCESS){
// //             setStatus(LoadStatus.REST);
// //         }
// //     }, [ status, setStatus ])

// //     return ({ status: status, setStatus: setStatus, doWaitApi: doWaitApi });
// // }


// /* 1 id */
// const useLoadData = ( id : IProfileId, key : TestDataKey ) => {
//     const [ doWaitApi, setDoWaitApi ] = useState<boolean>(true);
//     const [ status, setStatus ] = useProfileLoadStatus( id, key );

//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

//     /* 테스트 결과 Fetch */
//     useEffect(() => {
//         dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id, key}));
//         if(key === 'testResult'){
//             dispatch(asyncGetTestResult(id));
//         }
//         else if(key === 'testAnswer'){                
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
// };

// const useHandleSuccessAll = ( status : LoadStatus, setStatus: ( loadStatus: LoadStatus ) => void, key : TestDataKey ) => {
//     const dispatch = useDispatch();
//     // const [ isSucess, setIsSuccess ]= useState();

//     // useEffect(()=>{
//     //     const isSuccess = status === LoadStatus.SUCCESS;        
//     // })


//     useEffect(()=>{
//         console.log(`[useHandleSuccessAll] status updated: status=${status}`);
//         if( status === LoadStatus.SUCCESS ){
//             dispatch(setStatusAll({ loadStatus: LoadStatus.REST, key : key }));
//             setStatus( LoadStatus.REST );        
//         }        
//     }, [ status ])
// }

// /* Multiple Profiles */
// const useLoadDataAll = ( idList : IProfileId[], key : TestDataKey ) => {
//     const [ doWaitApi, setDoWaitApi ] = useState<boolean>(true);
//     const [ status, setStatus ] = useProfileLoadStatusAll( key );

//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    
//     /* 테스트 결과 Fetch */
//     const getDataAll =  useCallback(()=>{
//         console.log(`[useLoadDataAll]-[getDataAll]: idList=${idList} key=${key}`);

//         const fetch = key === 'testResult' ? 
//             ( id : IProfileId ) => dispatch(asyncGetTestResult( id )) 
//             : ( id : IProfileId ) => dispatch(asyncGetTestAnswer( id ));

//         idList.forEach(( id )=>{        
//             dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id, key}));
//             fetch( id );
//         })
//         setDoWaitApi(false);
//     }, [ idList, key, dispatch ]);

//     useEffect(()=>{
//         console.log(`[useLoadDataAll] Calling`);
//     }, []);

//     return ({ 
//         getDataAll: getDataAll,
//         status: status, 
//         setStatus: setStatus, 
//         doWaitApi: doWaitApi 
//     });
// };

// const useLoadDataAll_ = ( key : TestDataKey ) => {
//     const [ doWaitApi, setDoWaitApi ] = useState<boolean>(true);
//     const [ status, setStatus ] = useProfileLoadStatusAll( key );
//     const idList : IProfileId[] = useProfileList();

//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

//     useEffect(()=>{
//         console.log(`Using [useLoadDataAll]`);
//     }, [])    
//     useEffect(()=>{
//         console.log(`[useLoadDataAll]: idList`);
//     }, [idList])
//     useEffect(()=>{
//         console.log(`[useLoadDataAll] key`);
//     }, [key])

//     /* 테스트 결과 Fetch */
//     const getDataAll =  useCallback(()=>{
//         console.log(`[useLoadDataAll]-[getDataAll]: idList=${idList} key=${key}`);

//         const fetch = key === 'testResult' ? 
//             ( id : IProfileId ) => dispatch(asyncGetTestResult( id )) 
//             : ( id : IProfileId ) => dispatch(asyncGetTestAnswer( id ));

//         idList.forEach(( id )=>{        
//             dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id, key}));
//             fetch( id );
//         })
//         setDoWaitApi(false);
//     }, [ idList, key, dispatch ]);

//     return ({ 
//         getDataAll: getDataAll,
//         status: status, 
//         setStatus: setStatus, 
//         doWaitApi: doWaitApi 
//     });
// };

// // const useGetResult = () => {
// //     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
// //     return useCallback((id: IProfileId) => {
// //         console.log("userListReducer: useGetResult");        
// //         dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id: id, key: 'testResult'}));
// //         if(true) dispatch(asyncGetTestResult(id));
// //     }
// //     , [dispatch]);
// // }

// // const useGetTestAnswer = () => {
// //     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
// //     return useCallback((id: IProfileId) => {
// //         console.log("userListReducer: useGetTestAnswer");        
// //         dispatch(profileSlice.actions.setStatus({ loadStatus: LoadStatus.PENDING, id: id, key: 'testAnswer'}));
// //         dispatch(asyncGetTestAnswer(id));
// //     }
// //     , [dispatch]);
// // }

// const useGetData = ( id: IProfileId, key : TestDataKey ) => {
//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     dispatch( profileSlice.actions.setStatus( { loadStatus: LoadStatus.PENDING, id, key }) );
//     if( key === 'testAnswer' ){     
//         dispatch( asyncGetTestAnswer( id ) );
//     }
//     else if( key === 'testResult' ){
//         dispatch( asyncGetTestResult( id ) );
//     } 
// } 

// const useGetChemistry = () => {
//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     const idList = useProfileList();

//     return useCallback(() => {
//         console.log("userListReducer: useGetChemistry");        
//         dispatch(profileSlice.actions.setChemistryLoadStatus( LoadStatus.PENDING ));
//         dispatch( asyncGetChemistry( idList ) );
//     }
//     , [ idList ]);
// }

// const useProfileLoadStatus = ( id : IProfileId, key : TestDataKey ) => {
//     const isAdded = useProfileList().includes( id );
//     const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     return ([
//         useSelector(( state:RootState ) => isAdded ? state.profile.data[id].data[key].loadStatus : undefined),
//         useCallback(( loadStatus : LoadStatus ) => {
//             if ( isAdded ){
//                 dispatch(profileSlice.actions.setStatus({ loadStatus, id, key }));
//             }
//         }, [ dispatch, id, key, isAdded ])
//     ] as const);
// }

// const useSearchStatus = ( id : IProfileId ) => {

//     const search = useSelector(( state:RootState ) => state.profile.search );
//     const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
//     const isSearching = Object.keys( search ).includes( id );

//     useEffect(()=>{
//         console.log(`Using [useSearchStatus] id=${ id }`);
//     }, [ id ])

//     return (
//         [
//             isSearching ? search[id].loadStatus : undefined,
//             useCallback(( loadStatus : LoadStatus ) => {
//                 if ( isSearching ){
//                     dispatch( profileSlice.actions.setSearchStatus({ id, loadStatus }) );
//                 }
//             }, [ dispatch, isSearching ])
//         ] as const
//     );
// }

// const useSearchStatusAll = ( idList : IProfileId[] ) => {

//     const search = useSelector(( state:RootState ) => state.profile.search );
//     const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

//     const idToStatus = Object.fromEntries(
//         idList.map( id => (
//             [ id, Object.keys( search ).includes( id ) ? search[id].loadStatus : undefined ]
//         ))
//     )

//     const idToSetStatus = Object.fromEntries(
//         idList.map( id => (
//             [
//                 id, Object.keys( search ).includes( id )                     
//                 ? ( loadStatus : LoadStatus ) => {
//                     dispatch( profileSlice.actions.setSearchStatus({ id, loadStatus }) );
//                 }
//                 : ( loadStatus : LoadStatus ) => {} 
//             ]
//         ))
//     )

//     useEffect(()=>{
//         console.log(`Using [useSearchStatus] idList=${ idList }`);
//     }, [ idList ]);

//     return(
//         [ idToStatus, idToSetStatus ] as const
//     )


// }



// const useProfileLoadStatusAll = ( key : TestDataKey ) => {
    
//     const [ status, setStatus ] = useState<LoadStatus>( LoadStatus.REST );

//     /* 리스트의 모든 user 에 대한 loadStatus 리스트 */
//     const loadStatusList : LoadStatus[] = useSelector(( state:RootState ) =>
//         Object.entries(state.profile).map(([, profile]) => 
//             profile[key].loadStatus
//         )
//     )

//     if( status === LoadStatus.PENDING || status === LoadStatus.REST ){
//         if( loadStatusList.includes( LoadStatus.FAIL ) ){
//             setStatus( LoadStatus.FAIL );
//         } 
//         else if( loadStatusList.includes( LoadStatus.MISS ) ){
//             setStatus( LoadStatus.MISS );            
//         } 
//         else if ( loadStatusList.every( (status) => (status === LoadStatus.SUCCESS) ) ){      
//             console.log('useProfileLoadStatusAll: useEffect: SCUEESS')          
//             setStatus( LoadStatus.SUCCESS );            
//         }
//     }

//     /* 리스트의 모든 loadStatus를 조합해 최종 loadStatus 를 반환. */
//     useEffect(()=>{
//         console.log(`[useProfileLoadStatusAll] loadStatusList updated: key=${key} loadStatusList=${loadStatusList} status=${status}`);

//         // else if( status === LoadStatus.REST ){
//         //     if( loadStatusList.includes( LoadStatus.PENDING ) ){
//         //         setStatus( LoadStatus.PENDING );
//         //     } 
//         // }
//     }, [ loadStatusList ])

//     return ([ status, setStatus ] as const);
// }

// const useLoadStatusAll = ( loadStatusList : LoadStatus[] ) => {
    
//     const [ status, setStatus ] = useState<LoadStatus>( LoadStatus.PENDING );

//     /* 리스트의 모든 loadStatus를 조합해 최종 loadStatus 를 반환. */
//     useEffect(()=>{
//         console.log(`[useLoadStatusAll] loadStatusList updated: loadStatusList=${loadStatusList} status=${status}`);
//         if( status === LoadStatus.PENDING || status === LoadStatus.REST ){
//             if( loadStatusList.includes( LoadStatus.FAIL ) ){
//                 setStatus( LoadStatus.FAIL );
//             } 
//             else if( loadStatusList.includes( LoadStatus.MISS ) ){
//                 setStatus( LoadStatus.MISS );            
//             } 
//             else if ( loadStatusList.every( (status) => (status === LoadStatus.SUCCESS) ) ){      
//                 console.log('[useLoadStatusAll] useEffect: SCUEESS')          
//                 setStatus( LoadStatus.SUCCESS );            
//             }
//         }
//     }, [ loadStatusList, status ])

//     return ([ status, setStatus ] as const);
// }


// const useChemistryLoadStatus = () => {
//     const dispatch = useDispatch(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

//     return ([
//         // useSelector(( state:RootState )=>state.profile.chemistry.loadStatus),
//         useCallback(( status: LoadStatus ) =>
//         dispatch( profileSlice.actions.setChemistryLoadStatus(status) )
//     , [ dispatch ]),
//     ] as const);
// }

// // const withProfileListLoadStatus = <T extends LoadStatusProps>(WrappedComponent: ComponentType<T>) =>
// //     (userId?: IProfileId) =>
// //     (props: Omit<T, keyof LoadStatusProps>) => {        
// //     const [status, setStatus] = useProfileLoadStatus({ id: userId });
// //     return(
// //         <WrappedComponent {...{status:status, setStatus:setStatus}} {...props as T}/>
// //     ); 
// // }

// interface valueToProfileListType {[value: string] : IProfileId[]};

// const useValueToProfileIdList = ( testName : TestName ) => {
    
//     /* @TODO 완성 후 testAnswerDefault 제거 */
//     // const testAnswerDefault = useSelector(( state:RootState )=>(state.testAnswer.data[testName.testName][testName.subTestName]));
    
//     const [ valueToProfileList, setValueToProfileIdList ] = useState<valueToProfileListType>({} as valueToProfileListType);
//     const testAnswerObject = useTestAnswerObject( testName );

//     /* Debug */
//     useEffect(()=>{
//         console.log(`[useValueToProfileIdList]: testAnswerObject Updated\n testName=${ JSON.stringify( testName ) } testAnswerObject=${ JSON.stringify( testAnswerObject ) }`);  
        
//         let valueToProfileListTemp : {[value: string] : IProfileId[]} = {};
//         valueToProfileListTemp = {};

//         Object.entries( testAnswerObject ).forEach(( [ id, value ] )=>{
//             // const value_= ( value ? value : testAnswerDefault)?.toString() as string;  
//             const value_= value?.toString() as string;  
//             if( value_ ){
//                 if( Object.keys(valueToProfileListTemp).includes( value_ ) ){
//                     valueToProfileListTemp[ value_ ].push( id );
//                 }
//                 else {
//                     valueToProfileListTemp[ value_ ] = [ id ];
//                 }
//             }
//         });   

//         setValueToProfileIdList(valueToProfileListTemp);

//     }, [ testAnswerObject ]);    
    
//     return( valueToProfileList );
// }

// // export default profileSlice.reducer;
// // export const { setProfile, deleteUser, setStatus, setStatusAll, startSearch, endSearch, setSearchStatus } = profileSlice.actions;
// // export { asyncGetTestResult, asyncGetTestAnswer, asyncSearchProfile };
// // export { useProfileList, useProfileLoadStatus, useProfileLoadStatusAll, asyncGetExampleITestResultList,
// //     useSearchStatusAll,
// //     useLoadData, useLoadDataAll, 
// //     useTestAnswerObject, useITestResultObject,
// //     useGetChemistry, useGetData,
// //     // useGetResult, useGetTestAnswer, 
// //     useChemistryLoadStatus, useSearchStatus,   useLoadStatusAll,
// //     useFindUser, useValueToProfileIdList, useHandleSuccessAll, useITestResult };

// // export type { TestDataKey };

// /* Deprecated */
// // function dataReducer(state=initialState, action: dataAction) {
// //     switch(action.type) {
// //         case SET : 
// //             return {...state,
// //                 [action.payload.testName] : action.payload.value
// //             };
// //         case SETBUDGET : 
// //             return {...state,
// //                 [action.payload.testName] : {
// //                     ...state[action.payload.testName] as {},
// //                     [action.payload.SubTestName]: action.payload.value
// //                 }
// //             };
// //         default : 
// //             return state;
// //     }
// // }