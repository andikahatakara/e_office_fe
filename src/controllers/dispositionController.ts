import { ErrorResponse } from "@/types/globalType";
import {
	createDisposition,
	getDisposition,
} from "@/services/dispositionServices";
import { DispositionDetail, DispositionRequest } from "@/types/dispositionType";
import { errorHandler, toastHandler } from "@/utils/globalUtil";
import { storeDispositionSchema } from "@/validations/dispositionValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useRedirect from "./redirectController";
import { useAppDispatch } from "@/redux/hooks";
import { setCloseLoading, setOpenLoading } from "@/redux/features/loadingSlice";
import useSWR, { Fetcher } from "swr";
import { useEffect } from "react";

export default function useDispoitionController() {
	const { redirectStatusCode } = useRedirect();
	const dispatch = useAppDispatch();

	const useDispositionForm = (id: string | number, callback: () => void) => {
		const {
			handleSubmit,
			register,
			formState: { errors },
			setError,
		} = useForm<DispositionRequest>({
			resolver: yupResolver(storeDispositionSchema),
		});

		const handler = async (data: DispositionRequest) => {
			dispatch(setOpenLoading());
			const response = await createDisposition(data, id);
			dispatch(setCloseLoading());
			const { statusCode, message } = response;

			if (statusCode === 200) {
				toastHandler(message);
				return callback();
			} else {
				redirectStatusCode(statusCode);
				if (
					typeof message === "object" &&
					(message as object).hasOwnProperty("errors")
				) {
					return errorHandler(message["errors"], setError);
				} else {
					return toastHandler(message, "danger");
				}
			}
		};

		const onSubmit = handleSubmit(handler);

		return {
			register,
			errors,
			onSubmit,
		};
	};

	const useGetDisposition = (id: number) => {
		const fetcher: Fetcher<DispositionDetail, string> = async (url) => {
			const response = await getDisposition(url);

			const { data, statusCode, message } = response;

			if (statusCode === 200) {
				return data;
			}
			throw {
				statusCode,
				message,
			};
		};

		const { data, isLoading, error, isValidating } = useSWR<
			DispositionDetail,
			ErrorResponse
		>(`dispositions/${id}`, fetcher);

		useEffect(() => {
			if (error && !isLoading) {
				return redirectStatusCode(error.statusCode);
			}
		}, [error, isLoading]);

		return {
			data,
			isLoading,
			error,
			isValidating,
		};
	};

	return {
		useDispositionForm,
		useGetDisposition,
	};
}
