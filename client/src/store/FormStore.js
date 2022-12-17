import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
    date: "",
};

const FormDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        getDate(state,action) {
            state.date = action.payload;
        },
        down(state,action) {
            state.value = state.value - 1;
        },
    }
});

const FormStore = configureStore({ reducer: FormDataSlice.reducer });
export default FormStore;
export const {getDate,down} = FormDataSlice.actions;