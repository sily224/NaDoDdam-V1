import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modal: false,
	loginModal: false,
	registerModal: false,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState, // 초기 값
	reducers: {
		showLogin: (state) => {
			state.loginModal = true;
			state.registerModal = false;
			state.modal = true;
		},
		showRegister: (state) => {
			state.loginModal = false;
			state.registerModal = true;
			state.modal = true;
		},
		showModal: (state) => {
			state.modal = true;
			state.loginModal = false;
			state.registerModal = false;
		},
		closeModal: (state) => {
			state.modal = false;
			state.loginModal = false;
			state.registerModal = false;
		},
	},
});

export default modalSlice.reducer;
export const { showLogin, showRegister, showModal, closeModal, closeAllModal } =
	modalSlice.actions;
