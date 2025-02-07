"use client";

import {
	TableBodyProps,
	TableContainerProps,
	TableDataCellProps,
	TableHeadProps,
	TableHeaderCellProps,
	TableRowProps,
} from "@/types/tableType";
import React, { ReactNode } from "react";

const Container = ({
	children,
	className = "",
	...props
}: TableContainerProps) => {
	return (
		<div className={`relative overflow-x-auto rounded`}>
			<table
				className={`w-full text-sm text-left text-gray-500 dark:text-gray-400 ${className}`}
				{...props}
			>
				{children}
			</table>
		</div>
	);
};

const THead = ({ children, className = "", ...props }: TableHeadProps) => {
	return (
		<thead
			className={`text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-600 dark:text-gray-100 ${className}`}
			{...props}
		>
			{children}
		</thead>
	);
};

const TBody = ({ children, className, ...props }: TableBodyProps) => {
	return (
		<tbody className={className} {...props}>
			{children}
		</tbody>
	);
};

const Tr = ({
	children,
	bordered = true,
	hover = true,
	className,
	...props
}: TableRowProps) => {
	return (
		<tr
			className={`${className ?? ""} ${
				hover ? "hover:bg-gray-50 dark:hover:bg-gray-600" : ""
			} ${bordered ? "border-b  dark:border-gray-700" : ""}`}
			{...props}
		>
			{children}
		</tr>
	);
};

const Th = ({
	children,
	scope = "col",
	className = "",
	...props
}: TableHeaderCellProps) => {
	return (
		<th scope={scope} className={`px-6 py-3 ${className}`} {...props}>
			{children}
		</th>
	);
};

const Td = ({
	children,
	className = "",
	scope = "row",
	...props
}: TableDataCellProps) => {
	return (
		<td scope={scope} className={`px-6 py-4 ${className}`} {...props}>
			{children}
		</td>
	);
};

const Table = ({ children }: { children: ReactNode }) => {
	return <Container>{children}</Container>;
};

Table.Thead = THead;
Table.TBody = TBody;
Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;

export default Table;
