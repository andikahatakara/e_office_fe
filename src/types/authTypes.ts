import { IUser } from "./userType";

type LoginRequest = {
	email: string;
	password: string;
	remember: boolean;
};

type TokenResponse = {
	token: string;
	user: IUser;
};

export type { LoginRequest, TokenResponse };
