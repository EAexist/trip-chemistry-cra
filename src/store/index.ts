import { configureStore } from "@reduxjs/toolkit";
import testAnswerReducer from "../reducers/testAnswerReducer";
// import userDataReducer from "../reducers/userListReducer";
// import cityGroupReducer from "../reducers/cityGroupReducer";
// import chemistryReducer from "../reducers/chemistryReducer";

export const store = configureStore({
    reducer: {
        testAnswer: testAnswerReducer,
        // userData: userDataReducer,
        // cityGroup: cityGroupReducer,
        // chemistry: chemistryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;