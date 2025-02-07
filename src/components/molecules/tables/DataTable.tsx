"use client";

import Alert from "@/components/atoms/Alert";
import RenderIf from "@/components/atoms/RenderIf";
import Skeleton from "@/components/atoms/Skeleton";
import IconButton from "@/components/atoms/buttons/IconButton";
import Field from "@/components/atoms/inputs/Field";
import Search from "@/components/atoms/inputs/Search";
import Select from "@/components/atoms/inputs/Select";
import Table from "@/components/atoms/tables/Table";
import useDataTable from "@/controllers/datatableController";
import { DataTableProps } from "@/types/tableType";
import {
	BarsArrowUpIcon,
	ArrowsUpDownIcon,
	BarsArrowDownIcon,
	ChevronDoubleLeftIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export default function DataTable<T>({
	rows,
	columns,
	isLoading = false,
	error = undefined,
}: DataTableProps<T>) {
	const {
		table,
		showData,
		resetSearch,
		searchRef,
		onSearch,
		globalFilter,
		flexRender,
		goToPage,
	} = useDataTable<T>({
		rows,
		columns,
	});

	return (
		<>
			<RenderIf when={!isLoading && error ? true : false}>
				<Alert type="danger" message={error} />
			</RenderIf>
			<div className="flex w-full flex-col sm:flex-row my-4 items-center space-y-2 md:space-y-0">
				<div className="flex items-center flex-col sm:flex-row gap-y-2 gap-x-0 sm:gap-x-2 sm:gap-y-0 w-full sm:w-1/2">
					<RenderIf when={!isLoading}>
						<p className="text-gray-900 dark:text-gray-50 leading-tight">
							Tampilkan :{" "}
						</p>
						<Select
							className="!w-20 max-w-32"
							options={showData}
							display="display"
							optionValue="value"
							defaultValue={table.getState().pagination.pageSize}
							onChange={(e) => table.setPageSize(Number(e.target.value))}
							useDefaultOption={false}
						/>
					</RenderIf>
					<RenderIf when={isLoading}>
						<Skeleton className="w-32 h-4" />
						<Skeleton className="h-10 w-32" />
					</RenderIf>
				</div>
				<div className="flex justify-end items-center flex-col sm:flex-row gap-y-2 gap-x-0 sm:gap-x-2 sm:gap-y-0 w-full sm:w-1/2 ">
					<RenderIf when={!isLoading}>
						<Search
							defaultValue={globalFilter ?? ""}
							onChange={onSearch}
							ref={searchRef}
							onReset={globalFilter ? () => resetSearch() : undefined}
						/>
					</RenderIf>
					<RenderIf when={isLoading}>
						<Skeleton className="h-10 w-full lg:w-48" />
					</RenderIf>
				</div>
			</div>
			<Table>
				<Table.Thead>
					<RenderIf when={!isLoading}>
						{table.getHeaderGroups().map((headerGroup) => (
							<Table.Tr
								bordered={false}
								key={`table-row-group-${headerGroup.id}`}
							>
								{headerGroup.headers.map((header) => (
									<Table.Th
										key={`th-${headerGroup.id}-${header.id}`}
										className={`${
											header.index === 0 ||
											header.column.columnDef.header
												?.toString()
												.toLocaleLowerCase() === "aksi"
												? "text-center"
												: ""
										} `}
									>
										<div
											{...{
												className: header.column.getCanSort()
													? "cursor-pointer inline-flex gap-1"
													: "",
												onClick: header.column.getToggleSortingHandler(),
											}}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
											{{
												asc: <BarsArrowUpIcon className="h-4 w-4" />,
												desc: <BarsArrowDownIcon className="h-4 w-4" />,
											}[header.column.getIsSorted() as string] ?? null}
											{header.column.getCanSort() &&
												!header.column.getIsSorted() && (
													<ArrowsUpDownIcon className="h-4 w-4" />
												)}
										</div>
									</Table.Th>
								))}
							</Table.Tr>
						))}
					</RenderIf>
					<RenderIf when={isLoading}>
						<Table.Tr>
							{[1, 2, 3, 4].map((item, index) => (
								<Table.Th key={`table-head-loader-${item}-${index}`}>
									<Skeleton className="h-4 w-20" />
								</Table.Th>
							))}
						</Table.Tr>
					</RenderIf>
				</Table.Thead>
				<Table.TBody>
					<RenderIf when={isLoading}>
						{[1, 2, 3, 4].map((item, rowIndex) => (
							<Table.Tr
								bordered={rowIndex === length - 1 ? false : true}
								key={`table-loader-row-body-${item}-${rowIndex}`}
							>
								{[1, 2, 3, 4].map((item, cellIndex) => (
									<Table.Td key={`table-data-loader-${item}-${cellIndex}`}>
										<RenderIf when={cellIndex < 3 ? true : false}>
											<Skeleton className="h-3 w-32" />
										</RenderIf>
										<RenderIf when={cellIndex === 3 ? true : false}>
											<div className="flex space-x-3">
												<Skeleton className="h-8 w-8" />
												<Skeleton className="h-8 w-8" />
											</div>
										</RenderIf>
									</Table.Td>
								))}
							</Table.Tr>
						))}
					</RenderIf>

					<RenderIf when={!isLoading && rows.length <= 0 ? true : false}>
						<Table.Tr>
							<Table.Td className="text-center" colSpan={columns.length}>
								<span className="font-semibold leading-tight text-gray-950 dark:text-gray-50">
									Data Masih Kosong
								</span>
							</Table.Td>
						</Table.Tr>
					</RenderIf>

					<RenderIf when={!isLoading && rows.length > 0 ? true : false}>
						{table.getRowModel().rows.map((row, rowIndex) => (
							<Table.Tr
								bordered={rowIndex === rows.length - 1 ? false : true}
								key={`table-row-data-${rowIndex}`}
							>
								{row.getVisibleCells().map((cell, cellIndex) =>
									cellIndex === 0 ? (
										<Table.Th
											scope="row"
											key={`table-cell-data-${cellIndex}-${cell.id}`}
											className="text-center"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</Table.Th>
									) : (
										<Table.Td key={`table-cell-data-${cellIndex}-${cell.id}`}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</Table.Td>
									)
								)}
							</Table.Tr>
						))}
					</RenderIf>
				</Table.TBody>
			</Table>
			<div className="flex w-full my-4 justify-between items-center flex-col md:flex-row">
				<div className="flex space-x-2 items-center">
					<RenderIf when={!isLoading}>
						<IconButton
							variant="ghost"
							disabled={!table.getCanPreviousPage()}
							onClick={() => table.setPageIndex(0)}
							icon={<ChevronDoubleLeftIcon className="h-4 w-4 text-inherit" />}
						/>
						<IconButton
							variant="ghost"
							disabled={!table.getCanPreviousPage()}
							onClick={() => table.previousPage()}
							icon={<ChevronLeftIcon className="h-4 w-4 text-inherit" />}
						/>
						<IconButton
							variant="ghost"
							disabled={!table.getCanNextPage()}
							onClick={() => table.nextPage()}
							icon={<ChevronRightIcon className="h-4 w-4 text-inherit" />}
						/>
						<IconButton
							variant="ghost"
							disabled={!table.getCanNextPage()}
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							icon={<ChevronDoubleRightIcon className="h-4 w-4 text-inherit" />}
						/>
					</RenderIf>
					<RenderIf when={isLoading}>
						{[1, 2, 3, 4].map((item, index) => (
							<Skeleton
								key={`action-loader-${index}-${item}`}
								className="w-8 h-8"
							/>
						))}
					</RenderIf>
				</div>
				<div className="flex items-center gap-2 flex-col md:flex-row">
					<RenderIf when={!isLoading}>
						<p className="text-gray-900 dark:text-gray-50">
							Halaman:{" "}
							<span className="font-semibold">
								{table.getState().pagination.pageIndex + 1}
							</span>{" "}
							Dari <span className="font-semibold">{table.getPageCount()}</span>{" "}
							|
						</p>
						<div className="flex flex-col md:flex-row items-center gap-2">
							<span className="text-gray-900 font-normal dark:text-gray-50">
								Kehalaman :{" "}
							</span>
							<Field
								min={1}
								defaultValue={1}
								onChange={goToPage}
								type="number"
								className="md:!w-32"
								max={table.getPageCount()}
							/>
						</div>
					</RenderIf>
					<RenderIf when={isLoading}>
						<div className="flex mt-2 md:mt-0 items-center space-x-2">
							<Skeleton className="w-20 h-4" />
							<Skeleton className="w-24 h-4" />
							<Skeleton className="w-32 h-10" />
						</div>
					</RenderIf>
				</div>
			</div>
		</>
	);
}
