"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.clearChemistry = exports.asyncJoinChemistry = exports.asyncGetChemistry = exports.asyncCreateChemistry = void 0;
exports.filterProfile = filterProfile;
exports.useProfile = exports.useIsChemistryEnabled = exports.useCityChemistry = exports.useChemistryLoadStatus = exports.useChemistryId = exports.useChemistry = void 0;
exports.useProfileAll = useProfileAll;
exports.useTestAnswerObject = exports.useSortedCityList = exports.useProfileIdList = void 0;
var _react = require("react");
var _toolkit = require("@reduxjs/toolkit");
var _axios = _interopRequireDefault(require("axios"));
var _reactRedux = require("react-redux");
var _appConst = require("../common/app-const");
var _IChemistry = require("../interfaces/IChemistry");
var _IProfile = require("../interfaces/IProfile");
var _LoadStatus = require("../interfaces/enums/LoadStatus");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*** React ***/

/* Externals */

/*** Chemistry Chemistry ***/

;
const initialState = {
  data: _IChemistry.defaultChemistry,
  loadStatus: _LoadStatus.LoadStatus.REST
};
const asyncCreateChemistry = exports.asyncCreateChemistry = (0, _toolkit.createAsyncThunk)("chemistry/asyncCreateChemistry", async (createDTO, thunkAPI) => {
  console.log(`[asyncCreateChemistry] POST /chemistry/create\n\tcreateDTO=${JSON.stringify(createDTO)}`);
  try {
    const response = await _axios.default.post(`/chemistry/create`, createDTO, {
      method: "POST",
      headers: _appConst.HEADERS_AXIOS
    });
    return response.data;
  } catch (e) {
    console.log(`[asyncCreateChemistry] error: ${e}`);
    return thunkAPI.rejectWithValue(e);
  }
});
const asyncJoinChemistry = exports.asyncJoinChemistry = (0, _toolkit.createAsyncThunk)("chemistry/asyncJoinChemistry", async ({
  userId,
  chemistryId
}, thunkAPI) => {
  console.log(`[asyncJoinChemistry] PUT /chemistry/join\n\tuserId=${userId}\n\tchemistryId=${chemistryId}`);
  try {
    const response = await _axios.default.put(`/chemistry/join`, {
      userId: userId,
      chemistryId: chemistryId
    }, {
      method: "PUT",
      headers: _appConst.HEADERS_AXIOS
    });
    return response.data;
  } catch (e) {
    console.log(`[asyncJoinChemistry] error: ${e}`);
    return thunkAPI.rejectWithValue(e);
  }
});
const asyncGetChemistry = exports.asyncGetChemistry = (0, _toolkit.createAsyncThunk)("chemistry/asyncGetChemistry", async (id, thunkAPI) => {
  console.log(`[asyncGetChemistry] GET /chemistry\n\tid=${id}`);
  try {
    const response = await _axios.default.get(`/chemistry`, {
      method: "GET",
      headers: _appConst.HEADERS_AXIOS,
      params: {
        id: id
      }
    });
    return response.data;
  } catch (e) {
    console.log(`[asyncGetChemistry] error: ${e}`);
    return thunkAPI.rejectWithValue(e);
  }
});
const chemistrySlice = (0, _toolkit.createSlice)({
  name: 'chemistry',
  initialState: initialState,
  reducers: {
    setChemistryLoadStatus: (state, action) => {
      state.loadStatus = action.payload;
    },
    clearChemistry: state => {
      state.data = _IChemistry.defaultChemistry;
    }
  },
  extraReducers: builder => {
    /* asyncCreateChemistry */
    builder.addCase(asyncCreateChemistry.fulfilled, (state, action) => {
      console.log(`asyncCreateChemistry.fulfilled: action.payload=${JSON.stringify(action.payload)}`);
      state.data = {
        ..._IChemistry.defaultChemistry,
        ...action.payload
      };
      state.loadStatus = _LoadStatus.LoadStatus.SUCCESS;
    });
    builder.addCase(asyncCreateChemistry.pending, (state, action) => {
      console.log(`asyncCreateChemistry.pending`);
      /* https://github.com/reduxjs/redux-toolkit/issues/776 */
      state.loadStatus = _LoadStatus.LoadStatus.PENDING;
    });
    builder.addCase(asyncCreateChemistry.rejected, (state, action) => {
      console.log(`asyncCreateChemistry.rejected`);
      state.loadStatus = _LoadStatus.LoadStatus.FAIL;
    });

    /* asyncJoinChemistry */
    builder.addCase(asyncJoinChemistry.fulfilled, (state, action) => {
      console.log(`asyncJoinChemistry.fulfilled: action.payload=${JSON.stringify(action.payload)}`);
      state.data = action.payload;
      state.loadStatus = _LoadStatus.LoadStatus.SUCCESS;
    });
    builder.addCase(asyncJoinChemistry.pending, (state, action) => {
      console.log(`asyncJoinChemistry.pending`);
      /* https://github.com/reduxjs/redux-toolkit/issues/776 */
      state.loadStatus = _LoadStatus.LoadStatus.PENDING;
    });
    builder.addCase(asyncJoinChemistry.rejected, (state, action) => {
      console.log(`asyncJoinChemistry.rejected`);
      state.loadStatus = _LoadStatus.LoadStatus.FAIL;
    });

    /* asyncGetChemistry */
    builder.addCase(asyncGetChemistry.fulfilled, (state, action) => {
      console.log(`asyncGetChemistry.fulfilled: action.payload=${JSON.stringify(action.payload)}`);
      state.data = action.payload;
      state.loadStatus = _LoadStatus.LoadStatus.SUCCESS;
    });
    builder.addCase(asyncGetChemistry.pending, (state, action) => {
      console.log(`asyncGetChemistry.pending`);
      /* https://github.com/reduxjs/redux-toolkit/issues/776 */
      state.loadStatus = _LoadStatus.LoadStatus.PENDING;
    });
    builder.addCase(asyncGetChemistry.rejected, (state, action) => {
      console.log(`asyncGetChemistry.rejected`);
      state.loadStatus = _LoadStatus.LoadStatus.FAIL;
    });
  }
});
const useChemistry = () => {
  return (0, _reactRedux.useSelector)(state => state.chemistry.data);
};
exports.useChemistry = useChemistry;
const useChemistryId = () => {
  return (0, _reactRedux.useSelector)(state => state.chemistry.data.id);
};

