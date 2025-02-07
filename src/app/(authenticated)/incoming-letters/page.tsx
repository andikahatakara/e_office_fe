import IncomingIndexView from "@/views/letters/incomings";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Surat Masuk | E Office",
	description:
		"Halaman Surat Masuk aplikasi E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default function IncomingLetter() {
	return <IncomingIndexView />;
}
