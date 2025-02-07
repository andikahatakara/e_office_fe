"use client";

import React, { MouseEvent } from "react";
import Skeleton from "./Skeleton";
import IconButton from "./buttons/IconButton";
import { PlusIcon } from "@heroicons/react/24/solid";

type AddButtonProps = {
	href?: string;
	onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
	isLoading?: boolean;
	can?: boolean;
};

const AddButton = ({
	href,
	onClick,
	isLoading = false,
	can = true,
}: AddButtonProps) => {
	return isLoading ? (
		<Skeleton className="h-8 w-8" />
	) : can ? (
		<IconButton
			icon={<PlusIcon className="icon5" />}
			onClick={onClick}
			href={href}
		/>
	) : (
		<></>
	);
};

export default AddButton;
