import { createSlice } from "@reduxjs/toolkit";

export interface AwsState {
    absolutePath: string,
    currentDirectory: string,
    clickedCurrentDirectoryDropdownItem: string,
    fetchCounter: 0
}

const initialAwsState: AwsState = {
    absolutePath: '',
    currentDirectory: 'root',
    clickedCurrentDirectoryDropdownItem: '',
    fetchCounter: 0
}

const awsSlice = createSlice({
    name: 'aws',
    initialState: initialAwsState,
    reducers: {
        changeAbsolutePath(state: AwsState, action: { payload: string }) {
            state.absolutePath = action.payload;
        },
        changeCurrentDirectory(state: AwsState, action: {payload: string}) {
            state.currentDirectory = action.payload;
        },
        toggleDropdown(state: AwsState, action: {payload: string}) {
            state.clickedCurrentDirectoryDropdownItem = action.payload;
        },
        fetchData(state: AwsState) {
            state.fetchCounter++
        }
    }
});

export const awsActions = awsSlice.actions;

export default awsSlice.reducer;