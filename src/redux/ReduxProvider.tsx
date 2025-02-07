"use client";

import React, { useEffect } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { useAppSelector } from "./hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import RenderIf from "@/components/atoms/RenderIf";

const Loader = dynamic(() => import("@/components/atoms/Loading"));

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<MainApp>{children}</MainApp>
		</Provider>
	);
};

const MainApp = ({ children }: { children: React.ReactNode }) => {
	const { isDark } = useAppSelector((state) => state.theme);
	const { isOpenLoading } = useAppSelector((state) => state.loading);

	useEffect(() => {
		if (isDark) {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}
	}, [isDark]);

	return (
		<>
			{children}
			<ToastContainer />
			<RenderIf when={isOpenLoading}>
				<Loader />
			</RenderIf>
		</>
	);
};

export default ReduxProvider;
