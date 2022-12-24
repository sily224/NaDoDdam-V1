import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    date: "",
    totalPrice : 0,
    headCount : 0,
    time:"",
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        getDate(state,action) {
            state.date = action.payload;
        },
        getTotalPrice(state,action) {
            state.totalPrice = action.payload;
        },
        getHeadCount(state,action) {
            state.headCount = action.payload;
        },
        getTime(state,action){
            state.time = action.payload;
        },
        initDate(state, action){
            state.date = "";
        }
    }
});

export default formSlice.reducer;
export const {getDate,getTotalPrice,getHeadCount,getTime,initDate} = formSlice.actions;