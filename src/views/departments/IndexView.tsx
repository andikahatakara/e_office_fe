"use client";
import AddButton from "@/components/atoms/AddButton";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Color from "@/components/atoms/Color";
import Heading from "@/components/atoms/Heading";
import DataTable from "@/components/molecules/tables/DataTable";
import useDepartmentController from "@/controllers/departmentController";
import { BadgeColorKey } from "@/themes/badgeTheme";
import { DepartmentWithSub } from "@/types/departmentType";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import Subs from "./Subs";
import ActionButton from "@/components/atoms/ActionButton";

const DepartmentIndex = () => {
	const { useIndex, cans } = useDepartmentController();
	const { data, isLoading, error, mutate } = useIndex();

	const createColumn = createColumnHelper<DepartmentWithSub>();

	const columns = [
		createColumn.display({
			header: "#",
			cell: ({ row: { index } }) => index + 1,
		}),
		createColumn.accessor("name", {
			header: "Nama",
			cell: ({
				row: {
					original: { color, name },
				},
			}) => <Badge color={color as BadgeColorKey} value={name} />,
		}),
		createColumn.accessor("level", {
			header: "Level",
		}),
		createColumn.display({
			header: "Sub Bagian / Bidang",
			cell: ({
				row: {
					original: { subs },
				},
			}) => <Subs subs={subs} />,
		}),
	];

	if (cans && (cans["deparments.update"] || cans["deparments.destroy"])) {
		columns.push(
			createColumn.display({
				header: "Aksi",
				cell: ({ row: { original } }) => (
					<ActionButton actions={original.actions} />
				),
			})
		);
	}

	return (
		<Card>
			<Card.Header>
				<Heading isLoading={isLoading} level="h4" title="Struktur Organisasi" />
				<AddButton
					can={(cans && cans["departments.store"]) ?? false}
					isLoading={isLoading}
				/>
			</Card.Header>
			<DataTable<DepartmentWithSub>
				isLoading={isLoading}
				error={error?.message}
				rows={data ?? []}
				columns={columns}
			/>
		</Card>
	);
};

export default DepartmentIndex;
