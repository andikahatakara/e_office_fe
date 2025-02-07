"use client";
import useProfile from "@/controllers/authController";
import { useAppSelector } from "@/redux/hooks";
import dynamic from "next/dynamic";
import React from "react";
import Loading from "../atoms/Loading";
import RenderIf from "../atoms/RenderIf";
import Navbar from "../molecules/navbars/Navbar";
import SideBar from "../molecules/sidebars/SideBar";
import Delete from "../molecules/modals/Delete";
import Logout from "../molecules/modals/Logout";

type AuthenticatedLayoutProps = {
	children: React.ReactNode;
};

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
	const { profile } = useProfile({ middleware: "auth" });
	const { isOpenLogoutModal } = useAppSelector((state) => state.logout);

	return (
		<>
			<RenderIf when={!profile}>
				<Loading />
			</RenderIf>
			<RenderIf when={profile ? true : false}>
				<Navbar />
				<SideBar />
				<main className="p-6 max-lg:ml-0 lg:ml-64 bg-primary-50 dark:bg-gray-900 min-h-screen">
					<div className="mt-16">{children}</div>
				</main>

				<RenderIf when={isOpenLogoutModal}>
					<Logout />
				</RenderIf>
				<Delete />
			</RenderIf>
		</>
	);
};

export default AuthenticatedLayout;
