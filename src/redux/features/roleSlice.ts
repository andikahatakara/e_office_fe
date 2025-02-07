import { IRole } from "@/types/roleType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type RoleSlice = {
	isOpenRoleModal: boolean;
	role?: IRole;
};

const initialState: RoleSlice = {
	isOpenRoleModal: false,
	role: undefined,
};

const roleSlice = createSlice({
	name: "role",
	initialState,
	reducers: {
		setOpenRoleModal: (
			state,
			action: PayloadAction<Pick<RoleSlice, "role">>
		) => {
			const { role } = action.payload;
			if (role) {
				state.role = role;
			}
			state.isOpenRoleModal = true;
		},
		setCloseRoleModal: (state) => {
			const { role, isOpenRoleModal } = initialState;
			state.role = role;
			state.isOpenRoleModal = isOpenRoleModal;
		},
	},
});

export const { setOpenRoleModal, setCloseRoleModal } = roleSlice.actions;
export default roleSlice.reducer;
