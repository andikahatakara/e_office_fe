import {
	ChangePassword,
	ChangePersonalInformation,
	IProfile,
	UserNotification,
} from "@/types/userType";
import http from ".";

const getProfile = async (url = "users/profile") =>
	await http<IProfile>({
		url,
	});

const changePersonalInformation = async (data: ChangePersonalInformation) =>
	await http<IProfile>({
		url: `users/profile`,
		method: "PUT",
		data,
	});

const changePassword = async (data: ChangePassword) =>
	await http<boolean>({
		url: `users/password`,
		method: "PUT",
		data,
	});

const changeAvatar = async (data: object) =>
	await http<boolean>({
		url: `users/avatar`,
		method: "POST",
		data,
		asFormData: true,
	});

const getNotification = async (url = "dashboard/notifications") =>
	await http<UserNotification[]>({ url });

export {
	getProfile,
	changePersonalInformation,
	changePassword,
	changeAvatar,
	getNotification,
};
