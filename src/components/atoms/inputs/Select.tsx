"use client";

import { SelectProps } from "@/types/inputTypes";
import { forwardRef } from "react";
import RenderIf from "../RenderIf";
import Label from "./Label";
import Skeleton from "../Skeleton";
import { getOptionLabel, getOptionValue } from "@/utils/selectUtil";

// eslint-disable-next-line react/display-name
const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(
		{
			label,
			required,
			id,
			state = "default",
			name,
			className = "",
			disabled,
			options,
			optionValue = "id",
			display = "name",
			displayFn,
			error,
			useDefaultOption = true,
			isLoading,
			...props
		}: SelectProps,
		_ref
	) => {
		const inputStateStyles: Record<string, string> = {
			default: "input-default",
			error: "input-error",
			success: "input-success",
			disabled: "input-disabled",
		};

		const baseInputStyle = disabled
			? inputStateStyles["disabled"]
			: inputStateStyles[error ? "error" : state];

		return isLoading ? (
			<div className="space-y-2">
				<Skeleton className="h-3 w-32" />
				<Skeleton className="h-10 w-full" />
			</div>
		) : (
			<div>
				<RenderIf when={label ? true : false}>
					<Label title={label ?? ""} required={required} htmlFor={id ?? name} />
				</RenderIf>
				<select
					ref={_ref}
					disabled={disabled}
					className={`input w-full ${baseInputStyle} ${className}`}
					id={id ?? name}
					name={name}
					{...props}
				>
					<RenderIf when={useDefaultOption}>
						<option value="">-- Pilih Salah Satu ---</option>
					</RenderIf>
					{options.map((option, key) => (
						<option
							key={`${name}-${key}`}
							value={getOptionValue(optionValue, option)}
						>
							<RenderIf when={!displayFn}>
								{getOptionLabel(display, option)}
							</RenderIf>
							<RenderIf when={displayFn ? true : false}>
								{displayFn && displayFn(option)}
							</RenderIf>
						</option>
					))}
				</select>
				<RenderIf when={error ? true : false}>
					<span className="input-error-message">{error}</span>
				</RenderIf>
			</div>
		);
	}
);

export default Select;
