import { createSlice } from "@reduxjs/toolkit";

type LogoutSlice = {
	isOpenLogoutModal: boolean;
};

const initialState: LogoutSlice = {
	isOpenLogoutModal: false,
};

const logoutSlice = createSlice({
	name: "logout",
	initialState,
	reducers: {
		setOpenLogoutModal: (state) => {
			state.isOpenLogoutModal = true;
		},
		setCloseLogoutModal: (state) => {
			const { isOpenLogoutModal } = initialState;
			state.isOpenLogoutModal = isOpenLogoutModal;
		},
	},
});

export const { setOpenLogoutModal, setCloseLogoutModal } = logoutSlice.actions;
export default logoutSlice.reducer;
