"use client";

import Button from "@/components/atoms/buttons/Button";
import FormControl from "@/components/molecules/forms/FormControl";
import useOutgoingLetterController from "@/controllers/outgoingLetterController";
import { OutgoingLetter } from "@/types/letterType";
import React from "react";

type OutgoingFormProps = {
	isLoading?: boolean;
	outgoing?: OutgoingLetter;
};

function OutgoingForm({ isLoading, outgoing }: OutgoingFormProps) {
	const { useOutgoingForm } = useOutgoingLetterController();
	const { register, errors, onReset, handleChooseFile, onSubmit } =
		useOutgoingForm(outgoing);

	return (
		<form className="space-y-1.5" onSubmit={onSubmit} onReset={onReset}>
			<FormControl
				label="Nomor Surat"
				required
				placeholder="Masukan nomor surat"
				{...register("number")}
				error={errors.number?.message}
				isLoading={isLoading}
			/>
			<FormControl
				label="Perihal Surat"
				required
				placeholder="Masukan perihal surat"
				{...register("about")}
				error={errors.about?.message}
				isLoading={isLoading}
			/>
			<FormControl
				label="Sifat Surat"
				required
				placeholder="Masukan sifat surat"
				{...register("characteristic")}
				error={errors.characteristic?.message}
				isLoading={isLoading}
			/>
			<FormControl
				type="date"
				label="Tangal Surat"
				required
				placeholder="Masukan tanggal surat"
				{...register("date")}
				error={errors.date?.message}
				isLoading={isLoading}
			/>
			<FormControl
				type="file"
				label="File Surat"
				required
				placeholder="Masukan tanggal surat"
				onChange={handleChooseFile}
				error={errors.file?.message}
				isLoading={isLoading}
				helptext="Harus berupa PDF"
			/>
			<div className="flex items-center space-x-3 !mt-4">
				<Button label="Simpan" type="submit" isLoading={isLoading} />
				<Button
					label="Reset"
					type="reset"
					variant="outline"
					color="danger"
					isLoading={isLoading}
				/>
			</div>
		</form>
	);
}

export default OutgoingForm;
