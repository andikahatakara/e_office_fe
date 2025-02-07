import RoleShowView from "@/views/roles/RoleShowView";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Detail Peran | E Office",
	description:
		"Halaman detail peran pengguna E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

const Show = ({ params: { id } }: { params: { id: string } }) => {
	return <RoleShowView id={id} />;
};

export default Show;
