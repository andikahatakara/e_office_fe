"use client";

import BackButton from "@/components/atoms/BackButton";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import Button from "@/components/atoms/buttons/Button";
import FormControl from "@/components/molecules/forms/FormControl";
import useEmployeeController from "@/controllers/employeeController";
import useRedirect from "@/controllers/redirectController";
import React, { useEffect } from "react";

const EmployeeUpdate = ({ id }: { id: number }) => {
	const { redirectStatusCode } = useRedirect();
	const { cans, useFormEmployee, useGetById } = useEmployeeController();
	const { isLoading, data: employee } = useGetById(id);
	const { isSubmitting, register, onReset, onSubmit, errors } =
		useFormEmployee(employee);

	useEffect(() => {
		if (cans && !cans["employees.update"]) {
			redirectStatusCode(403);
		}
	}, [cans, redirectStatusCode]);

	return (
		<Card>
			<Card.Header>
				<Heading
					isLoading={isLoading}
					level="h3"
					title={`Ubah data pegawai ${employee?.user.full_name ?? ""}`}
				/>
				<BackButton can isLoading={isLoading} />
			</Card.Header>
			<form
				className="grid grid-cols-12 gap-2 md:!gap-x-6"
				onReset={onReset}
				onSubmit={onSubmit}
			>
				<div className="col-span-12 md:col-span-6">
					<FormControl
						required
						label="Nama Awal"
						placeholder="Masukan nama awal"
						{...register("first_name")}
						error={errors.first_name?.message}
						isLoading={isLoading}
					/>
				</div>
				<div className="col-span-12 md:col-span-6">
					<FormControl
						required
						label="Nama Akhir"
						placeholder="Masukan nama akhir"
						{...register("last_name")}
						error={errors.last_name?.message}
						isLoading={isLoading}
					/>
				</div>
				<div className="col-span-12 md:col-span-6">
					<FormControl
						required
						label="Email"
						placeholder="Masukan email"
						{...register("email")}
						error={errors.email?.message}
						isLoading={isLoading}
						disabled
					/>
				</div>
				<div className="col-span-12 md:col-span-6">
					<FormControl
						required
						label="Nomor Induk Pegawai"
						placeholder="Masukan nip"
						{...register("nip")}
						error={errors.nip?.message}
						isLoading={isLoading}
					/>
				</div>
				<div className="space-x-3 mt-4 col-span-12">
					<Button isLoading={isLoading} label="Simpan" type="submit" />
					<Button
						isLoading={isLoading}
						label="Reset"
						type="reset"
						color="danger"
						variant="outline"
					/>
				</div>
			</form>
		</Card>
	);
};

export default EmployeeUpdate;
