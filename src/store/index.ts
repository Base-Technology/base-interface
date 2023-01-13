import thunk, { ThunkAction } from "redux-thunk";
import { Action, applyMiddleware, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { cveReducer } from "./reducers/cve";

const store = configureStore({
    reducer: {
        user: userReducer,
        cves: cveReducer
    }
})


export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export type AppDispatch = typeof store.dispatch