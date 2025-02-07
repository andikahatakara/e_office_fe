import { Route } from "@/router";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import id from "dayjs/locale/id";

/**
 * get key error from server validation
 */
const getErrorKey = (errors: Record<any, any>) => {
	return Object.keys(errors);
};

/**
 * get error message from server validation
 */
const formValidationError = (key: string, errors: Record<any, string>) => {
	return errors[key];
};

/**
 * handle error validation from server
 * @param { Record<string, string> } errors
 * @param
 */
const errorHandler = (
	errors: Record<string, string>,
	setError: UseFormSetError<any>
) => {
	const keys = getErrorKey(errors);
	keys.map((key) =>
		setError(key as keyof Record<string, string>, {
			message: formValidationError(key, errors),
		})
	);
};

/**
 * Toast handler
 * @param status = 'success' | 'danger'
 */
const toastHandler = (message: string, status = "success") => {
	if (status === "success") {
		return toast.success(message);
	}
	return toast.error(message);
};

/**
 * check active link
 * @param pathname
 * @param href
 * @returns
 */
const activeLink = (pathname: string, href: string): boolean => {
	const url = pathname.split("/");
	const active = pathname === href || href.replace("/", "") === url[1];
	return active;
};

/**
 * check menu active as drop down menu
 * @param pathname
 * @param menus
 * @returns
 */
const dropDownActive = (pathname: string, menus: Route[]): boolean => {
	const url = pathname.split("/");

	const menu = menus.find(
		(menu) => menu.href === pathname || menu.href?.replace("/", "") === url[1]
	);

	return menu ? true : false;
};

/**
 * set format date to indonesian timezone
 * @param date string
 * @param format string with default dddd, DD MMM YYYY  h:mm
 * @returns
 */
const dateFormater = (
	date: string,
	format = "dddd, DD MMM YYYY  h:mm"
): string => {
	return dayjs(date).locale(id).format(format).toString();
};

/**
 * Make request data as FormData
 * @param data Record<String | Blob | undefined>
 * @returns { FormData }
 */
const makeFormData = (
	data: Record<string, string | Blob | undefined>
): FormData => {
	const formData = new FormData();
	const keys = Object.keys(data);

	keys.map((key) => {
		if (data[key] !== undefined) {
			formData.append(key, data[key] as string | Blob);
		}
	});

	return formData;
};

export {
	getErrorKey,
	formValidationError,
	errorHandler,
	toastHandler,
	activeLink,
	dropDownActive,
	dateFormater,
	makeFormData,
};
