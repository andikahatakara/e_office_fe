import React, { HtmlHTMLAttributes } from "react";

interface SkeletonProps extends HtmlHTMLAttributes<HTMLDivElement> {
	circle?: boolean;
	circleSize?: number;
}

const Skeleton = ({
	circle,
	circleSize,
	className = "w-10 h-10",
	...props
}: SkeletonProps) => {
	return (
		<div
			className={`max-w-full animate-pulse bg-gray-200 dark:bg-gray-700 ${
				circle ? "rounded-full" : "rounded"
			} ${className}`}
			{...props}
		/>
	);
};

export default Skeleton;
