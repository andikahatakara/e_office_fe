import {
	HomeIcon as HomeActiveIcon,
	UserGroupIcon as EmployeeActive,
	KeyIcon as KeyActiveIcon,
	ShareIcon as ShareActiveIcon,
	EnvelopeIcon as EnvelopeActiveIcon,
} from "@heroicons/react/24/solid";
import {
	HomeIcon,
	UserIcon,
	ArrowRightOnRectangleIcon,
	UserGroupIcon,
	KeyIcon,
	ShareIcon,
	EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";

export interface Route {
	label: string;
	href?: string;
	icon?: ReactNode;
	activeIcon?: ReactNode;
	can?: string;
}

export interface RouteProps extends Route {
	isLogout?: boolean;
	isHeader?: boolean;
	isDropDown?: boolean;
	dropdownMenus?: Route[];
}

export const routes: RouteProps[] = [
	{
		label: "Dashboard",
		href: "/",
		icon: <HomeIcon className="icon5" />,
		activeIcon: <HomeActiveIcon className="icon5" />,
		can: "dashboard",
	},
	{
		label: "Surat",
		isDropDown: true,
		icon: <EnvelopeIcon className="icon5" />,
		activeIcon: <EnvelopeActiveIcon className="icon5" />,
		can: "incoming-letters.index",
		dropdownMenus: [
			{
				label: "Masuk",
				href: "/incoming-letters",
				can: "incoming-letters.index",
			},
			{
				label: "Keluar",
				href: "/outgoing-letters",
				can: "outgoing-letters.index",
			},
		],
	},
	{
		label: "Pegawai",
		href: "/employees",
		icon: <UserGroupIcon className="icon5" />,
		activeIcon: <EmployeeActive className="icon5" />,
		can: "employees.index",
	},
	{
		label: "Organisasi",
		href: "/departments",
		icon: <ShareIcon className="icon5" />,
		activeIcon: <ShareActiveIcon className="icon5" />,
		can: "departments.index",
	},
	{
		label: "Peran dan Akses",
		isDropDown: true,
		icon: <KeyIcon className="icon5" />,
		activeIcon: <KeyActiveIcon className="icon5" />,
		can: "roles.index" || "permissions.index",
		dropdownMenus: [
			{
				label: "Peran",
				href: "/roles",
				can: "roles.index",
			},
			{
				label: "Hak Akses",
				href: "/permissions",
				can: "permissions.index",
			},
		],
	},
];

export const profileLinks: RouteProps[] = [
	{
		label: "Profil",
		href: "profile",
		icon: <UserIcon className="text-inherit h-5 w-5" />,
	},
	{
		label: "Logout",
		href: "#",
		icon: <ArrowRightOnRectangleIcon className="text-inherit h-5 w-5" />,
		isLogout: true,
	},
];
