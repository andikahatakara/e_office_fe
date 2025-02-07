import { useForm } from "react-hook-form";
import {
	setClosePermissionModal,
	setOpenPermissionModal,
} from "@/redux/features/permissionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	getPermissions,
	storePermission,
	updatePermission,
} from "@/services/permissionService";
import { ErrorResponse } from "@/types/globalType";
import { Permission, RoleAndPermissionRequest } from "@/types/roleType";
import { useCallback, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { yupResolver } from "@hookform/resolvers/yup";
import { roleAndPermissionSchema } from "@/validations/roleValidation";
import { setCloseLoading, setOpenLoading } from "@/redux/features/loadingSlice";
import { errorHandler, toastHandler } from "@/utils/globalUtil";

export default function usePermissionController() {
	const dispatch = useAppDispatch();
	const { isOpenPermissionModal, permission } = useAppSelector(
		(state) => state.permission
	);

	/**
	 * Set default value form
	 */
	const defaultValues: RoleAndPermissionRequest = {
		title: permission ? permission.title : "",
		name: permission ? permission.name : "",
	};

	/**
	 * Fetch data permission with SWR
	 * @returns permissions
	 */
	const useIndex = () => {
		const fetcher: Fetcher<Permission[], string> = async (url) => {
			const { data, statusCode, message } = await getPermissions(url);

			if (statusCode === 200) {
				return data;
			}
			throw {
				statusCode,
				message,
			};
		};

		const result = useSWR<Permission[], ErrorResponse>("permissions", fetcher);
		return result;
	};

	/**
	 * This is function will be used to open permission form dialog and set permission if parameter permission not undefined
	 * @param permission object of permission
	 */
	const handleOpenPermissionModal = (permission?: Permission) =>
		dispatch(setOpenPermissionModal({ permission }));

	/**
	 * This is function will be used to close permission from dialog and reset state to default
	 */
	const handleClosePermissionModal = () => dispatch(setClosePermissionModal());

	/**
	 * This is function will be used for handle form submit on store or on update the permission
	 * @returns permission | boolean
	 */
	const useSubmitForm = () => {
		const {
			register,
			handleSubmit,
			setError,
			formState: { errors },
			reset,
		} = useForm<RoleAndPermissionRequest>({
			defaultValues,
			resolver: yupResolver(roleAndPermissionSchema),
		});

		const onReset = useCallback(() => {
			reset({ ...defaultValues });
		}, [reset]);

		const onSubmit = useCallback(
			async (request: RoleAndPermissionRequest) => {
				dispatch(setOpenLoading());
				const { statusCode, message } = permission
					? await updatePermission(permission.id, request)
					: await storePermission(request);
				dispatch(setCloseLoading());

				if (statusCode > 300) {
					if (
						typeof message === "object" &&
						(message as object).hasOwnProperty("errors")
					) {
						return errorHandler(message["errors"], setError);
					} else {
						return toastHandler(message, "danger");
					}
				} else {
					toastHandler(message);
					return dispatch(setClosePermissionModal());
				}
			},
			[setError]
		);

		const handleOnSubmit = handleSubmit(onSubmit);

		return {
			register,
			errors,
			handleOnSubmit,
			onReset,
		};
	};

	return {
		useIndex,
		isOpenPermissionModal,
		permission,
		handleClosePermissionModal,
		handleOpenPermissionModal,
		useSubmitForm,
	};
}
