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
import RenderIf from "../RenderIf";
import Loader from "../Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	full?: boolean;
	variant?: ButtonVariantKeys;
	color?: ButtonColorKeys;
	isLoading?: boolean;
	loader?: boolean;
}

const Button = ({
	children,
	label,
	className = "",
	type = "button",
	color = "primary",
	variant = "solid",
	full,
	isLoading = false,
	loader,
	...props
}: ButtonProps) => {
	const baseButtonStyle: Record<ButtonVariantKeys, string> = {
		solid: solidButtonTheme[color],
		ghost: ghostButtonTheme[color],
		outline: outlineButtonTheme[color],
	};

	return isLoading ? (
		<Skeleton className="h-10 w-16" />
	) : (
		<button
			type={type}
			className={`btn ${baseButtonStyle[variant]} ${
				full ? "w-full" : "w-fit"
			} `}
			{...props}
		>
			<RenderIf when={loader}>
				<Loader /> <span>Loading...</span>
			</RenderIf>
			<RenderIf when={!loader}>
				{label}
				{children}
			</RenderIf>
		</button>
	);
};

export default Button;
