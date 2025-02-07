/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/themes/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/views/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)", ...fontFamily.sans],
			},
			colors: {
				primary: {
					50: "#eef4ff",
					100: "#e1ebfe",
					200: "#c8dafd",
					300: "#a7c0fa",
					400: "#839df6",
					500: "#6b7fef",
					600: "#4954e2",
					700: "#3b43c7",
					800: "#3239a1",
					900: "#30387f",
					950: "#1c1f4a",
				},
				success: {
					50: "#eefbea",
					100: "#d9f6d1",
					200: "#b6eea8",
					300: "#88e274",
					400: "#60d249",
					500: "#48cc30",
					600: "#2e921e",
					700: "#266f1c",
					800: "#22591b",
					900: "#1f4c1b",
					950: "#0c290a",
				},
				colorDefault: colors.gray,
				info: colors.cyan,
				danger: colors.red,
				secondary: colors.purple,
				warning: colors.yellow,
				dark: colors.slate,
			},
			zIndex: {
				full: "9999",
				100: 100,
			},
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
