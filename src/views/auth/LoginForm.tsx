"use client";

import Button from "@/components/atoms/buttons/Button";
import Checkbox from "@/components/atoms/inputs/Checkbox";
import FormControl from "@/components/molecules/forms/FormControl";
import useProfile from "@/controllers/authController";
import useUserController from "@/controllers/userController";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const LoginForm = () => {
	const { useLogin } = useUserController();
	const { mutateProfile } = useProfile({ middleware: "guest" });
	const { register, errors, onLogin, setValue, isSubmitting } =
		useLogin(mutateProfile);

	const [show, setShow] = useState<boolean>(false);

	return (
		<form method="POST" className="space-y-2" onSubmit={onLogin}>
			<FormControl
				required
				label="Email"
				type="email"
				placeholder="account@mail.com"
				{...register("email")}
				error={errors.email?.message}
			/>
			<FormControl
				required
				label="Password"
				type={show ? "text" : "password"}
				placeholder="•••••••••"
				{...register("password")}
				error={errors.password?.message}
				rightIcon={
					show ? (
						<EyeSlashIcon className="h-4 w-4 text-inherit" />
					) : (
						<EyeIcon className="h-4 w-4 text-inherit" />
					)
				}
				onRightClick={() => setShow(!show)}
			/>
			<Checkbox
				name="remember"
				onChange={(e) => setValue("remember", e.target.checked ?? false)}
				label="Remember Me?"
			/>
			<Button
				loader={isSubmitting}
				disabled={isSubmitting}
				full
				type="submit"
				label="Login"
			/>
		</form>
	);
};

export default LoginForm;
