"use client";
import Button from "@/components/atoms/buttons/Button";
import Select from "@/components/atoms/inputs/Select";
import FormControl from "@/components/molecules/forms/FormControl";
import useEmployeeController from "@/controllers/employeeController";
import useIncomingLetterController from "@/controllers/incomingLetterController";
import { SelectOptionData } from "@/types/inputTypes";
import { IncomingLetter } from "@/types/letterType";
import { getOptionLabel } from "@/utils/selectUtil";

type IncomingFormProps = {
	incoming?: IncomingLetter;
	loading?: boolean;
};

const IncomingForm = ({ incoming, loading }: IncomingFormProps) => {
	const { useGetHeadEmployee } = useEmployeeController();
	const { useIncomingForm } = useIncomingLetterController();
	const { data } = useGetHeadEmployee();
	const {
		errors,
		isSubmitting,
		onReset,
		onSubmit,
		register,
		fileRef,
		handleChooseFile,
	} = useIncomingForm(incoming);
	const displayFn = (employee: SelectOptionData) =>
		`${getOptionLabel(["employeeable", "name"], employee)}(${getOptionLabel(
			["user", "full_name"],
			employee
		)})`;

	return (
		<form onSubmit={onSubmit} className="space-y-1.5">
			<FormControl
				isLoading={loading}
				required
				placeholder="Masukan pengirim surat"
				label="Pengirim Surat"
				error={errors.from?.message}
				{...register("from")}
			/>
			<FormControl
				isLoading={loading}
				required
				placeholder="Masukan nomor surat"
				label="Nomor Surat"
				error={errors.number?.message}
				{...register("number")}
			/>
			<FormControl
				isLoading={loading}
				required
				type="date"
				placeholder="Masukan tanggal surat"
				label="Tanggal Surat"
				error={errors.date?.message}
				{...register("date")}
			/>
			<FormControl
				isLoading={loading}
				required
				placeholder="Masukan perihal surat"
				label="Perihal"
				error={errors.about?.message}
				{...register("about")}
			/>
			<FormControl
				isLoading={loading}
				required
				placeholder="Masukan sifat surat"
				label="Sifat"
				error={errors.characteristic?.message}
				{...register("characteristic")}
			/>
			<Select
				required
				isLoading={loading}
				options={(data as []) ?? []}
				optionValue={"user_id"}
				label="Ditujukan"
				displayFn={displayFn}
				error={errors.to?.message}
				{...register("to")}
			/>
			<FormControl
				helptext="File surat dalam bentu PDF"
				type="file"
				isLoading={loading}
				required
				placeholder="File Surat"
				label="File Surat"
				ref={fileRef}
				error={errors.file?.message}
				onChange={handleChooseFile}
			/>
			<div className="space-x-3 !mt-2 inline-flex">
				<Button
					disabled={isSubmitting}
					loader={isSubmitting}
					label="Simpan"
					type="submit"
					isLoading={loading}
				/>
				<Button
					isLoading={loading}
					label="Reset"
					variant="outline"
					color="danger"
					onClick={() => onReset()}
				/>
			</div>
		</form>
	);
};

export default IncomingForm;
