import { configureStore } from "@reduxjs/toolkit";

//interfaces
import authReducer, { AuthState } from "./authSlice";
import awsReducer, { AwsState } from "./awsSlice";

export interface State {
    auth: AuthState,
    aws: AwsState
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        aws: awsReducer
    }
})

export default store;