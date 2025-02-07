"use client";
import { Switch } from "@headlessui/react";
import React, { useState } from "react";

type ToggleProps = {
	onChange: () => void;
	checked: boolean;
	title: string;
};

const Toggle = ({ checked = false, onChange, title }: ToggleProps) => {
	const [enabled, setEnabled] = useState<boolean>(checked);

	const onChecked = (checked: boolean) => {
		onChange();
		setEnabled(checked);
	};

	return (
		<Switch
			checked={checked}
			onChange={onChecked}
			className={`${
				enabled ? "bg-primary-600" : "bg-gray-200"
			} relative inline-flex h-6 w-11 items-center rounded-full`}
		>
			<span className="sr-only">{title}</span>
			<span
				className={`${
					enabled ? "translate-x-6" : "translate-x-1"
				} inline-block h-4 w-4 transform rounded-full bg-white transition`}
			/>
		</Switch>
	);
};

export default Toggle;
