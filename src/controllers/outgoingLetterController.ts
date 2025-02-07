import { useForm } from "react-hook-form";
import { OutgoingLetter, OutgoingRequest } from "@/types/letterType";
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { outgoingSchema } from "@/validations/outgoingValidation";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCloseLoading, setOpenLoading } from "@/redux/features/loadingSlice";
import { errorHandler, makeFormData, toastHandler } from "@/utils/globalUtil";
import {
	getOutgoingLetter,
	getOutgoingLetters,
	storeOutgoingLetter,
	updateOutgoingLetter,
} from "@/services/outgoingLetterService";
import { useRouter } from "next/navigation";
import useRedirect from "./redirectController";
import useSWR, { Fetcher } from "swr";
import { ErrorResponse } from "@/types/globalType";
import {
	setCloseOutgoingLetterModal,
	setOpenOutgoingLetterModal,
} from "@/redux/features/outgoingLetterSlice";

export default function useOutgoingLetterController() {
	const dispatch = useAppDispatch();
	const cans = useAppSelector((state) => state.user.permissions);
	const { isOpenOutgoingLetterModal, outgoing } = useAppSelector(
		(state) => state.outgoing
	);
	const { push } = useRouter();
	const { redirectStatusCode } = useRedirect();

	const shows = [
		{
			value: "year",
			display: "Tahun Ini",
		},
		{
			value: "month",
			display: "Bulan Ini",
		},
		{
			value: "week",
			display: "Minggu Ini",
		},
		{
			value: "day",
			display: "Hari Ini",
		},
	];

	const handleOpenModal = (outgoing: OutgoingLetter) =>
		dispatch(setOpenOutgoingLetterModal({ outgoing }));
	const handleCloseModal = () => dispatch(setCloseOutgoingLetterModal());

	/**
	 * Fetch all outgoing letters
	 * @param showBy string
	 * @returns
	 */
	const useIndex = (showBy = "month") => {
		const fetcher: Fetcher<OutgoingLetter[], string> = async (url) => {
			const { statusCode, data, message } = await getOutgoingLetters(url);
			if (statusCode === 200) {
				return data;
			}
			throw {
				statusCode,
				message,
			};
		};

		const { isLoading, data, error, mutate, isValidating } = useSWR<
			OutgoingLetter[],
			ErrorResponse
		>(`outgoing_letters?showBy=${showBy}`, fetcher);

		useEffect(() => {
			if (!isLoading && error) {
				const { statusCode } = error;
				return redirectStatusCode(statusCode);
			}
		}, [isLoading, error]);

		return {
			isLoading,
			data,
			error,
			mutate,
			isValidating,
		};
	};

	const useShowById = (id: number) => {
		const fetcher: Fetcher<OutgoingLetter, string> = async (url) => {
			const { statusCode, data, message } = await getOutgoingLetter(url);

			if (statusCode === 200) {
				return data;
			}

			throw {
				statusCode,
				message,
			};
		};

		const { data, error, isLoading, isValidating, mutate } = useSWR<
			OutgoingLetter,
			ErrorResponse
		>(`outgoing_letters/${id}`, fetcher);

		useEffect(() => {
			if (error && !isLoading) {
				const { statusCode } = error;
				return redirectStatusCode(statusCode);
			}
		}, [error, isLoading]);

		return {
			data,
			error,
			isLoading,
			isValidating,
			mutate,
		};
	};

	/**
	 * Handle form for outgoing letter on store or update
	 * @param outgoing
	 * @returns
	 */
	const useOutgoingForm = (outgoing?: OutgoingLetter) => {
		const fileRef = useRef<HTMLInputElement>(null);

		const {
			register,
			formState: { errors, isSubmitting },
			handleSubmit,
			reset,
			setError,
			setValue,
			clearErrors,
		} = useForm<OutgoingRequest>({
			resolver: yupResolver(outgoingSchema),
		});

		const onReset = (e?: FormEvent<HTMLFormElement>) => {
			e?.preventDefault();

			if (fileRef.current?.value) {
				fileRef!.current!.value = "";
			}

			reset({
				about: outgoing?.about ?? undefined,
				number: outgoing?.number ?? undefined,
				characteristic: outgoing?.characteristic ?? undefined,
				date: outgoing?.date ?? dayjs().format("YYYY-MM-DD"),
				file: undefined,
				type: outgoing ? "update" : "create",
			});
		};

		const handler = useCallback(
			async (data: OutgoingRequest) => {
				dispatch(setOpenLoading());
				const request = makeFormData(data);

				const { statusCode, message } = outgoing
					? await updateOutgoingLetter(request, outgoing.id)
					: await storeOutgoingLetter(request);
				dispatch(setCloseLoading());

				if (statusCode === 200) {
					push("/outgoing-letters");
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
			},
			[outgoing, setError]
		);

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
			if (outgoing) {
				setValue("about", outgoing.about);
				setValue("characteristic", outgoing.characteristic);
				setValue("type", "update");
				setValue("date", outgoing.date);
				setValue("number", outgoing.number);
			}
		}, [setValue, outgoing]);

		return {
			register,
			onReset,
			errors,
			isSubmitting,
			onSubmit,
			handleChooseFile,
		};
	};

	return {
		cans,
		isOpenOutgoingLetterModal,
		outgoing,
		shows,
		handleOpenModal,
		handleCloseModal,
		useIndex,
		useShowById,
		useOutgoingForm,
	};
}
