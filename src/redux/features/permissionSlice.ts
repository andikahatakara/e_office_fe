import { Permission } from "@/types/roleType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PermissionSlice = {
	isOpenPermissionModal: boolean;
	permission?: Permission;
};

const initialState: PermissionSlice = {
	isOpenPermissionModal: false,
	permission: undefined,
};

const permisssionSlice = createSlice({
	name: "permission",
	initialState,
	reducers: {
		setOpenPermissionModal: (
			state,
			action: PayloadAction<Pick<PermissionSlice, "permission">>
		) => {
			const { permission } = action.payload;

			if (permission) {
				state.permission = permission;
			}

			state.isOpenPermissionModal = true;
		},
		setClosePermissionModal: (state) => {
			const { permission, isOpenPermissionModal } = initialState;
			state.permission = permission;
			state.isOpenPermissionModal = isOpenPermissionModal;
		},
	},
});

export const { setOpenPermissionModal, setClosePermissionModal } =
	permisssionSlice.actions;
export default permisssionSlice.reducer;
