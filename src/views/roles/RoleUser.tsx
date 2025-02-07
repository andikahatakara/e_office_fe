import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import Toggle from "@/components/atoms/Toggle";
import DataTable from "@/components/molecules/tables/DataTable";
import useEmployeeController from "@/controllers/employeeController";
import useRoleController from "@/controllers/roleController";
import { Employee } from "@/types/employeeType";
import type { RoleHasPermission } from "@/types/roleType";
import { checkRoleHasUser } from "@/utils/roleUtil";
import { createColumnHelper } from "@tanstack/react-table";

const RoleUser = ({
	role,
	isLoading = false,
	cans,
	mutate,
}: {
	role?: RoleHasPermission;
	isLoading?: boolean;
	cans?: Record<string, boolean>;
	mutate: () => void;
}) => {
	const { syncRoleAndUser } = useRoleController();
	const { useIndex } = useEmployeeController();
	const { employees, isLoading: loading, error } = useIndex();

	const createColumn = createColumnHelper<Employee>();

	const columns = [
		createColumn.display({
			header: "#",
			cell: ({ row: { index } }) => index + 1,
		}),
		createColumn.accessor("user.full_name", {
			header: "Nama Pegawai",
		}),
		createColumn.accessor("user.email", {
			header: "Nama Email",
		}),
		createColumn.display({
			header: "Status",
			cell: ({
				row: {
					original: {
						user: { id },
					},
				},
			}) =>
				checkRoleHasUser(id, role) ? (
					<Badge variant="soft" color="success" value="Ya" />
				) : (
					<Badge variant="soft" color="danger" value="Tidak" />
				),
		}),
	];

	if (cans && cans["roles.sync.user"]) {
		columns.push(
			createColumn.display({
				header: "Aksi",
				cell: ({
					row: {
						original: {
							user: { id, full_name },
						},
					},
				}) => (
					<Toggle
						title={full_name}
						onChange={() => syncRoleAndUser(role?.role.id ?? "", id, mutate)}
						checked={checkRoleHasUser(id, role)}
					/>
				),
			})
		);
	}

	return (
		<Card>
			<Card.Header>
				<Heading
					isLoading={isLoading || loading}
					level="h4"
					title={`Pengguna Peran ${role?.role.title ?? ""}`}
				/>
			</Card.Header>
			<DataTable<Employee>
				isLoading={loading}
				error={error?.message}
				columns={columns}
				rows={employees ?? []}
			/>
		</Card>
	);
};

export default RoleUser;
