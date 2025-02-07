"use client";

import { alertStyles } from "@/themes/alertTheme";
import { ColorKeys } from "@/types/themeTypes";
import {
	BellIcon,
	CheckBadgeIcon,
	ExclamationCircleIcon,
	ExclamationTriangleIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/solid";
import React, { ReactNode } from "react";

type AlertProps = {
	type?: ColorKeys;
	message: string;
};

const Alert = ({ type = "default", message }: AlertProps) => {
	const icon: Record<ColorKeys, ReactNode> = {
		default: <BellIcon className="icon5" />,
		danger: <ExclamationCircleIcon className="icon5" />,
		info: <InformationCircleIcon className="icon5" />,
		primary: <InformationCircleIcon className="icon5" />,
		secondary: <BellIcon className="icon5" />,
		success: <CheckBadgeIcon className="icon5" />,
		warning: <ExclamationTriangleIcon className="icon5" />,
	};

	return (
		<div className={`alert ${alertStyles[type]}`}>
			{icon[type]}
			<span>{message}</span>
		</div>
	);
};

export default Alert;
