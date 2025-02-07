"use client";

import FormControl from "@/components/molecules/forms/FormControl";
import BasicModal from "@/components/molecules/modals/Basic";
import usePermissionController from "@/controllers/permissionController";
import React from "react";

const PermissionForm = () => {
	const { handleClosePermissionModal, permission, useSubmitForm } =
		usePermissionController();
	const {
		onReset,
		handleOnSubmit: onSubmit,
		errors,
		register,
	} = useSubmitForm();

	return (
		<BasicModal
			onClose={handleClosePermissionModal}
			confirmLabel={permission ? "Update" : "Simpan"}
			cancelLabel="Batal"
			title={permission ? "Ubah Data" : "Tambah Data"}
			asForm
			onConfirm={onSubmit}
			onCancel={onReset}
		>
			<FormControl
				error={errors.name?.message}
				{...register("name")}
				placeholder="Kunci Hak Akses"
				label="Key"
				required
			/>
			<FormControl
				error={errors.title?.message}
				{...register("title")}
				placeholder="Judul Hak Akses"
				label="Judul"
				required
			/>
		</BasicModal>
	);
};

export default PermissionForm;
