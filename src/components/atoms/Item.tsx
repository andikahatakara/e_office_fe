"use clinet";

import React from "react";
import Skeleton from "./Skeleton";
import RenderIf from "./RenderIf";
import Badge from "./Badge";
import { ColorKeys } from "@/themes/colorTheme";

type ItemProps = {
	title: string;
	value: string;
	isLoading?: boolean;
	asBadge?: boolean;
	badgeColor?: ColorKeys;
};

const Item = ({
	title,
	value,
	isLoading = false,
	asBadge = false,
	badgeColor = "default",
}: ItemProps) => {
	return isLoading ? (
		<div className="grid grid-cols-12 gap-2 md:gap-4 lg:gap-6">
			<div className="col-span-6 md:col-span-3 flex justify-between items-center">
				<Skeleton className="h-3 w-32" />
				<Skeleton className="h-3 w-3" />
			</div>
			<div className="col-span-6 md:col-span-9">
				<Skeleton className="h-3 w-40" />
			</div>
		</div>
	) : (
		<div className="grid grid-cols-12 gap-2 md:gap-4 lg:gap-6">
			{/* title */}
			<div className="col-span-6 md:col-span-3">
				<span className="flex items-center justify-between font-semibold text-sm md:text-base text-gray-950 dark:text-gray-50">
					{title} <span>:</span>
				</span>
			</div>
			<div className="col-span-6 md:col-span-9">
				<RenderIf when={asBadge}>
					<Badge color={badgeColor} value={value} className="!w-fit" />
				</RenderIf>
				<RenderIf when={!asBadge}>
					<span className="w-full block  text-sm md:text-base text-gray-950 dark:text-gray-50">
						{value}
					</span>
				</RenderIf>
			</div>
		</div>
	);
};

export default Item;
