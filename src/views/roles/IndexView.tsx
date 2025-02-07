"use client";

import ActionButton from "@/components/atoms/ActionButton";
import ActionLink from "@/components/atoms/ActionLink";
import AddButton from "@/components/atoms/AddButton";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import DataTable from "@/components/molecules/tables/DataTable";
import useRoleController from "@/controllers/roleController";
import { useAppSelector } from "@/redux/hooks";
import { IRole } from "@/types/roleType";
import { dateFormater } from "@/utils/globalUtil";
import { createColumnHelper } from "@tanstack/react-table";
import RoleForm from "./RoleForm";
import RenderIf from "@/components/atoms/RenderIf";

const IndexView = () => {
	const { permissions: cans } = useAppSelector((state) => state.user);
	const { useIndex, handleOpenForm, isOpenRoleModal } = useRoleController();
	const { data: roles, error, isLoading, mutate } = useIndex();

	const createColumn = createColumnHelper<IRole>();

	const columns = [
		createColumn.display({
			header: "#",
			cell: ({ row: { index } }) => index + 1,
		}),
		createColumn.accessor("title", {
			header: "Nama Peran",
			cell: ({
				row: {
					original: { id },
				},
				cell: { getValue },
			}) => (
				<ActionLink
					href={`roles/${id}`}
					title={getValue()}
					can={(cans && cans["roles.show"]) ?? false}
				/>
			),
		}),
		createColumn.accessor("guard_name", {
			header: "Guard",
		}),
		createColumn.display({
			header: "Tanggal Dibuat",
			cell: ({ row: { original } }) => dateFormater(original.created_at),
		}),
	];

	if (cans && (cans["roles.update"] || cans["roles.delete"])) {
		const column = createColumn.display({
			header: "Aksi",
			cell: ({ row: { original } }) => (
				<ActionButton
					click={{ update: () => handleOpenForm(original) }}
					actions={original.actions}
				/>
			),
		});

		columns.push(column);
	}

	return (
		<Card>
			<Card.Header>
				<Heading isLoading={isLoading} level="h3" title="Data Peran" />
				<AddButton
					isLoading={isLoading}
					onClick={() => handleOpenForm()}
					can={(cans && cans["roles.store"]) ?? false}
				/>
			</Card.Header>
			<DataTable<IRole>
				error={error?.message}
				isLoading={isLoading}
				rows={roles ?? []}
				columns={columns}
			/>
			<RenderIf when={isOpenRoleModal}>
				<RoleForm callback={mutate} />
			</RenderIf>
		</Card>
	);
};

export default IndexView;
