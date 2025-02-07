import { IncomingLetter } from "@/types/letterType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type IncomingLetterSlice = {
	isOpenIncomingLetterModal: boolean;
	incoming?: IncomingLetter;
};

const initialState: IncomingLetterSlice = {
	isOpenIncomingLetterModal: false,
	incoming: undefined,
};

const incomingLetterSlice = createSlice({
	name: "incomingLetter",
	initialState,
	reducers: {
		setOpenIncomingLetterModal: (
			state,
			action: PayloadAction<{ incoming: IncomingLetter }>
		) => {
			const { incoming } = action.payload;
			state.incoming = incoming;
			state.isOpenIncomingLetterModal = true;
		},
		setCloseIncomingLetterModal: (state) => {
			const { incoming, isOpenIncomingLetterModal } = initialState;
			state.isOpenIncomingLetterModal = isOpenIncomingLetterModal;
			state.incoming = incoming;
		},
	},
});

export const { setCloseIncomingLetterModal, setOpenIncomingLetterModal } =
	incomingLetterSlice.actions;
export default incomingLetterSlice.reducer;
