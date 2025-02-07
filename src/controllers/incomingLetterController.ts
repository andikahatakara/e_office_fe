import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	getDepartmentLists,
	getIncoming,
	getIncomingLetters,
	storeIncomingLetter,
	updateIncomingLetter,
} from "@/services/incomingLetterService";
import { ErrorResponse } from "@/types/globalType";
import {
	DetailIncomingLetter,
	IncomingLetter,
	IncomingRequest,
} from "@/types/letterType";
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import useSWR, { Fetcher } from "swr";
import useRedirect from "./redirectController";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { incomingSchema } from "@/validations/incomingValidation";
import { setCloseLoading, setOpenLoading } from "@/redux/features/loadingSlice";
import { errorHandler, makeFormData, toastHandler } from "@/utils/globalUtil";
import { useRouter } from "next/navigation";
import {
	setCloseIncomingLetterModal,
	setOpenIncomingLetterModal,
} from "@/redux/features/incomingLetterSlice";
import { Department, HeadOfDepartment } from "@/types/departmentType";

export default function useIncomingLetterController() {
	const { permissions: cans } = useAppSelector((state) => state.user);
	const { redirectStatusCode } = useRedirect();
	const { incoming, isOpenIncomingLetterModal } = useAppSelector(
		(state) => state.incoming
	);
	const { push } = useRouter();
	const dispatch = useAppDispatch();

	const [departments, setDepartments] = useState<HeadOfDepartment[] | []>([]);

	const shows = [
		{
			value: "year",
			display: `Tahun Ini`,
		},
		{
			value: "month",
			display: `Bulan Ini`,
		},
		{
			value: "week",
			display: `Minggu Ini`,
		},
		{
			value: "day",
			display: `Hari Ini`,
		},
	];

	const onOpenDispositionModal = async (incoming: IncomingLetter) => {
		const response = await getDepartmentLists();

		response.statusCode === 200
			? setDepartments(response.data)
			: setDepartments([]);

		dispatch(setOpenIncomingLetterModal({ incoming }));
	};
	const onCloseDispositionModal = () => {
		setDepartments([]);
		dispatch(setCloseIncomingLetterModal());
	};

	/**
	 * Fetch all data of incoming letters filtered by yearly, montly, weekly ,and daily
	 * @param showBy string default value "month"
	 * @returns object error,isLoading,isValidating,mutate,data,
	 */
	const useIndex = (showBy = "month") => {
		const fetch: Fetcher<IncomingLetter[], string> = async (url) => {
			const { statusCode, message, data } = await getIncomingLetters(url);
			if (statusCode === 200) {
				return data;
			}

			throw {
				message,
				statusCode,
			};
		};

		const { error, isLoading, isValidating, mutate, data } = useSWR<
			IncomingLetter[],
			ErrorResponse
		>(`incoming_letters?showBy=${showBy}`, fetch);

		useEffect(() => {
			if (!isLoading && error) {
				const { statusCode } = error;
				return redirectStatusCode(statusCode);
			}
		}, [isLoading, error]);

		return {
			error,
			isLoading,
			isValidating,
			mutate,
			data,
		};
	};

	/**
	 * Fetch spesific data for incoming letter
	 * @param id number
	 * @returns
	 */
	const useShow = (id: number) => {
		const fetcher: Fetcher<DetailIncomingLetter, string> = async (url) => {
			const { statusCode, message, data } = await getIncoming(url);

			if (statusCode === 200) {
				return data;
			}

			throw {
				statusCode,
				message,
			};
		};

		const { isLoading, isValidating, mutate, data, error } = useSWR<
			DetailIncomingLetter,
			ErrorResponse
		>(`incoming_letters/${id}`, fetcher);

		useEffect(() => {
			if (!isLoading && error) {
				const { statusCode } = error;
				return redirectStatusCode(statusCode);
			}
		}, [isLoading, error]);

		return {
			isLoading,
			isValidating,
			mutate,
			data,
			error,
		};
	};

	const useIncomingForm = (incoming?: IncomingLetter) => {
		const fileRef = useRef<HTMLInputElement>(null);

		const defaultValues: Partial<IncomingRequest> = useMemo(() => {
			return {
				to: undefined,
				characteristic: undefined,
				from: undefined,
				date: dayjs().format("YYYY-MM-DD").toString(),
				about: undefined,
				number: undefined,
				file: undefined,
				type: incoming ? "update" : "create",
			};
		}, [incoming]);

		const {
			register,
			formState: { errors, isSubmitting },
			reset,
			setValue,
			handleSubmit,
			clearErrors,
			setError,
		} = useForm<IncomingRequest>({
			defaultValues,
			resolver: yupResolver(incomingSchema),
		});

		const onReset = useCallback(() => {
			fileRef!.current!.value = "";
			if (incoming) {
				reset({
					about: incoming.about,
					characteristic: incoming.characteristic,
					date: incoming.date,
					to: incoming.employee.user.id.toString(),
					from: incoming.from,
					number: incoming.number,
					type: "update",
				});
			} else {
				reset({ ...defaultValues });
			}
		}, [reset, defaultValues, incoming]);

		const handler = async (data: IncomingRequest) => {
			dispatch(setOpenLoading());
			const request = makeFormData(data);
			const { statusCode, message } = incoming
				? await updateIncomingLetter(request, incoming.id)
				: await storeIncomingLetter(request);
			dispatch(setCloseLoading());
			if (statusCode === 200) {
				push("/incoming-letters");
				return toastHandler(message);
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

		const handleChooseFile = (e: ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;
			if (files) {
				setValue("file", files[0]);
			}
			if (errors.file?.message) {
				clearErrors();
			}
		};

		useEffect(() => {
			if (incoming) {
				setValue("about", incoming.about);
				setValue("characteristic", incoming.characteristic);
				setValue("date", incoming.date);
				setValue("to", incoming.employee.user.id.toString());
				setValue("from", incoming.from);
				setValue("number", incoming.number);
				setValue("type", "update");
			}
		}, [incoming, setValue]);

		return {
			register,
			errors,
			isSubmitting,
			onReset,
			onSubmit,
			fileRef,
			handleChooseFile,
		};
	};

	return {
		cans,
		shows,
		isOpenIncomingLetterModal,
		incoming,
		useIndex,
		useShow,
		useIncomingForm,
		onCloseDispositionModal,
		onOpenDispositionModal,
		departments,
	};
}
