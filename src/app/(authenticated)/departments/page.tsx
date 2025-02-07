import DepartmentIndex from "@/views/departments/IndexView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Struktur Organisasi | E Office",
	description:
		"Halaman struktur organisasi diskominfo kabupaten kubu raya kalimantan barat. E Office Dinask Komunikasi dan Informasi Kabupaten Kubu Raya",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default function Department() {
	return <DepartmentIndex />;
}
