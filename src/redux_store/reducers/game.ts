import { createSlice } from '@reduxjs/toolkit';

interface IInitialValues { }

const initialState: IInitialValues = {};

const gameReducer = createSlice({
    name: 'gameReducer',
    initialState,
    reducers: {},
});

export const { } = gameReducer.actions;
export default gameReducer.reducer;