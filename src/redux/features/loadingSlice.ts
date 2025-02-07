import { createSlice } from "@reduxjs/toolkit";

type LoadingSlice = {
	isOpenLoading: boolean;
};

const initialState: LoadingSlice = {
	isOpenLoading: false,
};

const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		setOpenLoading: (state) => {
			state.isOpenLoading = true;
		},
		setCloseLoading: (state) => {
			const { isOpenLoading } = initialState;
			state.isOpenLoading = isOpenLoading;
		},
	},
});

export const { setOpenLoading, setCloseLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
