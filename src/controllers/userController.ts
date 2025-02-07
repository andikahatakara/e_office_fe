import { setCloseLoading, setOpenLoading } from "@/redux/features/loadingSlice";
import { setCloseLogoutModal } from "@/redux/features/logoutSlice";
import { useAppDispatch } from "@/redux/hooks";
import { api } from "@/services";
import {
	createToken,
	loginService,
	logoutService,
} from "@/services/authService";
import {
	changeAvatar,
	changePassword,
	changePersonalInformation,
	getNotification,
} from "@/services/userService";
import { LoginRequest } from "@/types/authTypes";
import {
	ChangeAvatar,
	ChangePassword,
	ChangePersonalInformation,
	UserNotification,
} from "@/types/userType";
import {
	errorHandler,
	formValidationError,
	toastHandler,
} from "@/utils/globalUtil";
import { loginSchema } from "@/validations/authValidation";
import {
	changePasswordSchema,
	changePersonalSchema,
} from "@/validations/userValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import useSWR, { Fetcher } from "swr";
import { ErrorResponse } from "@/types/globalType";

export default function useUserController() {
	const dispatch = useAppDispatch();

	/**
	 * Handle login
	 * @param { void } callback () => void
	 */
	const useLogin = (callback: () => void) => {
		const {
			handleSubmit,
			setError,
			register,
			formState: { errors, isSubmitting },
			setValue,
		} = useForm<LoginRequest>({
			resolver: yupResolver(loginSchema),
			defaultValues: {
				email: "",
				password: "",
				remember: false,
			},
		});

		const handleLogin = useCallback(
			async (request: LoginRequest) => {
				dispatch(setOpenLoading());
				const { message, data, statusCode } = await createToken(request);
				dispatch(setCloseLoading());

				if (statusCode === 200) {
					const accessTokenBase64 = Buffer.from(data.token).toString("base64");
					Cookies.set("accessToken", accessTokenBase64, {
						expires: 14,
					});
					toastHandler(message);
					return callback();
				} else {
					if (typeof message === "object" && message["errors"]) {
						const validationErrors = message["errors"];
						return errorHandler(validationErrors, setError);
					} else {
						return toastHandler(message, "danger");
					}
				}
			},
			[setError, callback]
		);

		const onLogin = handleSubmit(handleLogin);

		return {
			onLogin,
			errors,
			register,
			setValue,
			isSubmitting,
		};
	};

	/**
	 * Handle login
	 * @param { void } callback () => void
	 */
	const onLogout = useCallback(
		async (callback: () => void) => {
			dispatch(setCloseLogoutModal());
			dispatch(setOpenLoading());
			const { statusCode, message } = await logoutService();
			dispatch(setCloseLoading());
			if (statusCode > 300) {
				toastHandler(message, "danger");
			} else {
				Cookies.remove("accessToken");
				callback();
			}
		},
		[dispatch]
	);

	/**
	 * Handle change personal information
	 * @param callback
	 * @param defaultValues
	 */
	const useChangePersonalInformation = (
		callback: () => void,
		defaultValues?: Record<string, string>
	) => {
		const {
			register,
			handleSubmit,
			formState: { errors },
			setError,
			reset,
		} = useForm<ChangePersonalInformation>({
			resolver: yupResolver(changePersonalSchema),
			defaultValues,
		});
		const onReset = useCallback(
			() => reset({ ...defaultValues }),
			[reset, defaultValues]
		);
		const submit = useCallback(
			async (data: ChangePersonalInformation) => {
				dispatch(setOpenLoading());
				const { statusCode, message } = await changePersonalInformation(data);
				dispatch(setCloseLoading());

				if (statusCode === 200) {
					toastHandler(message);
					return callback();
				} else {
					if (typeof message === "object" && message["errors"]) {
						const validationErrors = message["errors"];
						return errorHandler(validationErrors, setError);
					} else {
						return toastHandler(message, "danger");
					}
				}
			},
			[callback, setError]
		);

		const onSubmit = handleSubmit(submit);

		return {
			register,
			errors,
			onSubmit,
			onReset,
		};
	};

	/**
	 *
	 * @param callback
	 */
	const useChangePassword = (callback: () => void) => {
		const {
			handleSubmit,
			setError,
			formState: { errors: passwordErrors },
			register: passwordRegister,
			reset,
		} = useForm<ChangePassword>({
			resolver: yupResolver(changePasswordSchema),
		});

		const onReset = (e?: FormEvent<HTMLFormElement>) => {
			e?.preventDefault();
			reset({ password: "", password_confirmation: "" });
		};

		const submitHandler = useCallback(
			async (data: ChangePassword) => {
				dispatch(setOpenLoading());
				const { statusCode, message } = await changePassword(data);
				dispatch(setCloseLoading());

				if (statusCode === 200) {
					toastHandler(message);
					Cookies.remove("accessToken");
					return callback();
				} else {
					if (typeof message === "object" && message["errors"]) {
						const validationErrors = message["errors"];
						return errorHandler(validationErrors, setError);
					} else {
						return toastHandler(message, "danger");
					}
				}
			},
			[setError, callback]
		);

		const onSubmit = handleSubmit(submitHandler);

		return {
			onSubmit,
			passwordErrors,
			passwordRegister,
			onReset,
		};
	};

	/**
	 * Handle change avatar
	 * @param callback
	 * @param src
	 * @returns callback
	 */
	const useChangeAvatar = (callback: () => void, src: string) => {
		const [image, setImage] = useState<File | undefined>(undefined);
		const [imageSource, setImageSource] = useState<string>(src);
		const [errors, setErrors] = useState<any | undefined>(undefined);

		const imageRef = useRef<HTMLInputElement>(null);

		const handleChooseImage = (e: ChangeEvent<HTMLInputElement>) => {
			const { files } = e.target;

			if (files) {
				const file = files[0];
				setImage(file);
				setImageSource(URL.createObjectURL(file));
			}
		};

		const handleRemoveImage = useCallback(() => {
			setImage(undefined);
			setImageSource(src);
			imageRef!.current!.value = "";
			if (errors) {
				setErrors(undefined);
			}
		}, [src, errors]);

		const handleChangeAvatar = useCallback(async () => {
			const request = new FormData();
			if (image) {
				request.append("avatar", image);
			}
			request.append("_method", "put");
			dispatch(setOpenLoading());
			const { statusCode, message } = await changeAvatar(request);
			dispatch(setCloseLoading());
			if (statusCode === 200) {
				callback();
				handleRemoveImage();
				setImageSource(URL.createObjectURL(request.get("avatar") as File));
				return toastHandler(message);
			} else {
				handleRemoveImage();
				if (typeof message === "object" && message["errors"]) {
					const validationErrors = message["errors"];
					return setErrors(formValidationError("avatar", validationErrors));
				} else {
					return toastHandler(message, "danger");
				}
			}
		}, [image, handleRemoveImage, callback]);

		return {
			image,
			imageSource,
			imageRef,
			errors,
			handleChooseImage,
			handleRemoveImage,
			handleChangeAvatar,
		};
	};

	const useNotification = () => {
		const fetch: Fetcher<UserNotification[], string> = async (url) => {
			const { statusCode, data, message } = await getNotification(url);

			if (statusCode === 200) {
				return data;
			}

			throw {
				statusCode,
				message,
			};
		};

		return useSWR<UserNotification[], ErrorResponse>(
			"dashboard/notifications",
			fetch
		);
	};

	return {
		useLogin,
		onLogout,
		useChangePersonalInformation,
		useChangePassword,
		useChangeAvatar,
		useNotification,
	};
}
