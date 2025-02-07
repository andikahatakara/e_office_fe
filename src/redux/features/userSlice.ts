import { IUser } from "@/types/userType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserSlice = {
	user: IUser | null;
	permissions?: Record<string, boolean>;
};

const initialState: UserSlice = {
	user: null,
	permissions: undefined,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (
			state,
			action: PayloadAction<{
				user: IUser;
				permissions: Record<string, boolean>;
			}>
		) => {
			state.user = action.payload.user;
			state.permissions = action.payload.permissions;
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
