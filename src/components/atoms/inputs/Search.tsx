"use client";

import { SearcInputProps } from "@/types/inputTypes";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";
import Field from "./Field";
import RenderIf from "../RenderIf";

// eslint-disable-next-line react/display-name
const Search = forwardRef<HTMLInputElement, SearcInputProps>(
	(
		{
			placeholder = "Search ...",
			onReset = undefined,
			className = "",
			state = "default",
			...props
		}: SearcInputProps,
		_ref
	) => {
		return (
			<div className="relative">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
				</div>
				<Field
					ref={_ref}
					placeholder={placeholder}
					className={`pl-10 ${className}`}
					state={state}
					{...props}
				/>
				<RenderIf when={onReset ? true : false}>
					<div
						onClick={() => onReset && onReset()}
						className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
					>
						<XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
					</div>
				</RenderIf>
			</div>
		);
	}
);

export default Search;
