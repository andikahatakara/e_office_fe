import React from "react";
import { Metadata } from "next";
import OutgoingIndexView from "@/views/letters/outgoings";

export const metadata: Metadata = {
	title: "Surat Keluar | E Office",
	description:
		"Halaman surat keluar aplikasi E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default function OutgoingLetters() {
	return <OutgoingIndexView />;
}
