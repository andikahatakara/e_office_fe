"use client";
import { InputFiledProps } from "@/types/inputTypes";
import React, { forwardRef } from "react";

const inputStateStyles: Record<string, string> = {
  default: "input-default",
  error: "input-error",
  success: "input-success",
  disabled: "input-disabled",
};

// eslint-disable-next-line react/display-name
const Field = forwardRef<HTMLInputElement, InputFiledProps>(
	(
		{
			className = "",
			onChange,
			name,
			id,
			state = "default",
			disabled,
			readOnly,
			type,
			...props
		},
		_ref
	) => {
		const baseInputStyle =
			disabled || readOnly
				? inputStateStyles["disabled"]
				: inputStateStyles[state];

		return (
			<input
				type={type}
				ref={_ref}
				id={id ?? name}
				onChange={onChange}
				name={name}
				className={`input ${
					type === "file" ? "input-file" : ""
				} ${baseInputStyle} ${className} `}
				disabled={disabled}
				readOnly={readOnly}
				{...props}
			/>
		);
	}
);

export default Field;
