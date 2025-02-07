import { getDepartments } from "@/services/departmentService";
import { DepartmentWithSub } from "@/types/departmentType";
import { ErrorResponse } from "@/types/globalType";
import { useEffect } from "react";
import useSWR, { Fetcher } from "swr";
import useRedirect from "./redirectController";
import { useAppSelector } from "@/redux/hooks";

export default function useDepartmentController() {
	const { redirectStatusCode } = useRedirect();
	const { permissions: cans } = useAppSelector((state) => state.user);

	/**
	 * Handle fetch all departments with SWR
	 * @returns object
	 */
	const useIndex = () => {
		const fetcher: Fetcher<DepartmentWithSub[], string> = async (url) => {
			const { data, statusCode, message } = await getDepartments(url);

			if (statusCode === 200) {
				return data;
			}
			throw {
				statusCode,
				message,
			};
		};

		const { data, isLoading, error, mutate } = useSWR<
			DepartmentWithSub[],
			ErrorResponse
		>("departments", fetcher);

		useEffect(() => {
			if (!isLoading && error) {
				return redirectStatusCode(error.statusCode);
			}
			return () => {};
		}, [isLoading, error]);

		return {
			data,
			isLoading,
			error,
			mutate,
		};
	};

	return {
		useIndex,
		cans,
	};
}
