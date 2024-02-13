import { configureStore } from "@reduxjs/toolkit";
import testAnswerReducer from "../reducers/testAnswerReducer";
import chemistryReducer from "../reducers/chemistryReducer";
import profileReducer from "../reducers/profileReducer";
import profileSearchReducer from "../reducers/profileSearchReducer";
import authReducer from "../reducers/authReducer";
// import profileReducer from "../reducers/userListReducer";
// import cityGroupReducer from "../reducers/cityGroupReducer";
// import chemistryReducer from "../reducers/chemistryReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        testAnswer: testAnswerReducer,
        profile: profileReducer,
        profileSearch: profileSearchReducer,
        // cityGroup: cityGroupReducer,
        chemistry: chemistryReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;