import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    date: "",
    totalPrice : 0,
    headCount : 0,
    startTime:"",
    endTime:"",
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
        getStartTime(state,action){
            state.startTime = action.payload;
        },
        getEndTime(state,action){
            state.endTime = action.payload;
        },
        initDate(state, action){
            state.date = "";
        }
    }
});

export default formSlice.reducer;
export const {getDate,getTotalPrice,getHeadCount,getStartTime,getEndTime,initDate} = formSlice.actions;