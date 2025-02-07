import {
	setCloseDeleteModal,
	setOpenDeleteModal,
} from "@/redux/features/deleteSlice";
import { setCloseLoading, setOpenLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import http from "@/services";
import { toastHandler } from "@/utils/globalUtil";

export default function useDeleteController() {
	const dispatch = useAppDispatch();
	const { isOpenDeleteModal, action } = useAppSelector((state) => state.delete);

	const onDelete = async () => {
		const url = action;
		dispatch(setCloseDeleteModal());
		dispatch(setOpenLoading());
		const { statusCode, message } = await http<boolean>({
			url: `${url}`,
			method: "DELETE",
		});
		dispatch(setCloseLoading());
		return toastHandler(message, statusCode > 300 ? "danger" : "success");
	};

	const onOpen = (url: string) => {
		dispatch(setOpenDeleteModal({ action: url }));
	};

	const onClose = () => dispatch(setCloseDeleteModal());

	return {
		onDelete,
		onOpen,
		onClose,
		isOpenDeleteModal,
	};
}
