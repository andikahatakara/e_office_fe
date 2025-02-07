"use client";
import Alert from "@/components/atoms/Alert";
import BackButton from "@/components/atoms/BackButton";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import Button from "@/components/atoms/buttons/Button";
import Checkbox from "@/components/atoms/inputs/Checkbox";
import Select from "@/components/atoms/inputs/Select";
import FormControl from "@/components/molecules/forms/FormControl";
import useEmployeeController from "@/controllers/employeeController";
import useRedirect from "@/controllers/redirectController";
import { employeeDepartments } from "@/services/employeeService";
import { DepartmentWithSub } from "@/types/departmentType";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const EmployeeCreate = () => {
	const { cans, useDepartments, useFormEmployee, positions } =
		useEmployeeController();
	const { register, errors, onReset, onSubmit, watch, control, resetField } =
		useFormEmployee();
	const { departments } = useDepartments();
	const { redirectStatusCode } = useRedirect();

	const [data, setData] = useState<DepartmentWithSub[] | []>(departments);

	const handleChangePosition = async (e: ChangeEvent<HTMLSelectElement>) => {
		resetField("department_id");
		const { data } = await employeeDepartments({ position: e.target.value });
		setData(data);
	};

	useEffect(() => {
		if (cans && !cans["employees.store"]) {
			redirectStatusCode(403);
		}
	}, [cans, redirectStatusCode]);

	return (
		<Card>
			<Card.Header>
				<Heading level="h3" title="Tambah Data Pegawai" />
				<BackButton />
			</Card.Header>
			<Alert
				type="info"
				message="Password akan otomatis terkirim ke email yang diinput"
			/>
			<form
				className="grid grid-cols-12 gap-2 mt-2 md:!gap-x-6"
				onReset={() => onReset()}
				onSubmit={onSubmit}
			>
				<div className="col-span-12 md:col-span-6">
					<FormControl
						required
						label="Nama Awal"
						placeholder="Masukan nama awal"
						{...register("first_name")}
						error={errors.first_name?.message}
					/>
				</div>
				<div className="col-span-12 md:col-span-6">
					<FormControl
						required
						label="Nama Akhir"
						placeholder="Masukan nama akhir"
						{...register("last_name")}
						error={errors.last_name?.message}
					/>
				</div>
				<div className="col-span-12 md:col-span-6">
					<FormControl
						required
						label="Email"
						placeholder="Masukan email"
						{...register("email")}
						error={errors.email?.message}
					/>
				</div>
				<div className="col-span-12 md:col-span-6">
					<FormControl
						required
						label="Nomor Induk Pegawai"
						placeholder="Masukan nip"
						{...register("nip")}
						error={errors.nip?.message}
					/>
				</div>
				<div className="col-span-12 md:col-span-6">
					<Controller
						name="position"
						control={control}
						render={({ field: { onChange, onBlur, name } }) => (
							<Select
								required
								options={positions as []}
								display="display"
								optionValue={"value"}
								label="Jabatan"
								onChange={(e) => {
									handleChangePosition(e);
									onChange(e);
								}}
								onBlur={onBlur}
								name={name}
								error={errors.position?.message}
							/>
						)}
					/>
				</div>
				<div className="col-span-12 md:col-span-6">
					{watch("position") && (
						<Select
							required
							options={data as []}
							display="name"
							optionValue={"id"}
							label="Bidang"
							{...register("department_id")}
							error={errors.department_id?.message}
						/>
					)}
				</div>
				<div className="space-x-3 mt-4 col-span-12">
					<Button label="Simpan" type="submit" />
					<Button label="Reset" type="reset" color="danger" variant="outline" />
				</div>
			</form>
		</Card>
	);
};

export default EmployeeCreate;
