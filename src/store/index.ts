import { configureStore } from "@reduxjs/toolkit";
import testAnswerReducer from "../reducers/testAnswerReducer";
import profileSearchReducer from "../reducers/profileSearchReducer";
import authReducer from "../reducers/authReducer";
import chemistryReducer from "../reducers/chemistryReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        testAnswer: testAnswerReducer,
        profileSearch: profileSearchReducer,
        chemistry: chemistryReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false,
    // }),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;