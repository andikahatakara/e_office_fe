import UpdateIncomingView from "@/views/letters/incomings/update";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Edit Surat Masuk | E Office",
	description:
		"Halaman edit surat aplikasi E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default function IncomingLetterUpdate({
	params: { id },
}: {
	params: { id: number };
}) {
	return <UpdateIncomingView id={id} />;
}
