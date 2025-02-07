import { IRole } from "./roleType";

interface IUser {
	id: number;
	first_name: string;
	last_name: string;
	full_name: string;
	email: string;
	nip: string;
	avatar_url: string;
	email_verified_at: null | string;
}

interface IProfile extends IUser {
	permissions: Record<string, boolean>;
	roles: Omit<IRole, "actions">[];
}

type UseProfile = {
	middleware?: string;
	redirectIfAuthenticated?: string;
};

type ChangePersonalInformation = {
	first_name: string;
	last_name: string;
	nip: string;
};

type ChangePassword = {
	password: string;
	password_confirmation: string;
};

type ChangeAvatar = {
	avatar: File;
};

type UserNotification = {
	data: {
		message: string;
		notifabele: object;
	};
};

export type {
	IUser,
	IProfile,
	UseProfile,
	ChangePersonalInformation,
	ChangePassword,
	ChangeAvatar,
	UserNotification,
};
