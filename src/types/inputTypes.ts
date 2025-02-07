import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFiledProps extends InputHTMLAttributes<HTMLInputElement> {
	state?: "default" | "success" | "error";
	tooltip?: string;
}

interface FormControlProps extends InputFiledProps {
	label: string;
	error?: string;
	helptext?: string;
	register?: UseFormRegister<any>;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	leftElement?: ReactNode;
	rightElement?: ReactNode;
	onLeftClick?: () => void;
	onRightClick?: () => void;
	helper?: string;
	isLoading?: boolean;
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	tooltip?: string;
}

interface SelectOptionData {
	[x: string | number]: string | number;
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	state?: "default" | "success" | "error";
	register?: UseFormRegister<any>;
	label?: string;
	display?: string | string[];
	optionValue?: string | string[];
	options: SelectOptionData[];
	tooltip?: string;
	error?: string;
	useDefaultOption?: boolean;
	isLoading?: boolean;
	displayFn?: (option: SelectOptionData) => string;
}

interface SearcInputProps extends InputFiledProps {
	onReset?: () => void;
}

export type {
	InputFiledProps,
	FormControlProps,
	CheckboxProps,
	SelectProps,
	SearcInputProps,
	SelectOptionData,
};

