import { configureStore } from "@reduxjs/toolkit";
import modalReducers from "./ModalSlice";

const store = configureStore({
  reducer: {
    modal: modalReducers,
  },
});

export default store;
