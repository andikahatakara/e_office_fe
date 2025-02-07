import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type DeleteSlice = {
	isOpenDeleteModal: boolean;
	action: number | string;
};

const initialState: DeleteSlice = {
	isOpenDeleteModal: false,
	action: "",
};

const deleteSlice = createSlice({
	name: "delete",
	initialState,
	reducers: {
		setOpenDeleteModal: (
			state,
			action: PayloadAction<{ action: number | string }>
		) => {
			state.isOpenDeleteModal = true;
			state.action = action.payload.action;
		},
		setCloseDeleteModal: (state) => {
			const { isOpenDeleteModal, action } = initialState;
			state.isOpenDeleteModal = isOpenDeleteModal;
			state.action = action;
		},
	},
});

export const { setOpenDeleteModal, setCloseDeleteModal } = deleteSlice.actions;
export default deleteSlice.reducer;
