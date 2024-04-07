"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTestAnswerStatus = exports.useTestAnswer = exports.useTagSetAnswer = exports.useSubmitAnswer = exports.useIsTestAnswered = exports.useIsAllTestAnswered = exports.sampleTestAnswer = exports.deleteTagAnswer = exports.default = exports.asyncSubmitAnswer = exports.addTagAnswer = void 0;
var _react = require("react");
var _toolkit = require("@reduxjs/toolkit");
var _axios = _interopRequireDefault(require("axios"));
var _reactRedux = require("react-redux");
var _appConst = require("../common/app-const");
var _ITestAnswer = require("../interfaces/ITestAnswer");
var _authReducer = require("./authReducer");
var _ExpectationTag = require("../interfaces/enums/ExpectationTag");
var _ActivityTag = require("../interfaces/enums/ActivityTag");
var _LoadStatus = require("../interfaces/enums/LoadStatus");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* React */

/* React Packages */

/* App */

/* Debug */

const sampleTestAnswer = exports.sampleTestAnswer = {
  expectation: {
    selected: [],
    unSelected: Object.values(_ExpectationTag.ExpectationTag)
  },
  activity: {
    selected: [],
    unSelected: Object.values(_ActivityTag.ActivityTag)
  },
  leadership: 1,
  schedule: 4,
  food: 20000,
  /* 식사 평균 */
  // foodSpecial: undefined, /* 특별한 식사 */
  // accomodate: undefined, /* 숙소 평균 */
  // accomodateSpecial: undefined, /* 특별한 숙소 */

  metropolis: 1,
  history: 5,
  nature: 4
};
const initialState = {
  data: sampleTestAnswer,
  // data: defaultTestAnswer,
  loadStatus: _LoadStatus.LoadStatus.REST
};
;
;
const asyncSubmitAnswer = exports.asyncSubmitAnswer = (0, _toolkit.createAsyncThunk)("testAnswer/submitAnswer", async ({
  id,
  answer
}, thunkAPI) => {
  console.log(`[asyncSubmitAnswer] PUT /profile/answer?\n\tid=${id}\n\tanswer=${JSON.stringify(answer)}`);
  try {
    const response = await _axios.default.put(`/profile/answer`, answer, {
      method: "PUT",
      headers: _appConst.HEADERS_AXIOS,
      params: {
        id: id
      }
    });
    return response.data;
  } catch (e) {
    console.log(`[asyncSubmitAnswer] error: ${e}`);
    return thunkAPI.rejectWithValue(e);
  }
});
const testAnswerSlice = (0, _toolkit.createSlice)({
  name: 'testAnswer',
  initialState: initialState,
  reducers: {
    setNumericAnswer: (state, action) => {
      console.log(`[testAnswerSlice] [setNumericAnswer]: state=${JSON.stringify(state)} payload=${JSON.stringify(action.payload)}`);
      if (state.data) {
        state.data[action.payload.testName] = action.payload.value;
      }
    },
    addTagAnswer: (state, action) => {
      if (!state.data[action.payload.testName].selected.includes(action.payload.tag)) {
        state.data[action.payload.testName].selected.push(action.payload.tag);
      }
      state.data[action.payload.testName].unSelected.splice(state.data[action.payload.testName].unSelected.indexOf(action.payload.tag), 1);
    },
    deleteTagAnswer: (state, action) => {
      if (!state.data[action.payload.testName].unSelected.includes(action.payload.tag)) {
        state.data[action.payload.testName].unSelected.unshift(action.payload.tag);
      }
      state.data[action.payload.testName].selected.splice(state.data[action.payload.testName].selected.indexOf(action.payload.tag), 1);
    },
    setStatus: (state, action) => {
      state.loadStatus = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(asyncSubmitAnswer.fulfilled, (state, action) => {
      console.log(`[asyncSubmitAnswer] fulfilled\n\taction.payload=${JSON.stringify(action.payload)}`);
      state.loadStatus = _LoadStatus.LoadStatus.SUCCESS;
    });
    builder.addCase(asyncSubmitAnswer.pending, state => {
      console.log(`[asyncSubmitAnswer] pending`);
      state.loadStatus = _LoadStatus.LoadStatus.PENDING;
    });
    builder.addCase(asyncSubmitAnswer.rejected, state => {
      console.log(`[asyncSubmitAnswer] rejected`);
      state.loadStatus = _LoadStatus.LoadStatus.FAIL;
    });
  }
});
const useTestAnswer = testName => {
  const dispatch = (0, _reactRedux.useDispatch)();
  return [(0, _reactRedux.useSelector)(state => state.testAnswer.data[testName]), (0, _react.useCallback)(payload => dispatch(testAnswerSlice.actions.setNumericAnswer(payload)), [dispatch])];
};
exports.useTestAnswer = useTestAnswer;
const useTagSetAnswer = (testName, selected = true) => {
  return (0, _reactRedux.useSelector)(state => Array.from(state.testAnswer.data[testName][selected ? "selected" : "unSelected"].values()));
};
exports.useTagSetAnswer = useTagSetAnswer;
const useIsTestAnswered = testName => {
  return (0, _reactRedux.useSelector)(state => typeof state.testAnswer.data[testName] !== "object" ? state.testAnswer.data[testName] !== undefined : state.testAnswer.data[testName].selected.length >= _appConst.TEST_TYPE.tagSet.selectedMinLength);
};
exports.useIsTestAnswered = useIsTestAnswered;
const useIsAllTestAnswered = () => {
  return (0, _reactRedux.useSelector)(state => Object.values(state.testAnswer.data).map(answer => typeof answer !== "object" ? answer !== undefined : answer.selected.length >= _appConst.TEST_TYPE.tagSet.selectedMinLength).every(v => v));
};
exports.useIsAllTestAnswered = useIsAllTestAnswered;
const useTestAnswerStatus = () => {
  const dispatch = (0, _reactRedux.useDispatch)(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
  const status = (0, _reactRedux.useSelector)(state => state.testAnswer.loadStatus);
  return [status, (0, _react.useCallback)(status => {
    dispatch(testAnswerSlice.actions.setStatus(status));
  }, [dispatch])];
};
exports.useTestAnswerStatus = useTestAnswerStatus;
const useSubmitAnswer = () => {
  const dispatch = (0, _reactRedux.useDispatch)(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
  const {
    data
  } = (0, _reactRedux.useSelector)(state => state.testAnswer);
  const id = (0, _authReducer.useUserId)();
  return (0, _react.useCallback)(() => {
    console.log(`[useSubmitAnswer] id=${id} answer=${JSON.stringify((0, _ITestAnswer.testAnswerToDTO)(data))}`);
    dispatch(asyncSubmitAnswer({
      id,
      answer: (0, _ITestAnswer.testAnswerToDTO)(data)
    }));
  }, [dispatch, data, id]);
};
exports.useSubmitAnswer = useSubmitAnswer;
var _default = exports.default = testAnswerSlice.reducer;
const {
  addTagAnswer,
  deleteTagAnswer
} = testAnswerSlice.actions;
exports.deleteTagAnswer = deleteTagAnswer;
exports.addTagAnswer = addTagAnswer;