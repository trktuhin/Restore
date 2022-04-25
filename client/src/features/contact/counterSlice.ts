import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'Another redux counter with redux toolkit'
}

export const counterSlice = createSlice({
    initialState,
    name: 'counter',
    reducers: {
        increment: (state, action) => {
            state.data += action.payload;
        },
        decrement: (state, action) => {
            state.data -= action.payload;
        }
    }
});

export const { increment, decrement } = counterSlice.actions;
