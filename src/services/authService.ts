import { LoginRequest, TokenResponse } from "@/types/authTypes";
import http from ".";

const loginService = async (request: LoginRequest) =>
	await http<boolean>({
		url: "login",
		method: "POST",
		onlyBaseUrl: true,
		data: request,
	});

const logoutService = async () =>
	await http<boolean>({
		method: "DELETE",
		url: "auth/logout",
	});

const createToken = async (data: LoginRequest) =>
	await http<TokenResponse>({
		url: "auth/login",
		data,
		method: "POST",
	});

export { loginService, logoutService, createToken };
