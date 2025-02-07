import EmployeeCreate from "@/views/employees/EmployeeCreate";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Tambah Pegawai | E Office",
	description:
		"Halaman tambah data pegawai sebagai pengguna aplikasi E Office diskominfo kabupaten kubu raya kalimantan barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default function Create() {
	return <EmployeeCreate />;
}
