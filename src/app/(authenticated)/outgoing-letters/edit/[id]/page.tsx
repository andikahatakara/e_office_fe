import UpdateOutgoingLetterView from "@/views/letters/outgoings/update";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Ubah Surat Keluar | E Office",
	description:
		"Halaman ubah surat keluar aplikasi E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default function UpdateOutgoingLetter({
	params: { id },
}: {
	params: { id: number };
}) {
	return <UpdateOutgoingLetterView id={id} />;
}
