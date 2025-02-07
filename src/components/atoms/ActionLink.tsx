import Link from "next/link";
import React from "react";

const ActionLink = ({
	href,
	title,
	can,
}: {
	href: string;
	title: string;
	can: boolean;
}) => {
	return !can ? (
		<span className="font-normal">{title}</span>
	) : (
		<Link
			href={href}
			className="text-primary-700 dark:text-primary-600 font-semibold"
		>
			{title}
		</Link>
	);
};

export default ActionLink;
