"use client";

import React, { ReactNode } from "react";
import RenderIf from "../RenderIf";
import Skeleton from "../Skeleton";
import Link from "next/link";

type DetailItemProps = {
	title: string;
	value: string;
	leftColumn?: number;
	rightColumn?: number;
	className?: string;
	isLoading?: boolean;
	icon?: ReactNode;
	href?: string;
	externalUrl?: boolean;
};

const DetailItem = ({
	isLoading = false,
	className = "",
	leftColumn = 3,
	rightColumn = 9,
	icon,
	title,
	value,
	href,
	externalUrl = false,
}: DetailItemProps) => {
	const spans: Record<number, string> = {
		1: "md:col-span-1",
		2: "md:col-span-2",
		3: "md:col-span-3",
		4: "md:col-span-4",
		5: "md:col-span-5",
		6: "md:col-span-6",
		7: "md:col-span-7",
		8: "md:col-span-8",
		9: "md:col-span-9",
		10: "md:col-span-10",
		11: "md:col-span-11",
		12: "md:col-span-12",
	};
	return (
		<div className={`grid grid-cols-12 gap-4 md:gap-6 ${className}`}>
			{/* left column */}
			<div className={`col-span-6 ${spans[leftColumn]} flex justify-between`}>
				<RenderIf when={!isLoading}>
					<span
						className={`text-gray-950 dark:text-gray-100 font-semibold text-xs sm:text-sm ${
							icon ? "inline-flex gap-2 items-center" : ""
						}`}
					>
						{icon} {title}
					</span>
					<span className="text-gray-950 dark:text-gray-100 font-semibold text-xs sm:text-sm">
						:
					</span>
				</RenderIf>
				<RenderIf when={isLoading}>
					<Skeleton className="w-24  md:w-32 h-3 mb-2" />
					<Skeleton className="w-2 h-3 mb-2" />
				</RenderIf>
			</div>
			{/* right column column */}
			<div className={`col-span-6 ${spans[rightColumn]}`}>
				<RenderIf when={!isLoading}>
					<RenderIf when={href ? true : false}>
						<Link
							target="_blank"
							passHref={externalUrl}
							href={href ?? "#"}
							className={`text-xs font-normal sm:text-sm text-primary-700 dark:text-primary-600 block w-full truncate cursor-pointer`}
						>
							{value}
						</Link>
					</RenderIf>
					<RenderIf when={!href}>
						<span
							className={`text-xs font-normal sm:text-sm text-gray-950 dark:text-gray-100 block w-full truncate`}
						>
							{value}
						</span>
					</RenderIf>
				</RenderIf>
				<RenderIf when={isLoading}>
					<Skeleton className="w-32 md:w-40 h-3 mb-2" />
				</RenderIf>
			</div>
		</div>
	);
};

export default DetailItem;
