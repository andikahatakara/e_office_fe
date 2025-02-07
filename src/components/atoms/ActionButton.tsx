"use client";
import { useAppSelector } from "@/redux/hooks";
import { Actions } from "@/types/globalType";
import {
	EyeIcon,
	PaperAirplaneIcon,
	PencilIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import React, { MouseEvent, ReactNode } from "react";
import IconButton from "./buttons/IconButton";
import { ButtonColorKeys } from "@/themes/buttonTheme";
import useDeleteController from "@/controllers/deleteController";

type ActionButtonProps = {
	actions: Actions;
	click?: Record<string, (e?: MouseEvent<HTMLButtonElement>) => void>;
};

const ActionButton = ({ click, actions }: ActionButtonProps) => {
	const { permissions: cans } = useAppSelector((state) => state.user);
	const { onOpen } = useDeleteController();

	const icon: Record<string, ReactNode> = {
		disposition: <PaperAirplaneIcon className="icon5 -rotate-45 " />,
		show: <EyeIcon className="icon5" />,
		update: <PencilIcon className="icon5" />,
		delete: <TrashIcon className="icon5" />,
	};
	const color: Record<string, ButtonColorKeys> = {
		disposition: "secondary",
		show: "dark",
		update: "info",
		delete: "danger",
	};

	return (
		<div className="flex flex-wrap gap-2 justify-center items-center ">
			{actions.map(({ action, useModal, type, can, disabled, isHead }, index) =>
				cans?.[can] || isHead ? (
					<IconButton
						disabled={disabled}
						icon={icon[type]}
						color={color[type]}
						key={`action-${index}-${action}`}
						href={!useModal ? action : undefined}
						onClick={
							!useModal
								? undefined
								: type === "delete"
								? () => onOpen(action)
								: click
								? click[type]
								: undefined
						}
					/>
				) : (
					<></>
				)
			)}
		</div>
	);
};

export default ActionButton;
