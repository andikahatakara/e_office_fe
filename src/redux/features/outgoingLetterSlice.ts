import { OutgoingLetter } from "@/types/letterType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type OutgoingLetterSlice = {
	isOpenOutgoingLetterModal: boolean;
	outgoing?: OutgoingLetter;
};

const initialState: OutgoingLetterSlice = {
	isOpenOutgoingLetterModal: false,
	outgoing: undefined,
};

const outgoingLetterSlice = createSlice({
	name: "outgoing-letter",
	initialState,
	reducers: {
		setOpenOutgoingLetterModal: (
			state,
			action: PayloadAction<{ outgoing: OutgoingLetter }>
		) => {
			const { outgoing } = action.payload;
			state.isOpenOutgoingLetterModal = true;
			state.outgoing = outgoing;
		},
		setCloseOutgoingLetterModal: (state) => {
			const { isOpenOutgoingLetterModal, outgoing } = initialState;
			(state.isOpenOutgoingLetterModal = isOpenOutgoingLetterModal),
				(state.outgoing = outgoing);
		},
	},
});

export const { setOpenOutgoingLetterModal, setCloseOutgoingLetterModal } =
	outgoingLetterSlice.actions;
export default outgoingLetterSlice.reducer;
