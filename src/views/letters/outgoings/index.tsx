"use client";
import ActionButton from "@/components/atoms/ActionButton";
import AddButton from "@/components/atoms/AddButton";
import Card from "@/components/atoms/Card";
import DetailItem from "@/components/atoms/DetailItem";
import Heading from "@/components/atoms/Heading";
import RenderIf from "@/components/atoms/RenderIf";
import Select from "@/components/atoms/inputs/Select";
import BasicModal from "@/components/molecules/modals/Basic";
import DataTable from "@/components/molecules/tables/DataTable";
import useOutgoingLetterController from "@/controllers/outgoingLetterController";
import { OutgoingLetter } from "@/types/letterType";
import { dateFormater } from "@/utils/globalUtil";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const OutgoingIndexView = () => {
	const [show, setShow] = useState<string>("month");
	const createColumn = createColumnHelper<OutgoingLetter>();
	const {
		useIndex,
		cans,
		isOpenOutgoingLetterModal,
		outgoing,
		handleCloseModal,
		handleOpenModal,
		shows,
	} = useOutgoingLetterController();
	const { isLoading, error, data: outgoings } = useIndex(show);

	const columns = [
		createColumn.display({
			header: "#",
			cell: ({ row: { index } }) => index + 1,
		}),
		createColumn.accessor("about", {
			header: "Perihal Surat",
		}),
		createColumn.accessor("characteristic", {
			header: "Sifat Surat",
		}),
		createColumn.accessor("number", {
			header: "Nomor Surat",
		}),
		createColumn.accessor("date", {
			header: "Tanggal Surat",
			cell: ({ getValue }) => dateFormater(getValue(), "dddd, DD-MMM-YYYY"),
		}),
	];

	if (
		cans &&
		(cans["outgoing-letters.update"] ||
			cans["outgoing-letters.destroy"] ||
			cans["outgoing-letters.show"])
	) {
		const column = createColumn.display({
			header: "Aksi",
			cell: ({ row: { original } }) => (
				<ActionButton
					click={{ show: () => handleOpenModal(original) }}
					actions={original.actions}
				/>
			),
		});
		columns.push(column);
	}

	return (
		<Card>
			<Card.Header>
				<Heading isLoading={isLoading} level="h3" title="Surat Keluar" />
				<div className="flex space-x-2 items-center">
					<Select
						className="!w-44"
						defaultValue={show}
						options={shows}
						optionValue={"value"}
						display={"display"}
						isLoading={isLoading}
						useDefaultOption={false}
						onChange={(e) => setShow(e.target.value)}
					/>
					<AddButton
						isLoading={isLoading}
						href="/outgoing-letters/create"
						can={(cans && cans["outgoing-letters.store"]) ?? false}
					/>
				</div>
			</Card.Header>
			<DataTable<OutgoingLetter>
				isLoading={isLoading}
				error={error?.message}
				columns={columns}
				rows={outgoings ?? []}
			/>

			<RenderIf when={isOpenOutgoingLetterModal}>
				<BasicModal
					isOpen={isOpenOutgoingLetterModal}
					title="Detail Surat"
					onClose={handleCloseModal}
				>
					<div className="space-y-1 5">
						<DetailItem title="Nomor Surat" value={outgoing?.number ?? ""} />
						<DetailItem title="Perihal Surat" value={outgoing?.about ?? ""} />
						<DetailItem
							title="Sifat Surat"
							value={outgoing?.characteristic ?? ""}
						/>
						<DetailItem
							title="Tanggal Surat"
							value={
								(outgoing &&
									dateFormater(outgoing.date, "dddd, DD MMM YYYY")) ??
								""
							}
						/>
						<DetailItem
							externalUrl
							href={outgoing?.file_url}
							title="File Surat"
							value={outgoing?.file ?? ""}
						/>
					</div>
				</BasicModal>
			</RenderIf>
		</Card>
	);
};

export default OutgoingIndexView;
