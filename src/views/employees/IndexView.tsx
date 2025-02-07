"use client";
import ActionButton from "@/components/atoms/ActionButton";
import AddButton from "@/components/atoms/AddButton";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import IconButton from "@/components/atoms/buttons/IconButton";
import DataTable from "@/components/molecules/tables/DataTable";
import useEmployeeController from "@/controllers/employeeController";
import { Employee } from "@/types/employeeType";
import { getColorEmployee, getPosition } from "@/utils/employeeUtli";
import { PlusIcon } from "@heroicons/react/24/outline";
import { createColumnHelper } from "@tanstack/react-table";

const IndexView = () => {
	const { useIndex, cans } = useEmployeeController();
	const { isLoading, employees, error } = useIndex();
	const createColumn = createColumnHelper<Employee>();

	const columns = [
		createColumn.display({
			header: "#",
			cell: ({ row: { index } }) => index + 1,
		}),
		createColumn.accessor("user.full_name", {
			header: "Nama",
		}),
		createColumn.accessor("user.nip", {
			header: "Nip",
		}),
		createColumn.accessor("user.email", {
			header: "Email",
		}),
		createColumn.accessor("is_head", {
			header: "Jabatan",
			cell: ({
				cell: { getValue },
				row: {
					original: { employeeable },
				},
			}) => getPosition(employeeable, getValue()),
		}),
		createColumn.display({
			header: "Bidang",
			cell: ({ row: { original } }) => (
				<Badge
					color={getColorEmployee(original.employeeable)}
					value={original.employeeable.name}
				/>
			),
		}),
	];

	if (cans && (cans["employees.update"] || cans["employees.destroy"])) {
		const column = createColumn.display({
			header: "Aksi",
			cell: ({
				row: {
					original: { actions },
				},
			}) => <ActionButton actions={actions} />,
		});
		columns.push(column);
	}

	return (
		<Card>
			<Card.Header>
				<Heading isLoading={isLoading} level="h3" title="Data Pegawai" />
				<AddButton
					isLoading={isLoading}
					can={(cans && cans["employees.store"]) ?? false}
					href="/employees/create"
				/>
			</Card.Header>
			<DataTable<Employee>
				isLoading={isLoading}
				error={error?.message}
				rows={employees ?? []}
				columns={columns}
			/>
		</Card>
	);
};

export default IndexView;
