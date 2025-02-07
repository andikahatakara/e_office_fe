"use client";
import ActionButton from "@/components/atoms/ActionButton";
import ActionLink from "@/components/atoms/ActionLink";
import AddButton from "@/components/atoms/AddButton";
import Alert from "@/components/atoms/Alert";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import RenderIf from "@/components/atoms/RenderIf";
import Select from "@/components/atoms/inputs/Select";
import FormControl from "@/components/molecules/forms/FormControl";
import BasicModal from "@/components/molecules/modals/Basic";
import DataTable from "@/components/molecules/tables/DataTable";
import useDispoitionController from "@/controllers/dispositionController";
import useIncomingLetterController from "@/controllers/incomingLetterController";
import { setOpenIncomingLetterModal } from "@/redux/features/incomingLetterSlice";
import { useAppDispatch } from "@/redux/hooks";
import { SelectOptionData } from "@/types/inputTypes";
import { IncomingLetter } from "@/types/letterType";
import { getColorEmployee } from "@/utils/employeeUtli";
import { dateFormater } from "@/utils/globalUtil";
import { getOptionLabel } from "@/utils/selectUtil";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const IncomingIndexView = () => {
	const [show, setShow] = useState<string>("month");
	const {
		cans,
		shows,
		useIndex,
		onOpenDispositionModal,
		onCloseDispositionModal,
		isOpenIncomingLetterModal,
		departments,
		incoming,
	} = useIncomingLetterController();

	// fecth data with swr
	const { isLoading, error, data: letters } = useIndex(show);

	// call helper for create columns for incoming letter
	const createColumn = createColumnHelper<IncomingLetter>();

	// define incoming columns table
	const columns = [
		createColumn.display({
			header: "#",
			cell: ({ row: { index } }) => index + 1,
		}),
		createColumn.accessor("number", {
			header: "Nomor Surat",
			cell: ({
				getValue,
				row: {
					original: { id },
				},
			}) => (
				<ActionLink
					title={getValue()}
					href={`/incoming-letters/show/${id}`}
					can
				/>
			),
		}),
		createColumn.accessor("from", {
			header: "Dari",
		}),
		createColumn.accessor("date", {
			header: "Tanggal Surat",
			cell: ({ cell: { getValue } }) =>
				dateFormater(getValue(), "dddd,DD-MMM-YYYY"),
		}),
		createColumn.accessor("about", {
			header: "Perihal Surat",
		}),
		createColumn.accessor("characteristic", {
			header: "Sifat Surat",
		}),
		createColumn.accessor("employee.employeeable.name", {
			header: "Ditujukan Ke",
			cell: ({
				row: {
					original: {
						employee: {
							employeeable,
							user: { full_name },
						},
					},
				},
				cell: { getValue },
			}) => (
				<Badge
					color={getColorEmployee(employeeable)}
					value={`${getValue()}(${full_name})`}
				/>
			),
		}),
		createColumn.accessor("actions", {
			header: "Aksi",
			cell: ({ cell: { getValue }, row: { original } }) => (
				<ActionButton
					actions={getValue()}
					click={{
						disposition: () => onOpenDispositionModal(original),
					}}
				/>
			),
		}),
	];

	const { useDispositionForm } = useDispoitionController();

	const { onSubmit, register, errors } = useDispositionForm(
		incoming?.id ?? 0,
		onCloseDispositionModal
	);

	const displayFn = (department: SelectOptionData) => {
		const display = `${getOptionLabel("name", department)} (${getOptionLabel(
			["employee", "user", "full_name"],
			department
		)})`;
		return display;
	};

	return (
		<Card>
			<Card.Header>
				<Heading isLoading={isLoading} level="h3" title="Data Surat Masuk" />
				<div className="flex items-center space-x-2">
					<Select
						className="!w-40"
						defaultValue={show}
						onChange={(e) => setShow(e.target.value)}
						isLoading={isLoading}
						useDefaultOption={false}
						options={shows}
						optionValue={"value"}
						display={"display"}
					/>
					<AddButton
						isLoading={isLoading}
						href="/incoming-letters/create"
						can={(cans && cans["incoming-letters.store"]) ?? false}
					/>
				</div>
			</Card.Header>
			<RenderIf when={isLoading || letters ? true : false}>
				<DataTable<IncomingLetter>
					isLoading={isLoading}
					columns={columns}
					error={error?.message}
					rows={letters ?? []}
				/>
			</RenderIf>
			<RenderIf when={error ? true : false}>
				<Alert type="danger" message={error?.message} />
			</RenderIf>
			<RenderIf when={isOpenIncomingLetterModal}>
				<BasicModal
					isOpen={isOpenIncomingLetterModal}
					title="Disposisi Surat"
					onClose={onCloseDispositionModal}
					asForm
					confirmLabel="Simpan"
					cancelLabel="Batal"
					onCancel={onCloseDispositionModal}
					onConfirm={onSubmit}
				>
					<Select
						options={departments as []}
						label="Pilih Bidang"
						required
						{...register("department_id")}
						error={errors.department_id?.message}
						displayFn={displayFn}
						optionValue={["employee", "user_id"]}
					/>
					<FormControl
						label="Catatan"
						helper="(Opsional)"
						placeholder="Masukan Catatan"
						{...register("note")}
						error={errors.note?.message}
					/>
				</BasicModal>
			</RenderIf>
		</Card>
	);
};

export default IncomingIndexView;
