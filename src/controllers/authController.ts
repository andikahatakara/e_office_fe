import { ErrorResponse } from "@/types/globalType";
import useSWR, { Fetcher } from "swr";
import { IProfile, UseProfile } from "@/types/userType";
import { getProfile } from "@/services/userService";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice";
import Cookies from "js-cookie";

export default function useProfile({
	middleware = "guest",
	redirectIfAuthenticated = "/",
}: Partial<UseProfile>) {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const fetcher: Fetcher<IProfile, string> = async (url) => {
		const { data, statusCode, message } = await getProfile(url);
		if (statusCode === 401) {
			Cookies.remove("accessToken");
		}
		return data;
	};

	const {
		data: profile,
		isLoading,
		isValidating,
		error,
		mutate: mutateProfile,
	} = useSWR<IProfile, ErrorResponse>("users/profile", fetcher);

	useEffect(() => {
		if (
			middleware === "guest" &&
			redirectIfAuthenticated &&
			profile &&
			!isLoading
		) {
			router.push(redirectIfAuthenticated);
		}

		if (
			window.location.pathname === "/verify-email" &&
			profile?.email_verified_at
		) {
			router.push(redirectIfAuthenticated);
		}

		if (middleware === "auth" && !profile && !isLoading) {
			router.push("/login");
		}

		if (profile) {
			dispatch(setUser({ user: profile, permissions: profile.permissions }));
		}
	}, [
		router,
		profile,
		isLoading,
		middleware,
		redirectIfAuthenticated,
		dispatch,
	]);

	return {
		isLoading,
		profile,
		isValidating,
		error,
		mutateProfile,
	};
}
