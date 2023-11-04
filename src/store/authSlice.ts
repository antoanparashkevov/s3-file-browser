import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    isAuthenticated: boolean
}

const initialAuthState: AuthState = {
    isAuthenticated: true
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state: AuthState) {
            state.isAuthenticated = true;//create a new state object which is different from the old one (behind the scenes)
        },
        logout(state: AuthState) {
            state.isAuthenticated = false;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;