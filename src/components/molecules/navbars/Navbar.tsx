"use client";
import UserNotification from "@/components/atoms/UserNotification";
import IconButton from "@/components/atoms/buttons/IconButton";
import Brand from "@/components/atoms/navbar/Brand";
import Profile from "@/components/atoms/navbar/Profile";
import { setThemeDark, setToggleSidebar } from "@/redux/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MoonIcon, SunIcon, Bars3Icon } from "@heroicons/react/24/outline";

const Navbar = () => {
	const dispatch = useAppDispatch();
	const { isDark } = useAppSelector((state) => state.theme);
	return (
		<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start">
						<IconButton
							variant="ghost"
							color="dark"
							className="block lg:hidden mr-2"
							icon={<Bars3Icon className="w-5 h-5 text-inherit" />}
							onClick={() => dispatch(setToggleSidebar())}
						/>
						<Brand />
					</div>
					<div className="flex items-center space-x-2">
						<IconButton
							variant="ghost"
							color="dark"
							onClick={() => dispatch(setThemeDark())}
							icon={
								isDark ? (
									<SunIcon className="h-5 w-5 text-inherit" />
								) : (
									<MoonIcon className="h-5 w-5 text-inherit" />
								)
							}
						/>
						{/* <UserNotification /> */}
						<Profile />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
