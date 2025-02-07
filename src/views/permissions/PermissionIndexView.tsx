"use client";

import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import IconButton from "@/components/atoms/buttons/IconButton";
import DataTable from "@/components/molecules/tables/DataTable";
import usePermissionController from "@/controllers/permissionController";
import { Permission } from "@/types/roleType";
import { dateFormater } from "@/utils/globalUtil";
import { PlusIcon } from "@heroicons/react/24/solid";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import PermissionForm from "./PermissionForm";
import RenderIf from "@/components/atoms/RenderIf";
import { useAppSelector } from "@/redux/hooks";
import ActionButton from "@/components/atoms/ActionButton";

const PermissionIndexView = () => {
	const { useIndex, isOpenPermissionModal, handleOpenPermissionModal } =
		usePermissionController();
	const { data: permissions, isLoading, error } = useIndex();
	const { permissions: cans } = useAppSelector((state) => state.user);

	const createColumn = createColumnHelper<Permission>();

	const columns = [
		createColumn.display({
			header: "#",
			cell: ({ row: { index } }) => index + 1,
		}),
		createColumn.accessor("title", {
			header: "Hak Akses",
		}),
		createColumn.accessor("name", {
			header: "Key",
		}),
		createColumn.accessor("created_at", {
			header: "Tanggal Di Buat",
			cell: ({ cell: { getValue } }) => dateFormater(getValue()),
		}),
	];

	if (cans && (cans["permissions.store"] || cans["permissions.destroy"])) {
		const column = createColumn.display({
			header: "Aksi",
			cell: ({ row: { original } }) => (
				<ActionButton
					click={{ update: () => handleOpenPermissionModal(original) }}
					actions={original.actions}
				/>
			),
		});
		columns.push(column);
	}

	return (
		<Card>
			<Card.Header>
				<Heading isLoading={isLoading} level="h3" title="Data Hak Akses" />
				<IconButton
					isLoading={isLoading}
					icon={<PlusIcon className="icon5" />}
					onClick={() => handleOpenPermissionModal()}
				/>
			</Card.Header>
			<DataTable<Permission>
				isLoading={isLoading}
				error={error?.message}
				rows={permissions ?? []}
				columns={columns}
			/>
			<RenderIf when={isOpenPermissionModal}>
				<PermissionForm />
			</RenderIf>
		</Card>
	);
};

export default PermissionIndexView;
