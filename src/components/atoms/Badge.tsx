"use client";
import {
	BadgeColorKey,
	BadgeVariantKey,
	baseStyle,
	defaultVariants,
	outlineVariants,
	softVariants,
} from "@/themes/badgeTheme";
import React, { HTMLAttributes } from "react";
import RenderIf from "./RenderIf";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariantKey;
	color?: BadgeColorKey;
	value: string;
}

const Badge = ({
	variant = "default",
	color = "default",
	value,
	className,
	...props
}: BadgeProps) => {
	const style: Record<BadgeVariantKey, string> = {
		soft: softVariants[color],
		default: defaultVariants[color],
		outline: "ring-gray-300 dark:ring-gray-700",
	};

	return (
		<span
			{...props}
			className={`${baseStyle} ${style[variant]} ${className ?? ""}`}
		>
			<RenderIf when={variant === "outline" ? true : false}>
				<span
					className={`h-2 w-2 rounded-full mr-2 ${outlineVariants[color]}`}
				/>{" "}
				<span className="text-gray-950 dark:text-white">{value}</span>
			</RenderIf>
			<RenderIf when={variant !== "outline" ? true : false}>{value}</RenderIf>
		</span>
	);
};

export default Badge;
