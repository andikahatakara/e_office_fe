import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PdfSlice = {
	isOpenPdfModal: boolean;
	pdf: string;
};

const initialState: PdfSlice = {
	isOpenPdfModal: false,
	pdf: "",
};

const pdfSlice = createSlice({
	name: "pdf",
	initialState,
	reducers: {
		setOpenPdfModal: (state, action: PayloadAction<{ pdf: string }>) => {
			const { pdf } = action.payload;
			state.pdf = pdf;
			state.isOpenPdfModal = true;
		},
		setClosePdfModal: (state) => {
			const { pdf, isOpenPdfModal } = initialState;
			state.pdf = pdf;
			state.isOpenPdfModal = isOpenPdfModal;
		},
	},
});

export const { setOpenPdfModal, setClosePdfModal } = pdfSlice.actions;
export default pdfSlice.reducer;
