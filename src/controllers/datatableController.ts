import { DataTableProps } from "@/types/tableType";
import { fuzzyFilter } from "@/utils/datatableUtil";
import {
	useReactTable,
	getCoreRowModel,
	SortingState,
	getFilteredRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	flexRender,
} from "@tanstack/react-table";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import useDebounce from "./useDebounce";

export default function useDataTable<T>({
	rows,
	columns,
}: Pick<DataTableProps<T>, "columns" | "rows">) {
	const rowData = useMemo(() => rows, [rows]);
	const columnsData = useMemo(() => columns, [columns]);
	const searchRef = useRef<HTMLInputElement>(null);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>("");

	const debounceFilter = useDebounce<string>(globalFilter);

	const table = useReactTable({
		data: rowData,
		columns: columnsData,
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		state: {
			sorting,
			globalFilter,
		},
		globalFilterFn: fuzzyFilter,
		onGlobalFilterChange: setGlobalFilter,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setGlobalFilter(value);
	};

	const resetSearch = () => {
		setGlobalFilter("");
		if (searchRef) {
			searchRef.current!.value = "";
		}
	};

	const goToPage = (e: ChangeEvent<HTMLInputElement>) => {
		const page = e.target.value ? Number(e.target.value) - 1 : 0;
		table.setPageIndex(page);
	};

	const showData = [
		{ display: 10, value: 10 },
		{ display: 20, value: 20 },
		{ display: 50, value: 50 },
		{ display: 75, value: 75 },
		{ display: 100, value: 100 },
	];

	return {
		table,
		searchRef,
		onSearch,
		resetSearch,
		goToPage,
		showData,
		globalFilter,
		flexRender,
	};
}
