import OutgoingCreateView from "@/views/letters/outgoings/create";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Tambah Surat Keluar | E Office",
	description:
		"Halaman tambah surat keluar aplikasi E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default function OutgoingCreate() {
	return <OutgoingCreateView />;
}
