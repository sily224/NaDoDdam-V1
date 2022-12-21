import { configureStore } from "@reduxjs/toolkit";
import formReducers from "./FormSlice";
import modalReducers from "./ModalSlice";
import optionReducers from "./OptionSlice";

const store = configureStore({
  reducer: {
    modal: modalReducers,
    form : formReducers,
    option : optionReducers,
  },
});

export default store;