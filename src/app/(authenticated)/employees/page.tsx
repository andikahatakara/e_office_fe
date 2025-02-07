import IndexView from "@/views/employees/IndexView";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Pegawai | E Office",
	description:
		"Halaman data pegawai sebagai pengguna aplikasi E Office diskominfo kabupaten kubu raya kalimantan barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

const Employee = () => {
	return <IndexView />;
};

export default Employee;
