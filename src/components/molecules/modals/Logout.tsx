"use client";
import Button from "@/components/atoms/buttons/Button";
import useProfile from "@/controllers/authController";
import useUserController from "@/controllers/userController";
import { setCloseLogoutModal } from "@/redux/features/logoutSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Transition, Dialog } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";

const Logout = () => {
	const dispatch = useAppDispatch();
	const { mutateProfile } = useProfile({ middleware: "auth" });
	const { onLogout } = useUserController();

	return (
		<Transition appear show as={Fragment}>
			<Dialog
				as="div"
				className="relative z-full"
				onClose={() => dispatch(setCloseLogoutModal())}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					{/* overlay */}
					<div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-75" />
				</Transition.Child>
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
								<div className="flex items-center justify-center space-y-2 flex-col">
									<div className="h-14 w-14 bg-red-100 flex items-center justify-center rounded-full dark:bg-red-500">
										<ExclamationCircleIcon className="h-10 w-10 text-red-500 dark:text-red-50" />
									</div>
									<div className="space-y-1 text-center">
										<Dialog.Title
											as={"h3"}
											className={`text-lg font-normal text-gray-900 dark:text-gray-50`}
										>
											Apakah Anda Yakin?
										</Dialog.Title>
										<span className="text-sm text-gray-500 dark:text-gray-300">
											Apakan anda yakin ingin keluar dari aplikasi ini
										</span>
									</div>
									<div className="space-x-3">
										<Button
											label="Stay"
											onClick={() => dispatch(setCloseLogoutModal())}
										/>
										<Button
											variant="outline"
											color="danger"
											label="Ya, Logout"
											onClick={() => onLogout(mutateProfile)}
										/>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Logout;
