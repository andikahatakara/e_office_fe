import GuestLayout from "@/components/layouts/GuestLayout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <GuestLayout>{children}</GuestLayout>;
}