// const useIsChemistryUpdated = () => {
//     return (useSelector((state: RootState) => (state.chemistry.loadStatus === LoadStatus.REST) && (state.chemistry.data !== undefined)));
// };
exports.useChemistryId = useChemistryId;
const useIsChemistryEnabled = () => {
  return useProfileIdList().length > 1;
};
exports.useIsChemistryEnabled = useIsChemistryEnabled;
const useCityChemistry = cityClass => {
  return (0, _reactRedux.useSelector)(state => state.chemistry.data ? state.chemistry.data.cityChemistry[cityClass] : -1);
};
exports.useCityChemistry = useCityChemistry;
const useSortedCityList = () => {
  const cityChemistry = (0, _reactRedux.useSelector)(state => state.chemistry.data.cityChemistry);
  return cityChemistry ? Object.entries(cityChemistry).sort((a, b) => b[1] - a[1]).map(([cityClass, score]) => cityClass) : undefined;
};
exports.useSortedCityList = useSortedCityList;
const useChemistryLoadStatus = () => {
  const dispatch = (0, _reactRedux.useDispatch)(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

  return [(0, _reactRedux.useSelector)(state => state.chemistry.loadStatus), (0, _react.useCallback)(status => dispatch(chemistrySlice.actions.setChemistryLoadStatus(status)), [dispatch])];
};
exports.useChemistryLoadStatus = useChemistryLoadStatus;
const useTestAnswerObject = testName => {
  return (0, _reactRedux.useSelector)(state => Object.fromEntries(Object.entries(state.chemistry.data?.profileList).filter(([, profile]) => profile.testAnswer !== null).map(([id, profile]) => {
    return [id, profile.testAnswer[testName]];
  })), _reactRedux.shallowEqual);
};
exports.useTestAnswerObject = useTestAnswerObject;
const useProfile = (id, key) => {
  return (0, _reactRedux.useSelector)(state => Object.keys(state.chemistry.data.profileList).includes(id) ? key ? state.chemistry.data.profileList[id][key] : state.chemistry.data.profileList[id] : _IProfile.defaultProfile);
};
exports.useProfile = useProfile;
const useProfileIdList = (answeredProfileOnly = true) => {
  return (0, _reactRedux.useSelector)(state => Object.values(state.chemistry.data.profileList).filter(profile => answeredProfileOnly ? profile.testAnswer !== null : true).map(profile => profile.id), _reactRedux.shallowEqual);
};
exports.useProfileIdList = useProfileIdList;
function useProfileAll(idList, key, answeredProfileOnly = true) {
  const profileList = Object.values((0, _reactRedux.useSelector)(state => state.chemistry.data.profileList));
  return profileList.filter(({
    id
  }) => idList ? idList.includes(id) : true).filter(({
    testAnswer
  }) => answeredProfileOnly ? testAnswer !== null : true).map(profile => key ? profile[key] : profile);
}
function filterProfile(profileList, idList, key, answeredProfileOnly = true) {
  return profileList.filter(({
    id
  }) => idList ? idList.includes(id) : true).filter(({
    testAnswer
  }) => answeredProfileOnly ? testAnswer !== null : true).map(profile => key ? profile[key] : profile);
}
var _default = exports.default = chemistrySlice.reducer;
const {
  clearChemistry
} = chemistrySlice.actions;

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
exports.clearChemistry = clearChemistry;