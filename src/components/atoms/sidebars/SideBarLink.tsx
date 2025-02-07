"use client";

import { RouteProps } from "@/router";
import Link from "next/link";
import React, { Fragment } from "react";
import RenderIf from "../RenderIf";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToggleSidebar } from "@/redux/features/themeSlice";
import { usePathname } from "next/navigation";
import { activeLink, dropDownActive } from "@/utils/globalUtil";

export default function SideBarLink({
	href = "#",
	label,
	icon,
	isDropDown = false,
	isHeader = false,
	dropdownMenus,
	activeIcon,
	can,
}: RouteProps) {
	const dispacth = useAppDispatch();
	const { isOpenSidebar } = useAppSelector((state) => state.theme);
	const { permissions: cans } = useAppSelector((state) => state.user);

	const pathname = usePathname();

	const baseStyle =
		"text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";
	const activeStyle =
		"bg-primary-700 hover:bg-primary-800 text-white dark:bg-primary-600 hover:bg-primary-700";

	return (
		<li>
			<RenderIf when={!isDropDown && !isHeader}>
				<Link
					onClick={
						isOpenSidebar ? () => dispacth(setToggleSidebar()) : undefined
					}
					href={href}
					className={`menu ${
						activeLink(pathname, href) ? "menu-active" : "menu-default"
					}`}
				>
					<RenderIf when={icon && pathname !== href ? true : false}>
						{icon}
					</RenderIf>
					<RenderIf when={activeIcon && pathname === href ? true : false}>
						{activeIcon}
					</RenderIf>
					<span>{label}</span>
				</Link>
			</RenderIf>

			<RenderIf when={isDropDown}>
				<Menu as={`div`} className={"relative w-full"}>
					{({
						open = isDropDown && dropDownActive(pathname, dropdownMenus ?? []),
					}) => (
						<>
							<Menu.Button
								className={`menu w-full justify-between ${
									isDropDown && dropDownActive(pathname, dropdownMenus ?? [])
										? "menu-active"
										: "menu-default"
								}`}
							>
								<div className="space-x-3 inline-flex items-center ">
									<RenderIf
										when={
											!dropDownActive(pathname, dropdownMenus ?? []) && icon
												? true
												: false
										}
									>
										{icon}
									</RenderIf>
									<RenderIf
										when={
											dropDownActive(pathname, dropdownMenus ?? []) &&
											activeIcon
												? true
												: false
										}
									>
										{activeIcon}
									</RenderIf>
									<span>{label}</span>
								</div>

								<RenderIf when={!open}>
									<ChevronDownIcon className="icon5" />
								</RenderIf>
								<RenderIf when={open}>
									<ChevronUpIcon className="icon5" />
								</RenderIf>
							</Menu.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className={`flex flex-col space-y-2 mt-2`}>
									{dropdownMenus &&
										dropdownMenus?.map(
											(dropdown, index) =>
												cans &&
												dropdown.can &&
												cans[dropdown.can] && (
													<Menu.Item key={`dropdown-${label}-menu-${index}`}>
														<Link
															onClick={
																isOpenSidebar
																	? () => dispacth(setToggleSidebar())
																	: undefined
															}
															className={`flex pl-11 items-center p-2 rounded-lg space-x-3 ${
																activeLink(pathname, dropdown.href ?? "")
																	? activeStyle
																	: baseStyle
															}`}
															href={dropdown?.href ?? "#"}
														>
															<span>{dropdown.label}</span>
														</Link>
													</Menu.Item>
												)
										)}
								</Menu.Items>
							</Transition>
						</>
					)}
				</Menu>
			</RenderIf>
		</li>
	);
}
