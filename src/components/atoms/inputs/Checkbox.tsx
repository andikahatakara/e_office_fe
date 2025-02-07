"use client";
import React, { forwardRef } from "react";
import Label from "./Label";
import { CheckboxProps } from "@/types/inputTypes";

// eslint-disable-next-line react/display-name
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, id, name, tooltip, ...props }: CheckboxProps, _ref) => {
		return (
			<div className="flex items-center space-x-3">
				<input
					className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					type="checkbox"
					id={id ?? name}
					name={name}
					{...props}
				/>
				<Label
					htmlFor={id ?? name}
					title={label}
					tooltip={tooltip}
					className="text-sm font-medium text-gray-950 dark:text-gray-300 flex"
				/>
			</div>
		);
	}
);

export default Checkbox;
