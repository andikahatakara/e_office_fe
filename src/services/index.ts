import axios, { AxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";

const BASEAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const APIVERSION = process.env.NEXT_PUBLIC_BACKEND_VERSION;

interface HttpRequest extends AxiosRequestConfig {
	onlyBaseUrl?: boolean;
	asFormData?: boolean;
	isAuth?: boolean;
	serverToken?: string;
}

type ApiResponse = {
	meta: {
		statusCode: number;
		statusText: string;
		message: any;
	};
	data: any;
};

export const api = axios.create({
	baseURL: BASEAPIURL,
	headers: {
		// "X-Requested-With": "XMLHttpRequest",
		Accept: "application/json",
	},
	withCredentials: true,
});

export default async function http<T>({
	url,
	method = "GET",
	data,
	onlyBaseUrl = false,
	asFormData = false,
	isAuth = true,
	serverToken,
	...props
}: HttpRequest) {
	/**
	 * Setup
	 */
	const FULLURL = onlyBaseUrl
		? `${BASEAPIURL}/${url}`
		: `${BASEAPIURL}/api/${APIVERSION}/${url}`;

	if (isAuth) {
		const token = Cookies.get("accessToken");
		if (token && !serverToken) {
			const jwtToken = Buffer.from(token, "base64").toString();
			api.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
		} else {
			api.defaults.headers.common["Authorization"] = `Bearer ${serverToken}`;
		}
	}

	api.defaults.headers.common["Content-Type"] = asFormData
		? "multipart/form-data"
		: "application/json";

	try {
		const response = await api({
			url: FULLURL,
			method,
			data,
			...props,
		});

		const result: ApiResponse = response.data;

		return {
			data: result.data as T,
			message: result.meta.message,
			statusCode: result.meta.statusCode,
		};
	} catch (e) {
		const error: AxiosError = e as AxiosError;

		const errorResponse: ApiResponse = error.response?.data as ApiResponse;

		return {
			data: null as T,
			statusCode: error.response?.status ?? 400,
			message: errorResponse?.meta?.message ?? null,
		};
	}
}
