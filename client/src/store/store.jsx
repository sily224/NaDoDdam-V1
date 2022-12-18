import { configureStore } from "@reduxjs/toolkit";
import modalReducers from "./modalSlice";

const store = configureStore({
  reducer: {
    modal: modalReducers,
  },
});

export default store;
