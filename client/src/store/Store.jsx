import { configureStore } from "@reduxjs/toolkit";
import formReducers from "./FormSlice";
import modalReducers from "./ModalSlice";

const store = configureStore({
  reducer: {
    modal: modalReducers,
    form : formReducers,
  },
});

export default store;