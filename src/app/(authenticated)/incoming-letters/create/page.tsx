import IncomingCreate from "@/views/letters/incomings/create";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Tambah Surat Masuk | E Office",
	description:
		"Halaman tambah surat aplikasi E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default function CreateIncomingLetter() {
	return <IncomingCreate />;
}
