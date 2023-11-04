import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface Store {
    auth: AuthState,
    aws: AwsState
}

interface AuthState {
    hasLoggedIn: boolean
}

const initialAuthState: AuthState = {
    hasLoggedIn: false
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state: AuthState) {
            state.hasLoggedIn = true;//create a new state object which is different from the old one (behind the scenes)
        },
        logout(state: AuthState) {
            state.hasLoggedIn = false;
        }
    }
});

interface AwsState {
    absolutePath: string,
    prevAbsolutePath: string,
    currentDirectory: string,
    openDeleteDropdown: boolean
}

const initialAwsState: AwsState = {
    absolutePath: '',
    prevAbsolutePath: '',
    currentDirectory: 'root',
    openDeleteDropdown: false
}

const awsSlice = createSlice({
    name: 'aws',
    initialState: initialAwsState,
    reducers: {
        changeAbsolutePath(state: AwsState, action: { payload: string }) {
            state.prevAbsolutePath = state.absolutePath;
            state.absolutePath = action.payload;
        },
        changeCurrentDirectory(state: AwsState, action: {payload: string}) {
            state.currentDirectory = action.payload;
        },
        toggleDropdown(state: AwsState, action: {payload: boolean}) {
            state.openDeleteDropdown = action.payload;
        }
    }
});

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        aws: awsSlice.reducer
    }
})

export const authActions = authSlice.actions;
export const awsActions = awsSlice.actions;

export default store;