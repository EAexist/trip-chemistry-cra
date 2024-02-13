/*** React ***/
import { useCallback } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

/*** Trip Chemistry ***/
/* Component */
import { RootState } from "../store";
import { IWithLoadStatus, LoadStatus, IProfileId } from ".";
import { HEADERS_AXIOS } from "../common/app-const";
import { IProfile } from "./profileReducer";

/* Async Thunks */
const asyncLogin = createAsyncThunk("authSlice/asyncLogin",
    async (code: string, thunkAPI) => {
        console.log(`[asyncLogin] GET /auth/kakao`);
        try {
            const response = await axios.get(`/auth/kakao`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: {
                        code: code
                    },
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncLogin] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);
type IAuthState = IWithLoadStatus<{
    isAuthorized: boolean,
    id?: IProfileId
}>;

const initialState: IAuthState = ({
    data: {
        isAuthorized: false,
        id: undefined,
    },
    loadStatus: LoadStatus.REST
});

/* Slice */
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setLoadStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.loadStatus = action.payload;
        },
        authorize: (state) => {
            state.data.isAuthorized = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asyncLogin.fulfilled, (state, action: PayloadAction<IProfile>) => {
            console.log(`[asyncLogin] fulfilled\n\taction.payload=${action.payload.id} type=${typeof(action.payload.id)}`);
            state.data.id = action.payload.id;
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncLogin.pending, (state, action) => {
            console.log(`[asyncLogin] pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncLogin.rejected, (state, action) => {
            console.log(`[asyncLogin] rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });
    },
})

const useIsAuthorized = () => {
    return (
        useSelector((state: RootState) => state.auth.data.isAuthorized)
    );
}

const useUserId : () => IProfileId = () => {
    return (
        useSelector((state: RootState) => state.auth.data.id ? state.auth.data.id : "not found")
    );
}

const useAuthLoadStatus = () => {
    const dispatch = useDispatch();

    return ([
        useSelector((state: RootState) => state.auth.loadStatus),
        useCallback((status: LoadStatus) =>
            dispatch(authSlice.actions.setLoadStatus(status))
            , [dispatch]),
    ] as const);
}

export default authSlice.reducer;
export const { authorize, setLoadStatus } = authSlice.actions;
export { asyncLogin };
export { useIsAuthorized, useUserId, useAuthLoadStatus };