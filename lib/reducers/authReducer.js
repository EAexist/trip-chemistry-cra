"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUserProfile = exports.useUserInfo = exports.useUserId = exports.useIsInitialized = exports.useIsAutoLoginEnabled = exports.useIsAuthorized = exports.useHasAnsweredTest = exports.useGetProfile = exports.useChemistryIdList = exports.useAuthorize = exports.useAuthLoadStatus = exports.setLoadStatus = exports.setIsInitialized = exports.disableAutoLogin = exports.default = exports.authorize = exports.asyncSetNickname = exports.asyncKakaoLogout = exports.asyncKakaoLoginByAccessToken = exports.asyncKakaoLogin = exports.asyncGuestSignIn = exports.asyncGuestLogin = exports.asyncGetProfile = void 0;
var _react = require("react");
var _toolkit = require("@reduxjs/toolkit");
var _axios = _interopRequireDefault(require("axios"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _appConst = require("../common/app-const");
var _IUserProfile = require("../interfaces/IUserProfile");
var _LoadStatus = require("../interfaces/enums/LoadStatus");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*** React ***/

/*** Trip Chemistry ***/

/* Interface */

;
/* DTO */

/* Async Thunks */
const asyncGuestSignIn = exports.asyncGuestSignIn = (0, _toolkit.createAsyncThunk)("authSlice/asyncGuestSignIn", async (_, thunkAPI) => {
  console.log(`[asyncGuestSignIn] POST /auth/guest/signIn`);
  try {
    const response = await _axios.default.post(`/auth/guest/signIn`, {
      method: "POST",
      headers: _appConst.HEADERS_AXIOS
    });
    return response.data;
  } catch (e) {
    console.log(`[asyncGuestSignIn] error: ${e}`);
    return thunkAPI.rejectWithValue(e);
  }
});
const asyncGuestLogin = exports.asyncGuestLogin = (0, _toolkit.createAsyncThunk)("authSlice/asyncGuestLogin", async (id, thunkAPI) => {
  console.log(`[asyncGuestLogin] POST /auth/guest/login`);
  try {
    const response = await _axios.default.get(`/auth/guest/login`, {
      method: "GET",
      headers: _appConst.HEADERS_AXIOS,
      params: {
        id: id
      }
    });
    return response.data;
  } catch (e) {
    console.log(`[asyncGuestLogin] error: ${e}`);
    return thunkAPI.rejectWithValue(e);
  }
});
const asyncKakaoLogin = exports.asyncKakaoLogin = (0, _toolkit.createAsyncThunk)("authSlice/asyncKakaoLogin", async ({
  code,
  id
}, thunkAPI) => {
  console.log(`[asyncKakaoLogin] POST /auth/kakao/login code=${code} id=${id}`);
  try {
    const response = await _axios.default.post(`/auth/kakao/login`, {
      code: code,
      id: id
    }, {
      method: "POST",
      headers: _appConst.HEADERS_AXIOS
    });
    return response.data;
  } catch (e) {
    console.log(`[asyncKakaoLogin] error: ${e}`);
    return thunkAPI.rejectWithValue(e);
  }
});
const asyncKakaoLoginByAccessToken = exports.asyncKakaoLoginByAccessToken = (0, _toolkit.createAsyncThunk)("authSlice/asyncKakaoLoginByAccessToken", async ({
  accessToken
}, thunkAPI) => {
  console.log(`[asyncKakaoLoginByAccessToken] POST /auth/kakao/login accessToken=${accessToken}`);
  try {
    const response = await _axios.default.post(`/auth/kakao/login/ByAccessToken`, {
      accessToken: accessToken
    }, {
      method: "POST",
      headers: _appConst.HEADERS_AXIOS
    });
    return response.data;
  } catch (e) {
    console.log(`[asyncKakaoLoginByAccessToken] error: ${e}`);
    return thunkAPI.rejectWithValue(e);
  }
});
const asyncKakaoLogout = exports.asyncKakaoLogout = (0, _toolkit.createAsyncThunk)("authSlice/asyncKakaoLogout", async (id, thunkAPI) => {
  console.log(`[asyncLogout] GET /auth/kakao/logout id=${id}`);
  try {
    const response = await _axios.default.get(`/auth/kakao/logout`, {
      method: "GET",
      headers: _appConst.HEADERS_AXIOS,
      params: {
        id: id
      }
    });
    return response.data;
  } catch (e) {
    console.log(`[asyncLogout] error: ${e}`);
    return thunkAPI.rejectWithValue(e);
  }
});
const asyncSetNickname = exports.asyncSetNickname = (0, _toolkit.createAsyncThunk)("authSlice/asyncSetNickname", async ({
  id,
  value
}, thunkAPI) => {
  console.log(`[asyncSetNickname] PUT /profile/setNickname?id=${id}&value=${value}`);
  try {
    const response = await _axios.default.put(`/profile/setNickname`, {
      value: value
    }, {
      method: "PUT",
      headers: _appConst.HEADERS_AXIOS,
      params: {
        id: id
      }
    });
    return response.data;
  } catch (e) {
    console.log(`[asyncSetNickname] error: ${e}`);
    return thunkAPI.rejectWithValue(e);
  }
});
const asyncGetProfile = exports.asyncGetProfile = (0, _toolkit.createAsyncThunk)("authSlice/asyncGetProfile", async (id, thunkAPI) => {
  console.log(`[asyncGetProfile] GET /profile?id=${id}`);
  try {
    const response = await _axios.default.get(`/profile`, {
      method: "GET",
      headers: _appConst.HEADERS_AXIOS,
      params: {
        id: id
      }
    });
    return response.data;
  } catch (e) {
    console.log(`[asyncGetProfile] error: ${e}`);
    return thunkAPI.rejectWithValue(e);
  }
});

/* State */
const defaultState = {
  isAuthorized: false,
  doRequireInitialization: undefined,
  isAutoLoginEnabled: true,
  profile: _IUserProfile.defaultUserProfile
};
const initialState = {
  data: defaultState,
  loadStatus: _LoadStatus.LoadStatus.REST
  // setNicknameLoadStatus: LoadStatus.REST,
};

/* Slice */
const authSlice = (0, _toolkit.createSlice)({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoadStatus: (state, action) => {
      state.loadStatus = action.payload;
    },
    disableAutoLogin: state => {
      state.data.isAutoLoginEnabled = false;
    },
    authorize: state => {
      state.data.isAuthorized = true;
    },
    setIsInitialized: state => {
      state.data.doRequireInitialization = false;
    }
  },
  extraReducers: builder => {
    /* asyncGuestSignIn */
    builder.addCase(asyncGuestSignIn.fulfilled, (state, action) => {
      console.log(`[asyncGuestSignIn] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
      state.data = {
        ...state.data,
        doRequireInitialization: true,
        profile: action.payload
      };
      state.loadStatus = _LoadStatus.LoadStatus.SUCCESS;
    });
    builder.addCase(asyncGuestSignIn.pending, (state, action) => {
      console.log(`[asyncGuestSignIn] pending`);
      /* https://github.com/reduxjs/redux-toolkit/issues/776 */
      state.loadStatus = _LoadStatus.LoadStatus.PENDING;
    });
    builder.addCase(asyncGuestSignIn.rejected, (state, action) => {
      console.log(`[asyncGuestSignIn] rejected`);
      state.loadStatus = _LoadStatus.LoadStatus.FAIL;
    });

    /* asyncGuestLogin */
    builder.addCase(asyncGuestLogin.fulfilled, (state, action) => {
      console.log(`[asyncGuestLogin] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
      state.data = {
        ...state.data,
        doRequireInitialization: false,
        profile: action.payload
      };
      state.loadStatus = _LoadStatus.LoadStatus.SUCCESS;
    });
    builder.addCase(asyncGuestLogin.pending, (state, action) => {
      console.log(`[asyncGuestLogin] pending`);
      /* https://github.com/reduxjs/redux-toolkit/issues/776 */
      state.loadStatus = _LoadStatus.LoadStatus.PENDING;
    });
    builder.addCase(asyncGuestLogin.rejected, (state, action) => {
      console.log(`[asyncGuestLogin] rejected`);
      state.loadStatus = _LoadStatus.LoadStatus.FAIL;
    });

    /* asyncKakaoLogin */
    builder.addCase(asyncKakaoLogin.fulfilled, (state, action) => {
      console.log(`[asyncKakaoLogin] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
      state.data.doRequireInitialization = action.payload.doRequireInitialization;
      state.data.profile = action.payload.profile;
      state.loadStatus = _LoadStatus.LoadStatus.SUCCESS;
    });
    builder.addCase(asyncKakaoLogin.pending, (state, action) => {
      console.log(`[asyncKakaoLogin] pending`);
      /* https://github.com/reduxjs/redux-toolkit/issues/776 */
      state.loadStatus = _LoadStatus.LoadStatus.PENDING;
    });
    builder.addCase(asyncKakaoLogin.rejected, (state, action) => {
      console.log(`[asyncKakaoLogin] rejected`);
      state.loadStatus = _LoadStatus.LoadStatus.FAIL;
    });

    /* asyncKakaoLoginByAccessToken */
    builder.addCase(asyncKakaoLoginByAccessToken.fulfilled, (state, action) => {
      console.log(`[asyncKakaoLoginByAccessToken] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
      state.data.doRequireInitialization = false;
      state.data.profile = action.payload;
      state.loadStatus = _LoadStatus.LoadStatus.SUCCESS;
    });
    builder.addCase(asyncKakaoLoginByAccessToken.pending, (state, action) => {
      console.log(`[asyncKakaoLoginByAccessToken] pending`);
      /* https://github.com/reduxjs/redux-toolkit/issues/776 */
      state.loadStatus = _LoadStatus.LoadStatus.PENDING;
    });
    builder.addCase(asyncKakaoLoginByAccessToken.rejected, (state, action) => {
      console.log(`[asyncKakaoLoginByAccessToken] rejected`);
      state.loadStatus = _LoadStatus.LoadStatus.FAIL;
    });

    /* asyncKaKaoLogout */
    builder.addCase(asyncKakaoLogout.fulfilled, (state, action) => {
      console.log(`[asyncKakaoLogout] fulfilled\n\taction.payload=${action.payload}`);
      state.loadStatus = _LoadStatus.LoadStatus.REST;
      state.data = {
        ...defaultState,
        isAutoLoginEnabled: state.data.isAutoLoginEnabled
      };
    });
    builder.addCase(asyncKakaoLogout.pending, (state, action) => {
      console.log(`[asyncKakaoLogout] pending`);
      /* https://github.com/reduxjs/redux-toolkit/issues/776 */
      state.loadStatus = _LoadStatus.LoadStatus.PENDING;
    });
    builder.addCase(asyncKakaoLogout.rejected, (state, action) => {
      console.log(`[asyncKakaoLogout] rejected`);
      state.loadStatus = _LoadStatus.LoadStatus.FAIL;
    });

    /* asyncSetNickname */
    builder.addCase(asyncSetNickname.fulfilled, (state, action) => {
      console.log(`[asyncSetNickname] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
      state.data.profile = action.payload;
      state.loadStatus = _LoadStatus.LoadStatus.SUCCESS;
    });
    builder.addCase(asyncSetNickname.pending, (state, action) => {
      console.log(`[asyncSetNickname] pending`);
      /* https://github.com/reduxjs/redux-toolkit/issues/776 */
      state.loadStatus = _LoadStatus.LoadStatus.PENDING;
    });
    builder.addCase(asyncSetNickname.rejected, (state, action) => {
      console.log(`[asyncSetNickname] rejected`);
      state.loadStatus = _LoadStatus.LoadStatus.FAIL;
    });

    /* asyncGetProfile */
    builder.addCase(asyncGetProfile.fulfilled, (state, action) => {
      console.log(`[asyncGetProfile] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
      state.data.profile = {
        ...state.data.profile,
        ...action.payload
      };
      state.loadStatus = _LoadStatus.LoadStatus.SUCCESS;
    });
    builder.addCase(asyncGetProfile.pending, (state, action) => {
      console.log(`[asyncGetProfile] pending`);
      /* https://github.com/reduxjs/redux-toolkit/issues/776 */
      state.loadStatus = _LoadStatus.LoadStatus.PENDING;
    });
    builder.addCase(asyncGetProfile.rejected, (state, action) => {
      console.log(`[asyncGetProfile] rejected`);
      state.loadStatus = _LoadStatus.LoadStatus.FAIL;
    });
  }
});
const useIsAutoLoginEnabled = () => {
  return (0, _reactRedux.useSelector)(state => state.auth.data.isAutoLoginEnabled);
};
exports.useIsAutoLoginEnabled = useIsAutoLoginEnabled;
const useIsAuthorized = () => {
  return (0, _reactRedux.useSelector)(state => state.auth.data.isAuthorized);
};
exports.useIsAuthorized = useIsAuthorized;
const useIsInitialized = () => {
  return (0, _reactRedux.useSelector)(state => !state.auth.data.doRequireInitialization);
};
exports.useIsInitialized = useIsInitialized;
const useUserId = () => {
  return (0, _reactRedux.useSelector)(state => state.auth.data.profile.id ? state.auth.data.profile.id : "");
};
exports.useUserId = useUserId;
const useUserInfo = () => {
  return (0, _reactRedux.useSelector)(state => state.auth.data.profile);
};
exports.useUserInfo = useUserInfo;
const useUserProfile = key => {
  return (0, _reactRedux.useSelector)(state => key ? state.auth.data.profile[key] : state.auth.data.profile);
};
exports.useUserProfile = useUserProfile;
const useHasAnsweredTest = () => {
  return (0, _reactRedux.useSelector)(state => !(state.auth.data.profile.testAnswer === null));
};
exports.useHasAnsweredTest = useHasAnsweredTest;
const useChemistryIdList = () => {
  return (0, _reactRedux.useSelector)(state => state.auth.data.profile.chemistryIdList);
};
exports.useChemistryIdList = useChemistryIdList;
const useAuthorize = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  return (0, _react.useCallback)(() => {
    dispatch(authorize());
  }, [dispatch]);
};
exports.useAuthorize = useAuthorize;
const useAuthLoadStatus = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  return [(0, _reactRedux.useSelector)(state => state.auth.loadStatus), (0, _react.useCallback)(status => {
    dispatch(authSlice.actions.setLoadStatus(status));
  }, [dispatch])];
};
exports.useAuthLoadStatus = useAuthLoadStatus;
const useGetProfile = () => {
  const dispatch = (0, _reactRedux.useDispatch)(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
  const id = useUserId();
  return (0, _react.useCallback)(() => {
    console.log(`[useGetProfile] id=${id}`);
    dispatch(asyncGetProfile(id));
  }, [dispatch, id]);
};
exports.useGetProfile = useGetProfile;
const useGuestLogin = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    id
  } = (0, _reactRouterDom.useParams)();
  (0, _react.useEffect)(() => {
    console.log(`[useGuestLogin] id=${id}`);
    if (id) {
      dispatch(asyncGuestLogin(id));
    }
  }, [id, dispatch]);
};
var _default = exports.default = authSlice.reducer;
const {
  authorize,
  setLoadStatus,
  setIsInitialized,
  disableAutoLogin
} = authSlice.actions;

/* Selector Hooks */

/* Selector & Dispatch Hooks */
exports.disableAutoLogin = disableAutoLogin;
exports.setIsInitialized = setIsInitialized;
exports.setLoadStatus = setLoadStatus;
exports.authorize = authorize;