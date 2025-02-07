"use client";

import RenderIf from "@/components/atoms/RenderIf";
import Button from "@/components/atoms/buttons/Button";
import IconButton from "@/components/atoms/buttons/IconButton";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment, ReactNode } from "react";

type BasicModalProps = {
	title: string;
	asForm?: boolean;
	children: ReactNode;
	onClose: () => void;
	onConfirm?: () => void;
	onCancel?: () => void;
	confirmLabel?: string;
	cancelLabel?: string;
	isOpen?: boolean;
};

const BasicModal = ({
	title,
	asForm,
	children,
	onClose,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	onConfirm,
	onCancel,
	isOpen = true,
}: BasicModalProps) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				open={isOpen}
				as="div"
				className="relative z-full"
				onClose={onClose}
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
					<div className="fixed inset-0 bg-black bg-opacity-25" />
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
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<div className="flex justify-between items-center">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										{title}
									</Dialog.Title>
									<IconButton
										icon={<XMarkIcon className="h-5 w-5 text-inherit" />}
										variant="ghost"
										color="dark"
										onClick={onClose}
									/>
								</div>
								<RenderIf when={asForm}>
									<form
										onSubmit={onConfirm}
										onReset={onCancel}
										className="space-y-2 mt-2"
									>
										{children}
										<div className="!mt-4 space-x-3">
											<Button label={confirmLabel} type="submit" />
											<Button
												label={cancelLabel}
												type="reset"
												variant="outline"
												color="danger"
											/>
										</div>
									</form>
								</RenderIf>
								<RenderIf when={!asForm}>{children}</RenderIf>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default BasicModal;
