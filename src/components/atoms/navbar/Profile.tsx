"use client";

import useProfile from "@/controllers/authController";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";
import RenderIf from "../RenderIf";
import Skeleton from "../Skeleton";
import { profileLinks } from "@/router";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenLogoutModal } from "@/redux/features/logoutSlice";

const Profile = () => {
	const { isLoading, profile } = useProfile({ middleware: "auth" });
	const dispatch = useAppDispatch();

	return isLoading ? (
		<Skeleton circle />
	) : (
		<Menu as="div" className={"relative"}>
			<Menu.Button
				className={"relative h-10 w-10 rounded-full overflow-hidden"}
			>
				<Image
					fill
					src={profile?.avatar_url ?? ""}
					alt={profile?.full_name ?? ""}
					className="absolute inset-0 h-full w-full object-cover z-10"
				/>
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
				<Menu.Items
					className={`absolute inset-x-0 top-8 -ml-32 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
				>
					<div className="px-4 py-3">
						<span className="block text-sm text-gray-900 dark:text-white">
							{profile?.full_name ?? ""}
						</span>
						<span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
							{profile?.email ?? ""}
						</span>
					</div>
					<ul className="py-2">
						{profileLinks.map((link, key) => (
							<Menu.Item as={`li`} key={`profile-menu-${key}`}>
								<RenderIf when={link.isLogout}>
									<div
										onClick={() => dispatch(setOpenLogoutModal())}
										className="w-full cursor-pointer inline-flex space-x-3  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
									>
										<RenderIf when={link.icon ? true : false}>
											{link.icon}
										</RenderIf>
										<span>{link.label}</span>
									</div>
								</RenderIf>
								<RenderIf when={!link.isLogout}>
									<Link
										href={link.href ?? "#"}
										className="w-full inline-flex space-x-3  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
									>
										<RenderIf when={link.icon ? true : false}>
											{link.icon}
										</RenderIf>
										<span>{link.label}</span>
									</Link>
								</RenderIf>
							</Menu.Item>
						))}
					</ul>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default Profile;
