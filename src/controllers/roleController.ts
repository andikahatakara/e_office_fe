import { useForm } from "react-hook-form";
import { setCloseLoading, setOpenLoading } from "@/redux/features/loadingSlice";
import {
	setCloseRoleModal,
	setOpenRoleModal,
} from "@/redux/features/roleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	getRole,
	getRoles,
	storeRole,
	syncRoleAndPermissionService,
	syncRoleAndUserService,
	updateRole,
} from "@/services/rolesService";
import { ErrorResponse } from "@/types/globalType";
import {
	IRole,
	RoleAndPermissionRequest,
	RoleHasPermission,
} from "@/types/roleType";
import { errorHandler, toastHandler } from "@/utils/globalUtil";
import { useCallback, useEffect } from "react";
import useSWR, { Fetcher } from "swr";
import { yupResolver } from "@hookform/resolvers/yup";
import { roleAndPermissionSchema } from "@/validations/roleValidation";
import useRedirect from "./redirectController";

export default function useRoleController() {
	const dispatch = useAppDispatch();
	const { isOpenRoleModal, role } = useAppSelector((state) => state.role);
	const { redirectStatusCode } = useRedirect();

	/**
	 * Initial values for form create or update role
	 */
	const defaultValues: RoleAndPermissionRequest = {
		name: role ? role.name : "",
		title: role ? role.title : "",
	};

	/**
	 * Handle open form dialog for update or create role
	 * @param role IRole | undefined
	 * @returns dispatch(setOpenRoleModal({ role })
	 */
	const handleOpenForm = (role?: IRole) => dispatch(setOpenRoleModal({ role }));

	/**
	 * Handle close form dialog for update or create role and reset state to default
	 * @returns dispatch(setOpenRoleModal())
	 */
	const handleCloseForm = () => dispatch(setCloseRoleModal());

	/**
	 * Fetch data roles with swr
	 * @returns
	 */
	const useIndex = () => {
		/**
		 * instance fetcher all roles with swr
		 * @param url string
		 */
		const fetcher: Fetcher<IRole[], string> = async (url) => {
			const { data, statusCode, message } = await getRoles(url);
			if (statusCode === 200) {
				return data;
			}

			throw {
				statusCode,
				message,
			};
		};

		const result = useSWR<IRole[], ErrorResponse>("roles", fetcher);

		return result;
	};

	/**
	 * Handle show spesific role data by id
	 * @param id string
	 * @returns RoleHasPermission
	 */
	const useShow = (id: string) => {
		/**
		 * instance fetcher all roles with swr
		 * @param url string
		 */
		const fetcher: Fetcher<RoleHasPermission, string> = async (url) => {
			const { data, statusCode, message } = await getRole(url);
			if (statusCode === 200) {
				return data;
			}

			throw {
				statusCode,
				message,
			};
		};

		const result = useSWR<RoleHasPermission, ErrorResponse>(
			`roles/${id}`,
			fetcher
		);

		useEffect(() => {
			if (result.error) {
				const { statusCode } = result.error;
				redirectStatusCode(statusCode);
			}
		}, [result.error]);

		return result;
	};

	/**
	 * Handle for synchronization role and permission if role has permission then revoke permission for role
	 * else if role don't has permission then give permission to role
	 */
	const syncRoleAndPermission = useCallback(
		async (
			role: string | number,
			permission: string | number,
			callback: () => void
		) => {
			dispatch(setOpenLoading());
			const { statusCode, message } = await syncRoleAndPermissionService(
				role,
				permission
			);
			dispatch(setCloseLoading());

			if (statusCode === 200) {
				callback();
			}

			return toastHandler(message, statusCode > 300 ? "danger" : "success");
		},
		[dispatch]
	);

	/**
	 * This function is called for handle submit form create or update role
	 * @returns IRole | boolean
	 */
	const useSubmitRoleForm = (callback: () => void) => {
		const {
			register,
			formState: { errors },
			setError,
			reset,
			handleSubmit,
		} = useForm<RoleAndPermissionRequest>({
			defaultValues,
			resolver: yupResolver(roleAndPermissionSchema),
		});

		const onReset = useCallback(() => reset({ ...defaultValues }), [reset]);

		const submitHandler = useCallback(
			async (request: RoleAndPermissionRequest) => {
				dispatch(setOpenLoading());
				const { statusCode, message } = role
					? await updateRole(role.id, request)
					: await storeRole(request);
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
					dispatch(setCloseRoleModal());
					toastHandler(message);
					return callback();
				}
			},
			[setError, callback]
		);

		const onSubmit = handleSubmit(submitHandler);

		return {
			register,
			errors,
			onSubmit,
			onReset,
		};
	};

	const syncRoleAndUser = useCallback(
		async (
			role: string | number,
			user: string | number,
			callback: () => void
		) => {
			dispatch(setOpenLoading());
			const { statusCode, message } = await syncRoleAndUserService(role, user);
			dispatch(setCloseLoading());

			if (statusCode === 200) {
				callback();
				return toastHandler(message);
			} else {
				redirectStatusCode(statusCode);
				return toastHandler(message, "danger");
			}
		},
		[dispatch, redirectStatusCode]
	);

	return {
		useIndex,
		useShow,
		syncRoleAndPermission,
		handleOpenForm,
		handleCloseForm,
		useSubmitRoleForm,
		role,
		isOpenRoleModal,
		syncRoleAndUser,
	};
}
