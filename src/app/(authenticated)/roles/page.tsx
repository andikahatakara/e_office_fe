import IndexView from "@/views/roles/IndexView";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Peran | E Office",
	description:
		"Halaman peran pengguna E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

const Role = () => {
	return <IndexView />;
};

export default Role;
