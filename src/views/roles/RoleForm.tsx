"use client";
import FormControl from "@/components/molecules/forms/FormControl";
import BasicModal from "@/components/molecules/modals/Basic";
import useRoleController from "@/controllers/roleController";
import React from "react";

const RoleForm = ({ callback }: { callback: () => void }) => {
	const { role, handleCloseForm, useSubmitRoleForm } = useRoleController();
	const { register, onSubmit, onReset, errors } = useSubmitRoleForm(callback);

	return (
		<BasicModal
			title={`${role ? "Ubah" : "Tambah"} Data Peran`}
			asForm
			onClose={handleCloseForm}
			onConfirm={onSubmit}
			onCancel={onReset}
			cancelLabel="Batal"
			confirmLabel={role ? "Ubah" : "Simpan"}
		>
			<FormControl
				label="key"
				helptext="Direkomendasikan mengunakan notasi strip ex: operator-bidang"
				placeholder="Kata kunci peran"
				required
				{...register("name")}
				error={errors.name?.message}
			/>
			<FormControl
				label="Judul"
				placeholder="Judul Peran"
				required
				{...register("title")}
				error={errors.title?.message}
			/>
		</BasicModal>
	);
};

export default RoleForm;
