"use client";
import Heading from "@/components/atoms/Heading";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Not Found | E Office",
	description:
		"Halaman error not found 404 E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

const NotFound = () => {
	return (
		<div className="flex w-full flex-col justify-center items-center min-h-screen h-full">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="373"
				height="171"
				fill="none"
				viewBox="0 0 373 171"
			>
				<path
					fill="#597EF7"
					d="M5.727 116.545V99l38.137-60.09h15.59v23.817H50.41L28.091 98.091v.727h55.227v17.727H5.728zM50.682 132v-20.818l.454-7.682V38.91h21.046V132h-21.5zM289.727 116.545V99l38.137-60.09h15.591v23.817h-9.046l-22.318 35.364v.727h55.227v17.727h-77.591zM334.682 132v-20.818l.454-7.682V38.91h21.046V132h-21.5z"
				></path>
				<path
					fill="#ADC6FF"
					fillRule="evenodd"
					d="M258.641 85.5c0 39.842-32.299 72.141-72.141 72.141-39.842 0-72.141-32.299-72.141-72.141 0-39.842 32.299-72.14 72.141-72.14 39.842 0 72.141 32.298 72.141 72.14z"
					clipRule="evenodd"
				></path>
				<path
					fill="#fff"
					fillRule="evenodd"
					d="M183.547 74.953c0 8.388-6.8 15.188-15.188 15.188-8.388 0-15.187-6.8-15.187-15.188 0-8.388 6.799-15.187 15.187-15.187 8.388 0 15.188 6.8 15.188 15.187z"
					clipRule="evenodd"
				></path>
				<path
					fill="#253368"
					fillRule="evenodd"
					d="M175.109 74.531a6.328 6.328 0 11-12.656 0 6.328 6.328 0 0112.656 0zM175.531 107.231a2.53 2.53 0 01-2.321-3.539c2.421-5.58 6.828-8.653 12.41-8.653 5.332 0 9.608 2.696 12.368 7.799a2.53 2.53 0 11-4.453 2.408c-1.872-3.462-4.461-5.145-7.915-5.145-3.589 0-6.129 1.834-7.766 5.606a2.532 2.532 0 01-2.323 1.524z"
					clipRule="evenodd"
				></path>
				<path
					fill="#597EF7"
					fillRule="evenodd"
					d="M186.5 157.641c25.022 0 47.068-12.74 60.007-32.087a.014.014 0 00.002-.007c-12.86 1.698-31.743 9.292-31.743-1.827 0-11.232-.455-36.954-.455-36.954h-9.67v35.838s-1.166 14.766-21.094 5.907c-19.929-8.86-37.482 12.411-52.752 2.83 13.231 16.06 33.272 26.3 55.705 26.3z"
					clipRule="evenodd"
				></path>
				<path
					fill="#fff"
					fillRule="evenodd"
					d="M219.828 74.953c0 8.388-6.8 15.188-15.187 15.188-8.388 0-15.188-6.8-15.188-15.188 0-8.388 6.8-15.187 15.188-15.187 8.387 0 15.187 6.8 15.187 15.187z"
					clipRule="evenodd"
				></path>
				<path
					fill="#253368"
					fillRule="evenodd"
					d="M210.547 74.531a6.328 6.328 0 11-12.656 0 6.328 6.328 0 0112.656 0z"
					clipRule="evenodd"
				></path>
			</svg>
			<Heading level="h3" title="NOT FOUND" />
			<span className=" my-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
				Resource tidak ditemukan
			</span>
		</div>
	);
};

export default NotFound;
