import { setCloseLoading, setOpenLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	employeeDepartments,
	employeeGetHead,
	getEmployee,
	getEmployees,
	storeEmployee,
} from "@/services/employeeService";
import { DepartmentWithSub } from "@/types/departmentType";
import { Employee, EmployeeRequest } from "@/types/employeeType";
import { ErrorResponse } from "@/types/globalType";
import { errorHandler, toastHandler } from "@/utils/globalUtil";
import { employeeRequestSchema } from "@/validations/employeeValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { Fetcher } from "swr";
import useRedirect from "./redirectController";

export default function useEmployeeController() {
	const dispatch = useAppDispatch();
	const { back } = useRouter();
	const { redirectStatusCode } = useRedirect();

	const { permissions: cans } = useAppSelector((state) => state.user);

	const positions = [
		{ value: "kepala dinas", display: "Kepala Dinas" },
		{ value: "sekretaris", display: "Sekretaris" },
		{ value: "bidang", display: "Kepala Bidang" },
		{ value: "seksi", display: "Kepala Seksi / Sub Bagian" },
		{ value: "anggota", display: "Anggota" },
	];

	/**
	 * Get all employees from backend api
	 * @returns
	 */
	const useIndex = () => {
		/**
		 * Handle fetcher with SWR
		 * @param url
		 * @returns Employee[] | ErrorResponse
		 */
		const fetcher: Fetcher<Employee[], string> = async (url) => {
			const { data, statusCode, message } = await getEmployees(url);

			if (statusCode === 200) {
				return data;
			}

			throw {
				statusCode,
				message,
			};
		};

		const {
			isLoading,
			data: employees,
			isValidating,
			error,
			mutate: mutateEmployees,
		} = useSWR<Employee[], ErrorResponse>("employees", fetcher);

		return {
			isLoading,
			employees,
			isValidating,
			error,
			mutateEmployees,
		};
	};

	const useDepartments = (params?: object) => {
		const [departments, setDepartments] = useState<DepartmentWithSub[]>([]);

		const fetch = useCallback(async () => {
			const { statusCode, data } = await employeeDepartments(params);

			return statusCode === 200 ? setDepartments(data) : setDepartments([]);
		}, [params]);

		useEffect(() => {
			fetch();
		}, [fetch]);

		return {
			departments,
		};
	};

	/**
	 * This function used for store or update employee
	 * @param employee optional parameter employee
	 * @returns
	 */
	const useFormEmployee = (employee?: Employee) => {
		const defaultValues = useMemo(() => {
			return {
				first_name: employee ? employee.user.first_name : undefined,
				last_name: employee ? employee.user.last_name : undefined,
				email: employee ? employee.user.email : undefined,
				nip: employee ? employee.user.nip : undefined,
				department_id: employee
					? employee.employeeable.id.toString()
					: undefined,
				position: undefined,
			};
		}, [employee]);

		const {
			register,
			formState: { errors, isSubmitting },
			reset,
			handleSubmit,
			watch,
			control,
			resetField,
			setError,
		} = useForm<EmployeeRequest>({
			defaultValues,
			resolver: yupResolver(employeeRequestSchema),
		});

		const onReset = useCallback(
			() => reset({ ...defaultValues }),
			[reset, defaultValues]
		);

		const handler = useCallback(
			async (data: EmployeeRequest) => {
				dispatch(setOpenLoading());
				const { statusCode, message } = await storeEmployee(data);
				dispatch(setCloseLoading());
				if (statusCode === 200) {
					toastHandler(message);
					return back();
				} else {
					if ([401, 403].includes(statusCode)) {
						redirectStatusCode(statusCode);
					} else {
						if (
							typeof message === "object" &&
							(message as object).hasOwnProperty("errors")
						) {
							return errorHandler(message["errors"], setError);
						} else {
							return toastHandler(message, "danger");
						}
					}
				}
			},
			[setError]
		);

		const onSubmit = handleSubmit(handler);

		return {
			register,
			isSubmitting,
			errors,
			onReset,
			onSubmit,
			watch,
			control,
			resetField,
		};
	};

	/**
	 * Get detail of employee
	 * @param id number
	 * @returns
	 */
	const useGetById = (id: number) => {
		const fetcher: Fetcher<Employee, string> = async (url) => {
			const { statusCode, data, message } = await getEmployee(url);

			if (statusCode === 200) {
				return data;
			}

			throw {
				statusCode,
				message,
			};
		};

		const { mutate, isLoading, isValidating, error, data } = useSWR<
			Employee,
			ErrorResponse
		>(`employees/${id}`, fetcher);

		useEffect(() => {
			if (!isLoading && error) {
				const { statusCode } = error;
				return redirectStatusCode(statusCode);
			}
		}, [isLoading, error]);

		return {
			mutate,
			isLoading,
			isValidating,
			error,
			data,
		};
	};

	const useGetHeadEmployee = () => {
		const fetcher: Fetcher<Employee[], string> = async (url) => {
			const { data, statusCode, message } = await employeeGetHead(url);
			if (statusCode === 200) {
				return data;
			}
			throw {
				statusCode,
				message,
			};
		};

		const result = useSWR<Employee[], ErrorResponse>("employees/head", fetcher);

		return result;
	};

	return {
		useIndex,
		useDepartments,
		useFormEmployee,
		useGetById,
		useGetHeadEmployee,
		cans,
		positions,
	};
}
