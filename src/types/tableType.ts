import {
	HtmlHTMLAttributes,
	TableHTMLAttributes,
	TdHTMLAttributes,
	ThHTMLAttributes,
} from "react";
import { ColumnDef } from "@tanstack/react-table";

interface TableContainerProps extends TableHTMLAttributes<HTMLTableElement> {}
interface TableHeadProps extends HtmlHTMLAttributes<HTMLTableSectionElement> {}
interface TableBodyProps extends HtmlHTMLAttributes<HTMLTableSectionElement> {}
interface TableRowProps extends HtmlHTMLAttributes<HTMLTableRowElement> {
	hover?: boolean;
	bordered?: boolean;
}
interface TableHeaderCellProps
	extends ThHTMLAttributes<HTMLTableHeaderCellElement> {}
interface TableDataCellProps
	extends TdHTMLAttributes<HTMLTableDataCellElement> {}

type DataTableProps<T> = {
	rows: T[];
	columns: ColumnDef<T, any>[];
	isLoading?: boolean;
	error?: any;
};

export type {
	TableContainerProps,
	TableHeadProps,
	TableBodyProps,
	TableRowProps,
	TableHeaderCellProps,
	TableDataCellProps,
	DataTableProps,
};
