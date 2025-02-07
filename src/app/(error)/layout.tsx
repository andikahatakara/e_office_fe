import { solidButtonTheme } from "@/themes/buttonTheme";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { ReactNode } from "react";

const LayoutError = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex w-full flex-col justify-center items-center min-h-screen h-full">
			{children}
			<Link
				href={"/"}
				className={`btn flex items-center space-x-1.5 ${solidButtonTheme["primary"]}`}
			>
				<ArrowLeftIcon className="icon5" />
				<span>Dashboard</span>
			</Link>
		</div>
	);
};

export default LayoutError;
