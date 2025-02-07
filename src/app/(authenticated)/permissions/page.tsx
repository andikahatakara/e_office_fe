import PermissionIndexView from "@/views/permissions/PermissionIndexView";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Hak Akses | E Office",
	description:
		"Halaman hak akses aplikasi E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default function Permission() {
	return <PermissionIndexView />;
};
