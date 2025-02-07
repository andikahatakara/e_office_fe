"use client";
import RenderIf from "@/components/atoms/RenderIf";
import SideBarLink from "@/components/atoms/sidebars/SideBarLink";
import { setToggleSidebar } from "@/redux/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { routes } from "@/router";
import React from "react";

const SideBar = () => {
	const dispatch = useAppDispatch();
	const { isOpenSidebar } = useAppSelector((state) => state.theme);
	const { permissions: cans } = useAppSelector((state) => state.user);
	const style = isOpenSidebar
		? "transform-none z-30 sm:translate-x-0"
		: "z-20 -translate-x-full lg:translate-x-0";
	return (
		<>
			<aside
				className={`fixed top-0 left-0  w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700  ${style}`}
			>
				<div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
					<ul className="space-y-2 font-medium">
						{routes.map(
							(route, index) =>
								cans &&
								route.can &&
								cans[route.can] && <SideBarLink key={index} {...route} />
						)}
					</ul>
				</div>
				{/* Backdrop */}
			</aside>
			<RenderIf when={isOpenSidebar}>
				<div
					onClick={
						isOpenSidebar ? () => dispatch(setToggleSidebar()) : undefined
					}
					className="fixed lg:hidden lg:relative z-20 inset-0 bg-gray-900/30"
				/>
			</RenderIf>
		</>
	);
};

export default SideBar;
