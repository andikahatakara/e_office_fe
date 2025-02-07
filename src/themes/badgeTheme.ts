import { ColorKeys } from "./colorTheme";

type BadgeVariantKey = "default" | "soft" | "outline";
type BadgeColorKey = ColorKeys;
const baseStyle =
	"inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset";

const defaultVariants: Record<BadgeColorKey, string> = {
	blue: "bg-blue-500 text-blue-50 ring-blue-500/10 dark:bg-blue-400 dark:text-white dark:ring-blue-400/80",
	orange:
		"bg-orange-500 text-orange-50 ring-orange-500/10 dark:bg-orange-400 dark:text-white dark:ring-orange-400/80",
	lime: "bg-lime-500 text-lime-50 ring-lime-500/10 dark:bg-lime-400 dark:text-white dark:ring-lime-400/80",
	sky: "bg-sky-500 text-sky-50 ring-sky-500/10 dark:bg-sky-400 dark:text-white dark:ring-sky-400/80",
	indigo:
		"bg-indigo-500 text-indigo-50 ring-indigo-500/10 dark:bg-indigo-400 dark:text-white dark:ring-indigo-400/80",
	teal: "bg-teal-500 text-teal-50 ring-teal-500/10 dark:bg-teal-400 dark:text-white dark:ring-teal-400/80",
	amber:
		"bg-amber-500 text-amber-50 ring-amber-500/10 dark:bg-amber-400 dark:text-white dark:ring-amber-400/80",
	violet:
		"bg-violet-500 text-violet-50 ring-violet-500/10 dark:bg-violet-400 dark:text-white dark:ring-violet-400/80",
	emerald:
		"bg-emerald-500 text-emerald-50 ring-emerald-500/10 dark:bg-emerald-400 dark:text-white dark:ring-emerald-400/80",
	default:
		"bg-colorDefault-500 text-colorDefault-50 ring-colorDefault-500/10 dark:bg-colorDefault-400 dark:text-white dark:ring-colorDefault-400/80",
	dark: "bg-dark-950 text-dark-50 ring-dark-950/10 dark:bg-dark-700 dark:text-white dark:ring-dark-700/80",
	danger:
		"bg-danger-500 text-danger-50 ring-danger-500/10 dark:bg-danger-700 dark:text-white dark:ring-danger-700/80",
	info: "bg-info-500 text-info-50 ring-info-500/10 dark:bg-info-700 dark:text-white dark:ring-info-700/80",
	pink: "bg-pink-500 text-pink-50 ring-pink-500/10 dark:bg-pink-400 dark:text-white dark:ring-pink-400/80",
	primary:
		"bg-primary-500 text-primary-50 ring-primary-500/10 dark:bg-primary-700 dark:text-white dark:ring-primary-700/80",
	secondary:
		"bg-secondary-500 text-secondary-50 ring-secondary-500/10 dark:bg-secondary-700 dark:text-white dark:ring-secondary-700/80",
	success:
		"bg-success-500 text-success-50 ring-success-500/10 dark:bg-success-700 dark:text-white dark:ring-success-700/80",
	warning:
		"bg-warning-500 text-warning-50 ring-warning-500/10 dark:bg-warning-700 dark:text-white dark:ring-warning-700/80",
};

const softVariants: Record<BadgeColorKey, string> = {
	blue: "bg-blue-50 text-blue-950 ring-blue-500/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-500/30",
	orange:
		"bg-orange-50 text-orange-950 ring-orange-500/10 dark:bg-orange-400/10 dark:text-orange-400 dark:ring-orange-500/30",
	lime: "bg-lime-50 text-lime-950 ring-lime-500/10 dark:bg-lime-400/10 dark:text-lime-400 dark:ring-lime-500/30",
	violet:
		"bg-violet-50 text-violet-950 ring-violet-500/10 dark:bg-violet-400/10 dark:text-violet-400 dark:ring-violet-500/30",
	sky: "bg-sky-50 text-sky-950 ring-sky-500/10 dark:bg-sky-400/10 dark:text-sky-400 dark:ring-sky-500/30",
	indigo:
		"bg-indigo-50 text-indigo-950 ring-indigo-500/10 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-500/30",
	amber:
		"bg-amber-50 text-amber-950 ring-amber-500/10 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-500/30",
	teal: "bg-teal-50 text-teal-950 ring-teal-500/10 dark:bg-teal-400/10 dark:text-teal-400 dark:ring-teal-500/30",
	emerald:
		"bg-emerald-50 text-emerald-950 ring-emerald-500/10 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-500/30",
	pink: "bg-pink-50 text-pink-950 ring-pink-500/10 dark:bg-pink-400/10 dark:text-pink-400 dark:ring-pink-500/30",
	default:
		"bg-colorDefault-50 text-colorDefault-950 ring-colorDefault-500/10 dark:bg-colorDefault-400/10 dark:text-colorDefault-400 dark:ring-colorDefault-500/30",
	dark: "bg-dark-700 text-dark-50 ring-dark-700/10 dark:bg-dark-600/10 dark:text-dark-600 dark:ring-dark-600/30",
	danger:
		"bg-danger-50 text-danger-700 ring-danger-500/10 dark:bg-danger-400/10 dark:text-danger-400 dark:text-opacity-1 dark:ring-danger-400/30",
	info: "bg-info-50 text-info-700 ring-info-500/10 dark:bg-info-400/10 dark:text-info-400 dark:ring-info-400/30",
	primary:
		"bg-primary-50 text-primary-700 ring-primary-500/10 dark:bg-primary-400/10 dark:text-primary-400 dark:ring-primary-400/30",
	secondary:
		"bg-secondary-50 text-secondary-700 ring-secondary-500/10 dark:bg-secondary-400/10 dark:text-secondary-400 dark:ring-secondary-400/30",
	success:
		"bg-success-50 text-success-700 ring-success-500/10 dark:bg-success-400/10 dark:text-success-400 dark:ring-success-400/30",
	warning:
		"bg-warning-50 text-warning-700 ring-warning-500/10 dark:bg-warning-400/10 dark:text-warning-400 dark:ring-warning-400/30",
};

const outlineVariants: Record<BadgeColorKey, string> = {
	default: "bg-gray-500 dark:bg-gray-700",
	blue: "bg-blue-500 dark:bg-blue-700",
	pink: "bg-pink-500 dark:bg-pink-700",
	dark: "bg-gray-950 dark:bg-gray-300",
	danger: "bg-red-700 dark:bg-red-600",
	info: "bg-cyan-700 dark:bg-cyan-600",
	primary: "bg-primary-700 dark:bg-primary-600",
	secondary: "bg-secondary-700 dark:bg-secondary-600",
	success: "bg-success-700 dark:bg-success-600",
	warning: "bg-warning-700 dark:bg-warning-600",
	teal: "bg-teal-700 dark:bg-teal-600",
	violet: "bg-violet-700 dark:bg-violet-600",
	emerald: "bg-emerald-700 dark:bg-emerald-600",
	lime: "bg-lime-700 dark:bg-lime-600",
	sky: "bg-sky-700 dark:bg-sky-600",
	amber: "bg-amber-700 dark:bg-amber-600",
	orange: "bg-orange-700 dark:bg-orange-600",
	indigo: "bg-indigo-700 dark:bg-indigo-600",
};

export { defaultVariants, softVariants, outlineVariants, baseStyle };
export type { BadgeColorKey, BadgeVariantKey };
