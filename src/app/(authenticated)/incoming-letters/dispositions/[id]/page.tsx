import ShowDisposition from "@/views/letters/dispositions/show";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Disposisi Surat | E Office",
	description:
		"Halaman disposisi Surat Masuk aplikasi E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default function Disposition({
	params: { id },
}: {
	params: { id: number };
}) {
	return <ShowDisposition id={id} />;
}
