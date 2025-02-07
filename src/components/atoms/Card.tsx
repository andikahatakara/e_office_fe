import React, { HtmlHTMLAttributes, ReactNode } from "react";
const Header = ({
	children,
	className = "flex justify-between items-center mb-4",
	...props
}: HtmlHTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} className={`${className}`}>
			{children}
		</div>
	);
};

const Card = ({
	children,
	border = false,
}: {
	children: ReactNode;
	border?: boolean;
}) => {
	const borderStyle = `border border-gray-300 dark:border-gray-700`;

	return (
		<div
			className={`rounded-lg p-6 w-full bg-white ${
				border ? borderStyle : ""
			} dark:bg-gray-800 `}
		>
			{children}
		</div>
	);
};

Card.Header = Header;

export default Card;
