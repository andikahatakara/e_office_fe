import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./features/themeSlice";
import loadingSlice from "./features/loadingSlice";
import logoutSlice from "./features/logoutSlice";
import permissionSlice from "./features/permissionSlice";
import userSlice from "./features/userSlice";
import deleteSlice from "./features/deleteSlice";
import roleSlice from "./features/roleSlice";
import pdfSlice from "./features/pdfSlice";
import outgoingLetterSlice from "./features/outgoingLetterSlice";
import incomingLetterSlice from "./features/incomingLetterSlice";

export const store = configureStore({
	reducer: {
		theme: themeSlice,
		loading: loadingSlice,
		logout: logoutSlice,
		permission: permissionSlice,
		user: userSlice,
		delete: deleteSlice,
		role: roleSlice,
		pdf: pdfSlice,
		outgoing: outgoingLetterSlice,
		incoming: incomingLetterSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
