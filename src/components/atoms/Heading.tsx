import React from "react";
import RenderIf from "./RenderIf";
import Skeleton from "./Skeleton";

type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
	as?: HeadingType;
	title: string;
	level?: HeadingType;
	className?: string;
	isLoading?: boolean;
};

const Heading = ({
	as = "h1",
	title,
	level,
	className = "",
	isLoading = false,
}: HeadingProps) => {
	const styles: Record<HeadingType, string> = {
		h1: "text-5xl font-extrabold ",
		h2: "text-4xl font-bold",
		h3: "text-3xl font-bold",
		h4: "text-2xl font-bold",
		h5: "text-xl font-bold",
		h6: "text-lg font-bold",
	};

	return isLoading ? (
		<Skeleton className="h-3 w-36" />
	) : (
		<>
			<RenderIf when={as === "h1" ? true : false}>
				<h1
					className={`text-gray-950 dark:text-white ${
						styles[level ?? "h1"]
					} ${className}`}
				>
					{title}
				</h1>
			</RenderIf>
			<RenderIf when={as === "h2" ? true : false}>
				<h2
					className={`text-gray-950 dark:text-white ${
						styles[level ?? "h2"]
					} ${className}`}
				>
					{title}
				</h2>
			</RenderIf>
			<RenderIf when={as === "h3" ? true : false}>
				<h3
					className={`text-gray-950 dark:text-white ${
						styles[level ?? "h3"]
					} ${className}`}
				>
					{title}
				</h3>
			</RenderIf>
			<RenderIf when={as === "h4" ? true : false}>
				<h4
					className={`text-gray-950 dark:text-white ${
						styles[level ?? "h4"]
					} ${className}`}
				>
					{title}
				</h4>
			</RenderIf>
			<RenderIf when={as === "h5" ? true : false}>
				<h5
					className={`text-gray-950 dark:text-white ${
						styles[level ?? "h5"]
					} ${className}`}
				>
					{title}
				</h5>
			</RenderIf>
			<RenderIf when={as === "h6" ? true : false}>
				<h6
					className={`text-gray-950 dark:text-white ${
						styles[level ?? "h6"]
					} ${className}`}
				>
					{title}
				</h6>
			</RenderIf>
		</>
	);
};

export default Heading;
