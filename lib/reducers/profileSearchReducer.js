"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSearchedProfileList = exports.useProfileSearchStatus = exports.useFlaggedProfileList = exports.useAddProfiles = exports.resetSearch = exports.deleteFlagged = exports.default = exports.asyncSearchProfile = exports.addFlagged = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _toolkit = require("@reduxjs/toolkit");
var _axios = _interopRequireDefault(require("axios"));
var _appConst = require("../common/app-const");
var _LoadStatus = require("../interfaces/enums/LoadStatus");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*** React ***/

/*** Trip Chemistry ***/
/* Component */

/* State */
const initialState = {
  data: {
    searchedProfileList: [],
    flaggedProfileList: {}
  },
  loadStatus: _LoadStatus.LoadStatus.REST
};

/* Async Thunks */
const asyncSearchProfile = exports.asyncSearchProfile = (0, _toolkit.createAsyncThunk)("profileSearchSlice/asyncSearchProfile", async (keyword, thunkAPI) => {
  console.log(`[asyncSearchProfile] GET /profile/search?keyword=${keyword}`);
  try {
    const response = await _axios.default.get(`/profile/search`, {
      method: "GET",
      headers: _appConst.HEADERS_AXIOS,
      params: {
        keyword: keyword
      }
    });
    return response.data;
  } catch (e) {
    console.log(`[asyncSearchProfile] error: ${e}`);
    return thunkAPI.rejectWithValue(e);
  }
});

/* Slice */
const profileSearchSlice = (0, _toolkit.createSlice)({
  name: 'profileSearch',
  initialState: initialState,
  reducers: {
    setSearchStatus: (state, action) => {
      state.loadStatus = action.payload;
    },
    addFlagged: (state, action) => {
      state.data.flaggedProfileList = {
        ...state.data.flaggedProfileList,
        [action.payload.id]: action.payload
      };
    },
    deleteFlagged: (state, action) => {
      const newData = {
        ...state.data.flaggedProfileList
      };
      delete newData[action.payload];
      state.data.flaggedProfileList = newData;
    },
    resetFlag: state => {
      state.data.flaggedProfileList = {};
    },
    resetSearch: state => {
      state.data.searchedProfileList = [];
    }
  },
  extraReducers: builder => {
    /* asyncSearchProfile */
    builder.addCase(asyncSearchProfile.fulfilled, (state, action) => {
      console.log(`[asyncSearchProfile] fulfilled\n\tpayload=${action.payload}`);
      // state.data.searchedProfileList = action.payload.map( profileDTO => profileDTOtoProfile(profileDTO) );
      state.data.searchedProfileList = action.payload;
      state.loadStatus = _LoadStatus.LoadStatus.SUCCESS;
    });
    builder.addCase(asyncSearchProfile.pending, (state, action) => {
      console.log(`[asyncSearchProfile] pending`);
      /* https://github.com/reduxjs/redux-toolkit/issues/776 */
      state.loadStatus = _LoadStatus.LoadStatus.PENDING;
    });
    builder.addCase(asyncSearchProfile.rejected, (state, action) => {
      console.log(`[asyncSearchProfile] rejected`);
      state.loadStatus = _LoadStatus.LoadStatus.FAIL;
    });
  }
});
const useAddProfiles = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const flaggedProfileList = useFlaggedProfileList();
  return (0, _react.useCallback)(() => {
    console.log(`[useAddProfiles] Callback`);
    Object.values(flaggedProfileList).forEach(profile => {
      console.log(`[useAddProfiles] profile=${JSON.stringify(profile)}`);
      // dispatch(
      //     setProfile( profile )
      // );
    });
    dispatch(profileSearchSlice.actions.resetFlag());
  }, [flaggedProfileList, dispatch]);
};
exports.useAddProfiles = useAddProfiles;
const useSearchedProfileList = () => {
  return (0, _reactRedux.useSelector)(state => state.profileSearch.data.searchedProfileList);
};
exports.useSearchedProfileList = useSearchedProfileList;
const useFlaggedProfileList = () => {
  return (0, _reactRedux.useSelector)(state => state.profileSearch.data.flaggedProfileList);
};
exports.useFlaggedProfileList = useFlaggedProfileList;
const useProfileSearchStatus = () => {
  const dispatch = (0, _reactRedux.useDispatch)(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
  return [(0, _reactRedux.useSelector)(state => state.profileSearch.loadStatus), (0, _react.useCallback)(loadStatus => {
    dispatch(profileSearchSlice.actions.setSearchStatus(loadStatus));
  }, [dispatch])];
};
exports.useProfileSearchStatus = useProfileSearchStatus;
var _default = exports.default = profileSearchSlice.reducer;
const {
  resetSearch,
  addFlagged,
  deleteFlagged
} = profileSearchSlice.actions;
exports.deleteFlagged = deleteFlagged;
exports.addFlagged = addFlagged;
exports.resetSearch = resetSearch;