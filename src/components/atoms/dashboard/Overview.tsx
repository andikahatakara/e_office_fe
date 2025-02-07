"use client";
import {
	ArrowLeftOnRectangleIcon,
	ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import Skeleton from "../Skeleton";

type OverviewProps = {
	label: string;
	value: number;
	type?: "incoming" | "outgoing";
	isLoading?: boolean;
};

const Overview = ({
	label,
	value,
	type = "incoming",
	isLoading = false,
}: OverviewProps) => {
	const bg: Record<string, string> = {
		incoming: "bg-green-800 dark:bg-green-600 rounded-lg !text-white p-6",
		outgoing: "bg-red-800 dark:bg-red-600 rounded-lg !text-white p-6",
	};
	const icon: Record<string, ReactNode> = {
		outgoing: (
			<ArrowRightOnRectangleIcon className="h-16 w-16 opacity-50 transition hover:scale-125" />
		),
		incoming: (
			<ArrowLeftOnRectangleIcon className="h-16 w-16 opacity-50 transition hover:scale-125" />
		),
	};

	return isLoading ? (
		<Skeleton className="w-full h-10" />
	) : (
		<div className={`${bg[type]} flex justify-between`}>
			<div className="flex flex-col space-y-3">
				<span className="text-3xl font-bold">{value}</span>
				<span>{label}</span>
			</div>
			<div className="flex items-center justify-center h-full">
				{icon[type]}
			</div>
		</div>
	);
};

export default Overview;
