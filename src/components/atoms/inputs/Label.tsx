"use client";

import React, { LabelHTMLAttributes, useState } from "react";
import RenderIf from "../RenderIf";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	title: string;
	required?: boolean;
	helper?: string;
	tooltip?: string;
}

const Label = ({
	title,
	required = false,
	tooltip,
	helper,
	...props
}: LabelProps) => {
	const [showTooltip, setShowTooltip] = useState<boolean>(false);

	return (
		<label
			className={`mb-2 text-sm font-medium text-gray-900 dark:text-white ${
				tooltip ? "flex space-x-1" : "block"
			}`}
			{...props}
		>
			<span>{title}</span>
			<RenderIf when={helper ? true : false}>{helper}</RenderIf>
			<RenderIf when={required}>
				<span className="text-red-700 text-xs font-normal dark:text-red-500">
					*
				</span>
			</RenderIf>
			<RenderIf when={tooltip}>
				<QuestionMarkCircleIcon
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					className="icon5 !text-gray-950 dark:!text-gray-50  cursor-pointer"
				/>
				<span className="relative">
					<Transition
						show={showTooltip}
						as="div"
						enter="transition ease-out duration-300"
						enterFrom="opacity-0 transform scale-90"
						enterTo="opacity-100 transform scale-100"
						leave="transition ease-in duration-300"
						leaveFrom="opacity-100 transform scale-100"
						leaveTo="opacity-0 transform scale-90"
						className={`absolute z-full bottom-0 w-64 px-4 py-3 mb-1 inline-block text-gray-950 bg-white rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50`}
					>
						<span className="text-sm leading-tight">{tooltip}</span>
					</Transition>
				</span>
			</RenderIf>
		</label>
	);
};

export default Label;
