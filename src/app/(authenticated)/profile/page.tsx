import ProfileFormView from "@/views/profiles/ProfileFormView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Profile | E Office",
	description:
		"Halaman profile pengguna E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default async function Profile() {
	return (
		<div className="flex flex-col space-y-2 md:space-y-4 lg:space-y-6">
			<ProfileFormView />
		</div>
	);
}
