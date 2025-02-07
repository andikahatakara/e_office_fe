import { ColorKeys } from "@/types/themeTypes";

const alertStyles: Record<ColorKeys, string> = {
	primary:
		"bg-primary-50 !text-primary-700 dark:bg-gray-700 dark:!text-primary-400",
	secondary:
		"bg-purple-50 !text-purple-700 dark:bg-gray-700 dark:!text-purple-300",
	success:
		"bg-success-50 !text-success-700 dark:bg-gray-700 dark:!text-success-300",
	default: "bg-gray-50 !text-gray-700 dark:bg-gray-700 dark:!text-gray-300",
	danger: "bg-red-50 !text-red-700 dark:bg-gray-700 dark:!text-red-300",
	warning:
		"bg-yellow-50 !text-yellow-700 dark:bg-gray-700 dark:!text-yellow-300",
	info: "bg-cyan-50 !text-cyan-700 dark:bg-gray-700 dark:!text-cyan-300",
};

export { alertStyles };
