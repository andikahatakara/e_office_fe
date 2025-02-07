"use client";
import React from "react";
import Skeleton from "./Skeleton";
import IconButton from "./buttons/IconButton";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const BackButton = ({
	can = true,
	isLoading = false,
}: {
	can?: boolean;
	isLoading?: boolean;
}) => {
	const { back } = useRouter();

	return isLoading ? (
		<Skeleton className="h-8 w-8" />
	) : can ? (
		<IconButton
			color="dark"
			icon={<ArrowLeftIcon className="icon5" />}
			onClick={() => back()}
		/>
	) : (
		<></>
	);
};

export default BackButton;
