/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	sw: "/sw.js",
	disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL,
				hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME ?? "be_e_office.test",
				pathname: "/storage/**",
			},
		],
	},
};

module.exports = withPWA(nextConfig);
