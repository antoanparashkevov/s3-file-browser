import { createSlice } from "@reduxjs/toolkit";

export interface AwsState {
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

export const awsActions = awsSlice.actions;

export default awsSlice.reducer;