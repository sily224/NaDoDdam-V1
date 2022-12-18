import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
  loginModal: false,
  registerModal: false,
};

export const modalSlice = createSlice({
  name: "modal", //이 slice의 이름 만들기
  initialState, // 초기 값
  reducers: {
    showLogin: (state) => {
      state.loginModal = true;
      state.modal = true;
    },
    showRegister: (state) => {
      state.registerModal = true;
      state.modal = true;
    },
    showModal: (state) => {
      state.modal = true;
    },
  },
});

export default modalSlice.reducer;
export const { showLogin, showRegister, showModal } = modalSlice.actions;
