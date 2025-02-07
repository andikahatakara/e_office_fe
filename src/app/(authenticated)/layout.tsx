import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
