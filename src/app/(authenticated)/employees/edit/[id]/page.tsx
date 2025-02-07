import EmployeeUpdate from "@/views/employees/EmployeeUpdate";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Edit Pegawai | E Office",
	description:
		"Halaman edit data pegawai sebagai pengguna aplikasi E Office diskominfo kabupaten kubu raya kalimantan barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default function UpdateEmployee({
	params: { id },
}: {
	params: { id: number };
}) {
	return <EmployeeUpdate id={id} />;
}
