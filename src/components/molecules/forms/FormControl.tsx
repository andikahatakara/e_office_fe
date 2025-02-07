/* eslint-disable react/display-name */
"use client";

import RenderIf from "@/components/atoms/RenderIf";
import Skeleton from "@/components/atoms/Skeleton";
import Field from "@/components/atoms/inputs/Field";
import Label from "@/components/atoms/inputs/Label";
import { FormControlProps } from "@/types/inputTypes";
import { forwardRef } from "react";

const FormControl = forwardRef<HTMLInputElement, FormControlProps>(
	(
		{
			label,
			state = "default",
			error = "",
			helptext = "",
			required,
			id,
			name,
			leftIcon,
			rightIcon,
			leftElement,
			rightElement,
			onLeftClick,
			onRightClick,
			helper,
			isLoading,
			...props
		},
		_ref
	) => {
		const inputStyle: Record<string, string> = {
			left: "pl-10",
			right: "pl-10",
			both: "px-10",
			default: "",
		};

		return isLoading ? (
			<div className="space-y-2">
				<Skeleton className="h-3 w-32" />
				<Skeleton className="h-10 w-full" />
			</div>
		) : (
			<div className="space-y-2">
				<Label
					htmlFor={id ?? name}
					title={label}
					helper={helper}
					required={required}
				/>
				<div
					className={`${
						leftIcon || rightIcon
							? "relative"
							: rightElement || leftElement
							? "flex"
							: ""
					}`}
				>
					{/* Render when left icon */}
					<RenderIf when={leftIcon ? true : false}>
						<div
							onClick={onLeftClick}
							className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
								onLeftClick ? "cursor-pointer" : "pointer-events-none"
							}`}
						>
							{leftIcon}
						</div>
					</RenderIf>
					{/* Render when right icon */}
					<RenderIf when={rightIcon ? true : false}>
						<div
							onClick={onRightClick}
							className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
								onRightClick ? "cursor-pointer" : "pointer-events-none"
							}`}
						>
							{rightIcon}
						</div>
					</RenderIf>
					{/* Render when left element */}
					<Field
						state={error ? "error" : state}
						name={name}
						id={id ?? name}
						ref={_ref}
						{...props}
					/>
				</div>
				<RenderIf when={(error && helptext) || (error && !helptext)}>
					<span className="input-error-message">{error}</span>
				</RenderIf>

				<RenderIf when={helptext && !error}>
					<span className="text-gray-900 dark:text-gray-50 text-xs">
						{helptext}
					</span>
				</RenderIf>
			</div>
		);
	}
);

export default FormControl;
