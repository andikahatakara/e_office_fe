"use client";
import {
  ButtonColorKeys,
  ButtonVariantKeys,
  ghostButtonTheme,
  outlineButtonTheme,
  solidButtonTheme,
} from "@/themes/buttonTheme";
import React, { ButtonHTMLAttributes } from "react";
import Skeleton from "../Skeleton";
import Link from "next/link";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: React.ReactNode;
	variant?: ButtonVariantKeys;
	color?: ButtonColorKeys;
	isLoading?: boolean;
	href?: string;
}

const IconButton = ({
	icon,
	className = "",
	color = "primary",
	variant = "solid",
	disabled,
	isLoading = false,
	href,
	onClick,
	...props
}: IconButtonProps) => {
	const baseButtonStyle: Record<ButtonVariantKeys, string> = {
		solid: solidButtonTheme[color],
		ghost: ghostButtonTheme[color],
		outline: outlineButtonTheme[color],
	};

	return isLoading ? (
		<Skeleton className="h-8 w-8" />
	) : href ? (
		<Link href={href}>
			<button
				disabled={disabled}
				className={`btn-icon ${
					disabled ? "opacity-50 hover:opacity-50 cursor-not-allowed" : ""
				} ${baseButtonStyle[variant]} ${className}`}
				{...props}
			>
				{icon}
			</button>
		</Link>
	) : (
		<button
			disabled={disabled}
			className={`btn-icon ${
				disabled ? "opacity-50 hover:opacity-50 cursor-not-allowed" : ""
			} ${baseButtonStyle[variant]} ${className}`}
			onClick={onClick}
			{...props}
		>
			{icon}
		</button>
	);
};

export default IconButton;
