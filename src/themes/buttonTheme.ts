import { ColorKeys } from "@/types/themeTypes";

type ButtonColorKeys = Exclude<ColorKeys, "default"> | "dark";
type ButtonVariantKeys = "solid" | "outline" | "ghost";

const solidButtonTheme: Record<ButtonColorKeys, string> = {
  primary:
    "bg-primary-700 !text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-500",
  secondary:
    "bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500",
  dark: "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600",
  warning:
    "bg-yellow-700 hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-500",
  danger: "bg-red-700 hover:bg-red-800 dark:bg-red-600 hover:dark:bg-red-500",
  info: "bg-cyan-700 hover:bg-cyan-800 dark:bg-cyan-600 hover:dark:bg-cyan-500",
  success:
    "bg-success-700 hover:bg-success-800 dark:bg-success-600 dark:hover:bg-success-500",
};

const ghostButtonTheme: Record<ButtonColorKeys, string> = {
  primary:
    "!text-primary-700 hover:bg-primary-100 dark:!text-primary-300 dark:hover:bg-primary-800",
  secondary:
    "!text-purple-700 hover:bg-purple-100 dark:!text-purple-300 dark:hover:bg-purple-800",
  dark: "!text-gray-700 hover:bg-gray-100 dark:!text-gray-300 dark:hover:bg-gray-700",
  warning:
    "!text-yellow-700 hover:bg-yellow-100 dark:!text-yellow-300 dark:hover:bg-yellow-800",
  danger:
    "!text-red-700 hover:bg-red-100 dark:!text-red-300 dark:hover:bg-red-800",
  info: "!text-cyan-700 hover:bg-cyan-100 dark:!text-cyan-300 dark:hover:bg-cyan-800",
  success:
    "!text-success-700 hover:bg-success-100 dark:!text-success-300 dark:hover:bg-success-800",
};

const outlineButtonTheme: Record<ButtonColorKeys, string> = {
  primary:
    "border border-primary-700 !text-primary-700 hover:bg-primary-700 hover:!text-white dark:!text-primary-500 dark:border-primary-500 dark:hover:!text-white dark:hover:bg-primary-500",
  secondary:
    "border border-purple-700 !text-purple-700 hover:bg-purple-700 hover:!text-white dark:!text-purple-500 dark:border-purple-500 dark:hover:!text-white dark:hover:bg-purple-500",
  dark: "border border-gray-700 !text-gray-700 hover:bg-gray-700 hover:!text-white dark:!text-gray-300 dark:border-gray-300 dark:hover:!text-white dark:hover:bg-gray-300",
  warning:
    "border border-yellow-700 !text-yellow-700 hover:bg-yellow-700 hover:!text-white dark:!text-yellow-500 dark:border-yellow-500 dark:hover:!text-white dark:hover:bg-yellow-500",
  danger:
    "border border-red-700 !text-red-700 hover:bg-red-700 hover:!text-white dark:hover-red-500 dark:!text-red-500 dark:border-red-500 dark:hover:!text-white dark:hover:bg-red-500",
  info: "border border-cyan-700 !text-cyan-700 hover:bg-cyan-700 hover:!text-white dark:!text-cyan-500 dark:border-cyan-500 dark:hover:!text-white dark:hover:bg-cyan-500",
  success:
    "border border-success-700 !text-success-700 hover:bg-success-700 hover:!text-white dark:!text-success-500 dark:border-success-500 dark:hover:!text-white dark:hover:bg-success-500",
};

export { solidButtonTheme, ghostButtonTheme, outlineButtonTheme };
export type { ButtonColorKeys, ButtonVariantKeys };
