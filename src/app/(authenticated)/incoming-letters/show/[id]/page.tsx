import { getIncoming } from "@/services/incomingLetterService";
import ShowIncomingLetter from "@/views/letters/incomings/show";
import { Metadata } from "next";
import { cookies as NextCookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
	title: "Detail Surat | E Office",
	description:
		"Halaman Surat Masuk aplikasi E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default async function page({
	params: { id },
}: {
	params: { id: number };
}) {
	return <ShowIncomingLetter id={id} />;
}
