"use client";
import Alert from "@/components/atoms/Alert";
import BackButton from "@/components/atoms/BackButton";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import DetailItem from "@/components/atoms/DetailItem";
import Heading from "@/components/atoms/Heading";
import RenderIf from "@/components/atoms/RenderIf";
import Toggle from "@/components/atoms/Toggle";
import DataTable from "@/components/molecules/tables/DataTable";
import usePermissionController from "@/controllers/permissionController";
import useRoleController from "@/controllers/roleController";
import { useAppSelector } from "@/redux/hooks";
import { Permission } from "@/types/roleType";
import { dateFormater } from "@/utils/globalUtil";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import RoleUser from "./RoleUser";

const RoleShowView = ({ id }: { id: string }) => {
	const { permissions: cans } = useAppSelector((state) => state.user);
	const { useShow, syncRoleAndPermission } = useRoleController();
	const { useIndex } = usePermissionController();
	const { data: role, isLoading, error, mutate } = useShow(id);
	const {
		data: permissions,
		isLoading: permissionLoading,
		error: permissionError,
	} = useIndex();

	const createColumn = createColumnHelper<Permission>();

	const columns = [
		createColumn.display({
			header: "#",
			cell: ({ row: { index } }) => index + 1,
		}),
		createColumn.accessor("title", {
			header: "Hak Akses",
		}),
		createColumn.display({
			header: "Status",
			cell: ({
				row: {
					original: { name },
				},
			}) =>
				role?.hasPermissions[name] ? (
					<Badge variant="outline" value="Ya" color="success" />
				) : (
					<Badge variant="outline" value="Tidak" color="danger" />
				),
		}),
	];

	if (cans && cans["roles.sync.permission"]) {
		const column = createColumn.display({
			header: "Aksi",
			cell: ({
				row: {
					original: { name, id },
				},
			}) => (
				<div className="flex items-center justify-center">
					<Toggle
						title={name}
						onChange={() =>
							syncRoleAndPermission(role?.role.id ?? "", id, mutate)
						}
						checked={role?.hasPermissions[name] ?? false}
					/>
				</div>
			),
		});
		columns.push(column);
	}

	return (
		<div className="space-y-4 lg:space-y-4">
			<RenderIf when={(isLoading && !error) || role ? true : false}>
				<Card>
					<Card.Header>
						<Heading
							isLoading={isLoading}
							level="h3"
							title={`Detail ${role?.role.title ?? ""}`}
						/>
						<BackButton isLoading={isLoading} />
					</Card.Header>

					<div className="space-y-1 5">
						<DetailItem
							title="Nama Peran"
							value={role?.role.title ?? ""}
							isLoading={isLoading}
						/>
						<DetailItem
							title="Tanggal Dibuat"
							value={role ? dateFormater(role.role.created_at) : ""}
							isLoading={isLoading}
						/>
						<DetailItem
							title="Jumlah Pengguna"
							value={`${(role && `${role.role.users.length}`) ?? "0"} Penguna`}
							isLoading={isLoading}
						/>
						<DetailItem
							title="Hak Akses"
							value={`${
								(role && `${Object.keys(role.hasPermissions).length ?? 0}`) ??
								"0"
							} Hak Akses`}
							isLoading={isLoading}
						/>
					</div>
				</Card>
				<Card>
					<Card.Header>
						<Heading
							level="h4"
							as="h2"
							isLoading={permissionLoading || isLoading}
							title={`Hak Akses Peran  ${role?.role.title} `}
						/>
					</Card.Header>
					<DataTable<Permission>
						isLoading={permissionLoading || isLoading}
						error={permissionError?.message}
						rows={permissions ?? []}
						columns={columns}
					/>
				</Card>
				<RoleUser
					mutate={mutate}
					cans={cans}
					role={role}
					isLoading={isLoading}
				/>
			</RenderIf>
			<RenderIf when={error?.message}>
				<Alert type="danger" message={error?.message ?? ""} />
			</RenderIf>
		</div>
	);
};

export default RoleShowView;
