import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import DashboardView from "@/views/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard | E Office",
	description:
		"Halaman dashboard aplikasi E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default function Home() {
	return (
		<AuthenticatedLayout>
			<DashboardView />
		</AuthenticatedLayout>
	);
}
