type ColorKeys =
	| "default"
	| "dark"
	| "primary"
	| "secondary"
	| "success"
	| "warning"
	| "info"
	| "danger"
	| "pink"
	| "blue"
	| "orange"
	| "sky"
	| "amber"
	| "violet"
	| "indigo"
	| "lime"
	| "emerald"
	| "teal";

const colorScheme: Record<ColorKeys, string> = {
	blue: "bg-blue-500 dark:bg-blue-700",
	danger: "bg-danger-500 dark:bg-danger-700",
	dark: "bg-dark-900 dark:bg-dark-700",
	default: "bg-colorDefault-500 dark:bg-colorDefault-700",
	info: "bg-info-500 dark:bg-info-700",
	pink: "bg-pink-500 dark:bg-pink-700",
	primary: "bg-primary-500 dark:bg-primary-700",
	secondary: "bg-secondary-500 dark:bg-secondary-700",
	success: "bg-success-500 dark:bg-success-700",
	warning: "bg-warning-500 dark:bg-warning-700",
	orange: "bg-orange-500 dark:bg-orange-700",
	amber: "bg-amber-500 dark:bg-amber-700",
	sky: "bg-sky-500 dark:bg-sky-700",
	violet: "bg-violet-500 dark:bg-violet-700",
	indigo: "bg-indigo-500 dark:bg-indigo-700",
	lime: "bg-lime-500 dark:bg-lime-700",
	emerald: "bg-emerald-500 dark:bg-emerald-700",
	teal: "bg-teal-500 dark:bg-teal-700",
};

const chartColor: Record<ColorKeys, string> = {
	blue: "#3b82f6",
	danger: "#ef4444",
	dark: "#64748b",
	default: "#6b7280",
	info: "#06b6d4",
	pink: "#ec4899",
	primary: "#6b7fef",
	secondary: "#a855f7",
	success: "#48cc30",
	warning: "#eab308",
	orange: "#f97316",
	amber: "#f59e0b",
	sky: "#0ea5e9",
	violet: "#8b5cf6",
	indigo: "#6366f1",
	lime: "#84cc16",
	emerald: "#10b981",
	teal: "#14b8a6",
};

export type { ColorKeys };
export { colorScheme, chartColor };
