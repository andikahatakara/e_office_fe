"use client";
import { colorScheme } from "@/themes/colorTheme";
import { ColorKeys } from "@/types/themeTypes";
import React from "react";

const Color = ({ color }: { color: string }) => {
	return (
		<div className={`${colorScheme[color as ColorKeys]} rounded-lg h-8 w-8 `} />
	);
};

export default Color;
