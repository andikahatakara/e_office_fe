"use client";

import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import Button from "@/components/atoms/buttons/Button";
import FormControl from "@/components/molecules/forms/FormControl";
import useProfile from "@/controllers/authController";
import useUserController from "@/controllers/userController";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import AvatarView from "./AvatarView";

const ProfileFormView = () => {
	const [show, setShow] = useState<boolean>(false);

	const { mutateProfile, isLoading, profile } = useProfile({
		middleware: "auth",
	});
	const { useChangePersonalInformation, useChangePassword } =
		useUserController();
	const { errors, onSubmit, onReset, register } = useChangePersonalInformation(
		mutateProfile,
		{
			first_name: profile?.first_name ?? "",
			last_name: profile?.last_name ?? "",
			nip: profile?.nip ?? "",
		}
	);
	const {
		passwordErrors,
		passwordRegister,
		onSubmit: passwordSubmit,
		onReset: passwordReset,
	} = useChangePassword(mutateProfile);

	return (
		<>
			<Card border>
				<Heading
					isLoading={isLoading}
					className="mb-4"
					as="h1"
					level="h4"
					title="Informasi Pribadi"
				/>
				<AvatarView
					src={profile?.avatar_url ?? ""}
					alt={profile?.full_name ?? ""}
					isLoading={isLoading}
					callback={mutateProfile}
				/>
				<form
					method="POST"
					onSubmit={onSubmit}
					onReset={onReset}
					className="space-y-1.5"
				>
					<FormControl
						label="Nama Awalan"
						placeholder="Nama awalan anda"
						required
						error={errors.first_name?.message}
						{...register("first_name")}
					/>
					<FormControl
						label="Nama Akhiran"
						placeholder="Nama akhiran anda"
						required
						error={errors.last_name?.message}
						{...register("last_name")}
					/>
					<FormControl
						label="Nip"
						placeholder="Nip anda"
						required
						error={errors.nip?.message}
						{...register("nip")}
					/>
					<div className="space-x-3 !mt-2.5 ">
						<Button type="submit" label="Update" color="info" />
						<Button type="reset" label="Batal" color="danger" variant="ghost" />
					</div>
				</form>
			</Card>
			<Card border>
				<Heading
					isLoading={isLoading}
					className="mb-4"
					as="h1"
					level="h4"
					title="Kata Sandi dan Keamanan"
				/>
				<form
					className="space-y-1.5"
					onReset={passwordReset}
					onSubmit={passwordSubmit}
				>
					<FormControl
						label="Password Baru"
						placeholder="•••••••••"
						required
						type={show ? "text" : "password"}
						rightIcon={
							show ? (
								<EyeSlashIcon className="input-icon" />
							) : (
								<EyeIcon className="input-icon" />
							)
						}
						onRightClick={() => setShow(!show)}
						error={passwordErrors.password?.message}
						{...passwordRegister("password")}
					/>
					<FormControl
						label="Konfirmasi Password Baru"
						placeholder="•••••••••"
						required
						type={show ? "text" : "password"}
						rightIcon={
							show ? (
								<EyeSlashIcon className="input-icon" />
							) : (
								<EyeIcon className="input-icon" />
							)
						}
						onRightClick={() => setShow(!show)}
						error={passwordErrors.password_confirmation?.message}
						{...passwordRegister("password_confirmation")}
					/>
					<div className="!mt-2.5 space-x-3">
						<Button type="submit" label="Update Password" color="info" />
						<Button type="reset" label="Batal" color="danger" variant="ghost" />
					</div>
				</form>
			</Card>
		</>
	);
};

export default ProfileFormView;
