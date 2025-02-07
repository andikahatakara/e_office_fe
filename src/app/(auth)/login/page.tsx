import LoginForm from "@/views/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login | E Office",
	description:
		"Halaman login E-Office Diskominfo Kabupaten Kubu Raya Kalimantan Barat",
	keywords:
		"E-Office, Kubu Raya, Kalimantan Barat, Kabupaten Kubu Raya, Diskominfo Kabupaten Kubu Raya",
	authors: {
		name: "Emon Krismon",
		url: "https://github.com/krismonsemanas",
	},
};

export default async function Login() {
	return <LoginForm />;
}
